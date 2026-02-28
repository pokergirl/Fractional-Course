# Backend Deployment Guide

This backend is a FastAPI application that can be deployed to various platforms like Heroku, Render, Railway, or Vercel.

## 1. Environment Variables

Ensure the following environment variables are set in your deployment environment:

### Required
- `DATABASE_URL`: Connection string for your PostgreSQL database.
- `STRIPE_SECRET_KEY`: Stripe Secret Key.
- `STRIPE_PUBLISHABLE_KEY`: Stripe Publishable Key.
- `STRIPE_WEBHOOK_SECRET`: Stripe Webhook Secret.
- `STRIPE_PRICE_ID`: Stripe Price ID for the course.
- `SECRET_KEY`: A random secret key for security (JWT signing).

### Google Sheets Integration (Optional but recommended)
- `GOOGLE_SHEET_ID`: The ID of the Google Sheet to store data.
- `GOOGLE_SHEETS_CREDENTIALS_JSON`: The content of your `service_account.json` file as a single line string.
  - **Why?** Cloud platforms often don't persist files like `service_account.json`. Using an environment variable is more reliable and secure.
  - **How to set:** Copy the entire content of `service_account.json`, minify it (remove newlines), and paste it as the value for this variable.

### Email (Optional)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `FROM_EMAIL`
- `EMAIL_TO`

## 2. Deployment Options

### Option A: Heroku / Render / Railway
This project includes a `Procfile` which these platforms automatically detect.
1. Connect your repository.
2. Set the Environment Variables listed above.
3. The platform should automatically install dependencies from `requirements.txt` and start the app using `uvicorn main:app ...`.

### Option B: Vercel
This project includes a `vercel.json` configuration.
1. Install Vercel CLI or connect your repo to Vercel dashboard.
2. Set the root directory to `backend` (if deploying from monorepo) or deploy the `backend` folder directly.
3. Set the Environment Variables in Vercel Project Settings.
4. Vercel will use the `vercel.json` to build and serve the Python app as a serverless function.

## 3. Database Migrations
The application currently attempts to create tables on startup (`Base.metadata.create_all`).
For production, it is recommended to use `alembic` for migrations.
1. Run `alembic upgrade head` manually if you have shell access, or ensure the startup script runs it.
