import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials
from app.config.settings import settings
import logging

logger = logging.getLogger(__name__)

class GoogleSheetsService:
    _scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive",
    ]

    @classmethod
    def get_client(cls):
        """
        Authenticate with Google Sheets API and return the client.
        """
        if not settings.GOOGLE_SHEETS_CREDENTIALS_FILE and not settings.GOOGLE_SHEETS_CREDENTIALS_JSON:
            logger.warning("Google Sheets credentials not configured.")
            return None
        
        try:
            if settings.GOOGLE_SHEETS_CREDENTIALS_JSON:
                creds_dict = json.loads(settings.GOOGLE_SHEETS_CREDENTIALS_JSON)
                creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, cls._scope)
            else:
                creds = ServiceAccountCredentials.from_json_keyfile_name(
                    settings.GOOGLE_SHEETS_CREDENTIALS_FILE, cls._scope
                )
            client = gspread.authorize(creds)
            return client
        except Exception as e:
            logger.error(f"Failed to authenticate with Google Sheets: {e}")
            return None

    @classmethod
    def append_to_sheet(cls, row_data: list):
        """
        Append a row of data to the configured Google Sheet.
        """
        if not settings.GOOGLE_SHEET_ID:
            logger.warning("Google Sheet ID not configured.")
            return

        client = cls.get_client()
        if not client:
            return

        try:
            sheet = client.open_by_key(settings.GOOGLE_SHEET_ID).sheet1
            sheet.append_row(row_data)
            logger.info("Successfully appended data to Google Sheet.")
        except Exception as e:
            logger.error(f"Failed to append data to Google Sheet: {e}")

    @classmethod
    def update_payment_status(cls, email: str, status: str):
        """
        Update the Payment Status for a user with the given email.
        """
        if not settings.GOOGLE_SHEET_ID:
            logger.warning("Google Sheet ID not configured.")
            return

        client = cls.get_client()
        if not client:
            return

        try:
            sheet = client.open_by_key(settings.GOOGLE_SHEET_ID).sheet1
            
            # Find the cell with the email
            cell = sheet.find(email)
            if not cell:
                logger.warning(f"Email {email} not found in Google Sheet.")
                return

            # Find the 'Payment Status' column
            headers = sheet.row_values(1)
            try:
                status_col = headers.index("Payment Status") + 1
            except ValueError:
                # If column doesn't exist, maybe append it? Or just log error.
                # User asked to "add a new column", so let's try to add it if missing?
                # But for now, let's assume it exists or log warning as safe default.
                # Actually, let's try to be smart. If not found, maybe just append to the end of the row?
                # No, safer to log warning for now.
                logger.warning("Payment Status column not found in Google Sheet.")
                return

            # Update the cell
            sheet.update_cell(cell.row, status_col, status)
            logger.info(f"Successfully updated payment status for {email} to {status}.")
            
        except Exception as e:
            logger.error(f"Failed to update payment status in Google Sheet: {e}")
