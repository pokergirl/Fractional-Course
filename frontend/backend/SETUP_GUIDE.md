# Quick Setup Guide for FractionalPro Academy

This guide will help you get the backend up and running quickly.

## Prerequisites Checklist

- [ ] Python 3.9+ installed
- [ ] PostgreSQL installed and running
- [ ] Stripe account created
- [ ] Git installed

## Step-by-Step Setup

### 1. Navigate to Backend Directory

```bash
cd /Users/hasmacbookair/Warm\ Intros/fractional-course-backend
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up PostgreSQL Database

```bash
# Create database
createdb fractional_course_db

# Or using psql
psql postgres
CREATE DATABASE fractional_course_db;
\q
```

### 5. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your values
nano .env  # or use your preferred editor
```

**Required values to update in `.env`:**

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/fractional_course_db
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
STRIPE_PRICE_ID=price_YOUR_PRICE_ID
SECRET_KEY=your-random-secret-key-here
FRONTEND_URL=http://localhost:3000
```

### 6. Get Stripe Credentials

#### Option A: Using Stripe Dashboard

1. Go to [stripe.com](https://stripe.com) and sign in
2. Navigate to **Developers → API keys**
3. Copy your **Secret key** and **Publishable key**
4. Create a product:
   - Go to **Products → Add product**
   - Name: "FractionalPro Academy Course"
   - Price: $795.00 (or $995.00 regular price)
   - Copy the **Price ID** (starts with `price_`)
5. Set up webhook:
   - Go to **Developers → Webhooks → Add endpoint**
   - URL: `http://localhost:8000/api/webhook/stripe` (for local testing)
   - Events: Select `checkout.session.completed` and `checkout.session.expired`
   - Copy the **Webhook signing secret**

#### Option B: Using Stripe CLI (Recommended for Development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Create product and price
stripe products create --name "FractionalPro Academy Course"
# Copy the product ID from output

stripe prices create \
  --product prod_YOUR_PRODUCT_ID \
  --unit-amount 79500 \
  --currency usd
# Copy the price ID from output

# Start webhook forwarding (run in separate terminal)
stripe listen --forward-to localhost:8000/api/webhook/stripe
# Copy the webhook signing secret from output
```

### 7. Seed the Database

```bash
python seed_data.py
```

You should see:
```
Starting database seeding...
✓ Course content seeded
✓ Curriculum sessions seeded
✓ Testimonials seeded

✅ Database seeding completed successfully!
```

### 8. Start the Backend Server

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 9. Verify Installation

Open your browser and visit:
- API Root: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

Test the course endpoint:
```bash
curl http://localhost:8000/api/course/landing-page
```

### 10. Connect Frontend

Update your frontend to point to the backend:

In your frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing the Complete Flow

### 1. Test Course Data Endpoint

```bash
curl http://localhost:8000/api/course/landing-page | jq
```

### 2. Test Signup Endpoint

```bash
curl -X POST http://localhost:8000/api/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/testuser"
  }' | jq
```

You should receive a response with a Stripe checkout URL.

### 3. Test Stripe Webhook (with Stripe CLI)

In a separate terminal:
```bash
stripe listen --forward-to localhost:8000/api/webhook/stripe
```

Then trigger a test event:
```bash
stripe trigger checkout.session.completed
```

## Common Issues & Solutions

### Issue: Database connection error

**Solution:** Check your DATABASE_URL in `.env` and ensure PostgreSQL is running:
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL (macOS)
brew services start postgresql
```

### Issue: Stripe API key error

**Solution:** Verify your Stripe keys are correct and not expired. Use test keys (starting with `sk_test_` and `pk_test_`) for development.

### Issue: Module not found errors

**Solution:** Ensure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Issue: Port already in use

**Solution:** Kill the process using port 8000:
```bash
lsof -ti:8000 | xargs kill -9
```

## Next Steps

1. ✅ Backend is running at http://localhost:8000
2. ✅ Database is seeded with course data
3. ✅ Stripe is configured for payments
4. 🔄 Start your frontend application
5. 🔄 Test the complete signup flow
6. 🔄 Deploy to production when ready

## Production Deployment Checklist

Before deploying to production:

- [ ] Set `DEBUG=False` in `.env`
- [ ] Use production Stripe keys (not test keys)
- [ ] Use a production PostgreSQL database
- [ ] Set a strong `SECRET_KEY`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Configure proper CORS origins
- [ ] Set up SSL/HTTPS
- [ ] Configure Stripe webhook with production URL
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database

## Support

If you encounter any issues:
1. Check the logs in the terminal where the server is running
2. Visit http://localhost:8000/docs for API documentation
3. Review the main README.md for detailed information
4. Check Stripe Dashboard for payment-related issues

Happy coding! 🚀