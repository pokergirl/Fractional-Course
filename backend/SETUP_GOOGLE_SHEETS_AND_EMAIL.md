# Setting up Google Sheets and Email Integration

To enable the automatic Google Sheets update and email notifications, you need to set up a few things.

## 1. Google Sheets Integration

You need a Google Service Account to programmatically access your Google Sheet.

1.  **Go to the Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2.  **Create a New Project** (or select an existing one).
3.  **Enable the Google Sheets API and Google Drive API**:
    *   Search for "Google Sheets API" and enable it.
    *   Search for "Google Drive API" and enable it.
4.  **Create a Service Account**:
    *   Go to "IAM & Admin" > "Service Accounts".
    *   Click "Create Service Account".
    *   Give it a name (e.g., "signup-bot").
    *   Click "Create and Continue".
    *   (Optional) Grant it the "Editor" role for the project (not strictly necessary if you just share the sheet).
    *   Click "Done".
5.  **Create a Key**:
    *   Click on the newly created service account email.
    *   Go to the "Keys" tab.
    *   Click "Add Key" > "Create new key".
    *   Select "JSON".
    *   A file will automatically download. **Keep this file safe!**
6.  **Update your backend**:
    *   Rename the downloaded JSON file to `service_account.json`.
    *   Place it in the `frontend/backend/` directory (where `main.py` is).
    *   **IMPORTANT**: Ensure `service_account.json` is in your `.gitignore` so you don't accidentally commit it to a public repository.
7.  **Share the Google Sheet**:
    *   Create a new Google Sheet (or use an existing one).
    *   Open the `service_account.json` file and find the `client_email` field.
    *   Copy that email address.
    *   Go to your Google Sheet, click "Share", and paste the email address. Give it "Editor" access.
8.  **Get the Sheet ID**:
    *   The ID is in the URL of your spreadsheet: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit...`
    *   Copy `YOUR_SHEET_ID`.
    *   You will add this to your `.env` file as `GOOGLE_SHEET_ID`.

## 2. Email Integration (SMTP)

You need an SMTP server to send emails. If you are using Gmail, you can use an App Password.

1.  **Gmail (Recommended for testing/low volume)**:
    *   Go to your Google Account settings: [https://myaccount.google.com/](https://myaccount.google.com/)
    *   Go to "Security".
    *   Enable "2-Step Verification" if not already enabled.
    *   Search for "App passwords".
    *   Create a new App Password (select "Mail" and "Other" -> "FastAPI Backend").
    *   Copy the 16-character password.
    *   **SMTP Host**: `smtp.gmail.com`
    *   **SMTP Port**: `587`
    *   **SMTP User**: Your full Gmail address.
    *   **SMTP Password**: The App Password you just generated.

## 3. Configuration

Update your `frontend/backend/.env` file with the following variables:

```env
# Google Sheets
GOOGLE_SHEETS_CREDENTIALS_FILE=service_account.json
GOOGLE_SHEET_ID=your_sheet_id_here

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=nnguyen0646@gmail.com
```
