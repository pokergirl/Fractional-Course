import stripe
from app.config.settings import settings
from typing import Dict

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeService:
    """Service for handling Stripe payment operations"""
    
    @staticmethod
    def create_checkout_session(
        customer_email: str,
        customer_name: str,
        success_url: str,
        cancel_url: str
    ) -> Dict[str, str]:
        """
        Create a Stripe checkout session
        
        Args:
            customer_email: Customer's email address
            customer_name: Customer's name
            success_url: URL to redirect after successful payment
            cancel_url: URL to redirect if payment is cancelled
            
        Returns:
            Dictionary with checkout_url and session_id
        """
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price': settings.STRIPE_PRICE_ID,
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url=success_url,
                cancel_url=cancel_url,
                customer_email=customer_email,
                metadata={
                    'customer_name': customer_name
                }
            )
            
            return {
                'checkout_url': checkout_session.url,
                'session_id': checkout_session.id
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def verify_webhook_signature(payload: bytes, sig_header: str) -> Dict:
        """
        Verify Stripe webhook signature
        
        Args:
            payload: Raw request body
            sig_header: Stripe signature header
            
        Returns:
            Verified event object
        """
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
            return event
        except ValueError as e:
            raise Exception("Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            raise Exception("Invalid signature")
    
    @staticmethod
    def get_session(session_id: str) -> Dict:
        """
        Retrieve a checkout session
        
        Args:
            session_id: Stripe session ID
            
        Returns:
            Session object
        """
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            return session
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")