import sys
import os
import datetime

# Add the current directory to sys.path so we can import app modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.google_sheets_service import GoogleSheetsService
from app.services.email_service import EmailService
from app.services.stripe_service import StripeService
from app.config.settings import settings

def test_integration():
    print("Testing Google Sheets and Email Integration...")
    print("-" * 50)
    
    # 1. Test Google Sheets
    print(f"Testing Google Sheets (ID: {settings.GOOGLE_SHEET_ID})...")
    try:
        test_row = [
            "Test User",
            "test@example.com",
            "123-456-7890",
            "https://linkedin.com/in/test",
            "TEST_ENTRY",
            datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ]
        GoogleSheetsService.append_to_sheet(test_row)
        print("✅ Google Sheets: Success! Check your sheet for a new row.")
    except Exception as e:
        print(f"❌ Google Sheets: Failed. Error: {e}")

    print("-" * 50)

    # 2. Test Email
    print(f"Testing Email (To: {settings.EMAIL_TO})...")
    try:
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "123-456-7890",
            "linkedin": "https://linkedin.com/in/test",
            "payment_status": "TEST_ENTRY"
        }
        EmailService.send_signup_notification(test_data)
        print("✅ Email: Success! Check your inbox.")
    except Exception as e:
        print(f"❌ Email: Failed. Error: {e}")

    print("-" * 50)

    # 3. Test Stripe
    print(f"Testing Stripe (Price ID: {settings.STRIPE_PRICE_ID})...")
    if settings.STRIPE_SECRET_KEY.startswith("sk_live_"):
        print("⚠️  WARNING: You are using LIVE Stripe keys. Do not complete the payment unless you want to be charged.")
    
    try:
        session = StripeService.create_checkout_session(
            customer_email="test@example.com",
            customer_name="Test User",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/?canceled=true"
        )
        print(f"✅ Stripe: Success! Checkout Session Created.")
        print(f"   Checkout URL: {session['checkout_url']}")
    except Exception as e:
        print(f"❌ Stripe: Failed. Error: {e}")

if __name__ == "__main__":
    test_integration()
