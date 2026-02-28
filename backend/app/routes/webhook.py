from fastapi import APIRouter, Request, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.signup import SignupSubmission, PaymentStatus
from app.services.stripe_service import StripeService
from app.services.email_service import EmailService
from app.services.google_sheets_service import GoogleSheetsService
from datetime import datetime

router = APIRouter(prefix="/api/webhook", tags=["webhook"])


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Handle Stripe webhook events
    """
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    if not sig_header:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing stripe-signature header"
        )
    
    try:
        # Verify webhook signature
        event = StripeService.verify_webhook_signature(payload, sig_header)
        
        # Handle different event types
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            
            # Find the signup submission
            signup = db.query(SignupSubmission).filter(
                SignupSubmission.stripe_checkout_session_id == session['id']
            ).first()
            
            if signup:
                # Update payment status
                signup.payment_status = PaymentStatus.COMPLETED
                signup.stripe_customer_id = session.get('customer')
                signup.payment_completed_at = datetime.utcnow()
                db.commit()
                
                # Send confirmation email
                EmailService.send_payment_notification(signup.email)
                EmailService.send_user_payment_confirmation(signup.email, signup.name)
                
                # Update Google Sheet
                GoogleSheetsService.update_payment_status(signup.email, "PAID")
        
        elif event['type'] == 'checkout.session.expired':
            session = event['data']['object']
            
            # Find the signup submission
            signup = db.query(SignupSubmission).filter(
                SignupSubmission.stripe_checkout_session_id == session['id']
            ).first()
            
            if signup and signup.payment_status == PaymentStatus.PENDING:
                # Mark as failed if still pending
                signup.payment_status = PaymentStatus.FAILED
                db.commit()
        
        return {"status": "success"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook error: {str(e)}"
        )
