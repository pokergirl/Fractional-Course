import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config.settings import settings
import logging

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_signup_notification(signup_data: dict):
        """
        Send an email notification about a new signup.
        """
        if not all([settings.SMTP_HOST, settings.SMTP_PORT, settings.SMTP_USER, settings.SMTP_PASSWORD, settings.EMAIL_TO]):
            logger.warning("Email settings not fully configured. Skipping email notification.")
            return

        try:
            msg = MIMEMultipart()
            msg['From'] = settings.FROM_EMAIL or settings.SMTP_USER
            msg['To'] = settings.EMAIL_TO
            msg['Subject'] = f"New Signup: {signup_data.get('name')}"

            body = f"""
            New Signup Received!
            
            Name: {signup_data.get('name')}
            Email: {signup_data.get('email')}
            Phone: {signup_data.get('phone')}
            LinkedIn: {signup_data.get('linkedin')}
            
            Payment Status: {signup_data.get('payment_status', 'Pending')}
            """
            
            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.FROM_EMAIL or settings.SMTP_USER, settings.EMAIL_TO, text)
            server.quit()
            
            logger.info(f"Signup notification email sent to {settings.EMAIL_TO}")
            
        except Exception as e:
            logger.error(f"Failed to send email: {e}")

    @staticmethod
    def send_payment_notification(email: str):
        """
        Send an email notification about a successful payment.
        """
        target_email = "nnguyen0646@gmail.com" # Hardcoded per requirement, or could be settings.EMAIL_TO

        if not all([settings.SMTP_HOST, settings.SMTP_PORT, settings.SMTP_USER, settings.SMTP_PASSWORD]):
            logger.warning("Email settings not fully configured. Skipping email notification.")
            return

        try:
            msg = MIMEMultipart()
            msg['From'] = settings.FROM_EMAIL or settings.SMTP_USER
            msg['To'] = target_email
            msg['Subject'] = f"Payment Received: {email}"

            body = f"""
            Payment Successfully Received!
            
            User Email: {email}
            Status: PAID
            """
            
            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.FROM_EMAIL or settings.SMTP_USER, target_email, text)
            server.quit()
            
            logger.info(f"Payment notification email sent to {target_email}")
            
        except Exception as e:
            logger.error(f"Failed to send payment notification email: {e}")

    @staticmethod
    def send_user_payment_confirmation(email: str, name: str = None):
        """
        Send a payment confirmation email to the user.
        """
        if not all([settings.SMTP_HOST, settings.SMTP_PORT, settings.SMTP_USER, settings.SMTP_PASSWORD]):
            logger.warning("Email settings not fully configured. Skipping user payment confirmation.")
            return

        try:
            msg = MIMEMultipart()
            msg['From'] = settings.FROM_EMAIL or settings.SMTP_USER
            msg['To'] = email
            msg['Subject'] = "Payment Confirmation: Fractional Course"

            greeting = f"Hi {name}," if name else "Hi there,"

            body = f"""{greeting}

Thank you for your payment! You are now enrolled in the Fractional Course.

We are excited to have you on board. You will receive further instructions shortly.

Best regards,
The Fractional Course Team
"""
            
            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.FROM_EMAIL or settings.SMTP_USER, email, text)
            server.quit()
            
            logger.info(f"User payment confirmation email sent to {email}")
            
        except Exception as e:
            logger.error(f"Failed to send user payment confirmation email: {e}")
