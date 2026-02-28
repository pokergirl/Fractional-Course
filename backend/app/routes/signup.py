from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.signup import SignupSubmission, PaymentStatus
from app.schemas.signup import SignupSubmissionCreate, StripeCheckoutResponse
from app.services.stripe_service import StripeService
from app.services.google_sheets_service import GoogleSheetsService
from app.services.email_service import EmailService
from app.config.settings import settings
import datetime

router = APIRouter(prefix="/api/signup", tags=["signup"])


@router.post("/", response_model=StripeCheckoutResponse, status_code=status.HTTP_201_CREATED)
async def create_signup(
    signup_data: SignupSubmissionCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new signup submission and return Stripe checkout URL
    """
    try:
        # Check if email already exists
        existing_signup = db.query(SignupSubmission).filter(
            SignupSubmission.email == signup_data.email
        ).first()
        
        if existing_signup and existing_signup.payment_status == PaymentStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This email has already been registered for the course"
            )
        
        # Create signup submission
        new_signup = SignupSubmission(
            name=signup_data.name,
            email=signup_data.email,
            phone=signup_data.phone,
            linkedin=signup_data.linkedin,
            payment_status=PaymentStatus.PENDING
        )
        
        db.add(new_signup)
        db.commit()
        db.refresh(new_signup)
        
        # Create Stripe checkout session
        success_url = f"{settings.FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{settings.FRONTEND_URL}/?canceled=true"
        
        stripe_response = StripeService.create_checkout_session(
            customer_email=signup_data.email,
            customer_name=signup_data.name,
            success_url=success_url,
            cancel_url=cancel_url
        )
        
        # Update signup with Stripe session ID
        new_signup.stripe_checkout_session_id = stripe_response['session_id']
        db.commit()

        # Add to Google Sheet
        GoogleSheetsService.append_to_sheet([
            signup_data.name,
            signup_data.email,
            signup_data.phone,
            signup_data.linkedin,
            "PENDING", # Payment Status
            datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ])

        # Send Email Notification
        EmailService.send_signup_notification({
            "name": signup_data.name,
            "email": signup_data.email,
            "phone": signup_data.phone,
            "linkedin": signup_data.linkedin,
            "payment_status": "PENDING"
        })
        
        return StripeCheckoutResponse(
            checkout_url=stripe_response['checkout_url'],
            session_id=stripe_response['session_id']
        )
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create signup: {str(e)}"
        )


@router.get("/verify/{session_id}")
async def verify_payment(
    session_id: str,
    db: Session = Depends(get_db)
):
    """
    Verify payment status for a checkout session
    """
    try:
        # Get session from Stripe
        session = StripeService.get_session(session_id)
        
        # Find signup submission
        signup = db.query(SignupSubmission).filter(
            SignupSubmission.stripe_checkout_session_id == session_id
        ).first()
        
        if not signup:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Signup not found"
            )
        
        # Update payment status if completed
        if session.payment_status == "paid":
            signup.payment_status = PaymentStatus.COMPLETED
            signup.stripe_customer_id = session.customer
            db.commit()
        
        return {
            "payment_status": signup.payment_status,
            "email": signup.email,
            "name": signup.name
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to verify payment: {str(e)}"
        )