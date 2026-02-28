# Stripe Checkout Integration Guide

This guide will help you set up Stripe for the FractionalPro Academy course platform.

## 🎯 Overview

The platform uses Stripe Checkout for payment processing:
1. User fills out signup form on frontend
2. Frontend sends data to backend API
3. Backend creates Stripe Checkout Session
4. User is redirected to Stripe-hosted checkout page
5. After payment, user returns to success page
6. Webhook confirms payment and updates database

## 📋 Prerequisites

- Stripe account (sign up at [stripe.com](https://stripe.com))
- Backend server running on http://localhost:8000
- Frontend server running on http://localhost:3000

## 🚀 Quick Setup (Development)

### Step 1: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **API keys**
3. Copy your **Test mode** keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)

### Step 2: Create a Product and Price

#### Option A: Using Stripe Dashboard

1. Go to **Products** → **Add product**
2. Fill in:
   - **Name:** FractionalPro Academy Course
   - **Description:** 6-week cohort-based fractional consulting course
   - **Pricing:** One-time payment
   - **Price:** $795.00 USD (or $995.00 for regular price)
3. Click **Save product**
4. Copy the **Price ID** (starts with `price_`)

#### Option B: Using Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Create product
stripe products create \
  --name "FractionalPro Academy Course" \
  --description "6-week cohort-based fractional consulting course"

# Create price (use product ID from above)
stripe prices create \
  --product prod_YOUR_PRODUCT_ID \
  --unit-amount 79500 \
  --currency usd \
  --nickname "Early Bird Price"

# Copy the price ID from the output
```

### Step 3: Update Backend Environment Variables

Edit `/Users/hasmacbookair/Warm Intros/fractional-course-backend/.env`:

```env
# Replace these with your actual Stripe keys
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE
```

### Step 4: Set Up Webhook (for local testing)

#### Using Stripe CLI (Recommended)

```bash
# Forward webhooks to local backend
stripe listen --forward-to localhost:8000/api/webhook/stripe
```

This will output a webhook signing secret like `whsec_...`. Copy it and add to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

Keep this terminal running while testing!

### Step 5: Restart Backend Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
cd /Users/hasmacbookair/Warm\ Intros/fractional-course-backend
source venv/bin/activate
python main.py
```

## 🧪 Testing the Integration

### Test the Complete Flow

1. **Open the frontend:** http://localhost:3000
2. **Scroll to the signup form**
3. **Fill in the form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
   - LinkedIn: https://linkedin.com/in/testuser
4. **Click "Secure My Spot"**
5. **You'll be redirected to Stripe Checkout**
6. **Use Stripe test card:**
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
7. **Complete payment**
8. **You'll be redirected to success page**

### Test Cards

Stripe provides test cards for different scenarios:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0025 0000 3155 | Requires authentication |

### Verify in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Payments** to see test payments
3. Click **Customers** to see created customers
4. Click **Developers** → **Webhooks** to see webhook events

### Check Database

```bash
cd /Users/hasmacbookair/Warm\ Intros/fractional-course-backend
source venv/bin/activate
python

# In Python shell:
from app.config.database import SessionLocal
from app.models.signup import SignupSubmission

db = SessionLocal()
signups = db.query(SignupSubmission).all()
for signup in signups:
    print(f"{signup.email} - {signup.payment_status}")
```

## 🔧 API Endpoints

### Create Signup and Get Checkout URL

```bash
curl -X POST http://localhost:8000/api/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/testuser"
  }'
```

Response:
```json
{
  "checkout_url": "https://checkout.stripe.com/c/pay/cs_test_...",
  "session_id": "cs_test_..."
}
```

### Verify Payment Status

```bash
curl http://localhost:8000/api/signup/verify/cs_test_YOUR_SESSION_ID
```

Response:
```json
{
  "payment_status": "completed",
  "email": "test@example.com",
  "name": "Test User"
}
```

## 🌐 Production Setup

### Step 1: Switch to Live Mode

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Get your **Live** API keys
3. Create a **Live** product and price

### Step 2: Update Environment Variables

```env
# Use LIVE keys (no _test_ in them)
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
STRIPE_PRICE_ID=price_YOUR_LIVE_PRICE_ID
```

### Step 3: Configure Production Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your production URL: `https://your-domain.com/api/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
5. Copy the **Signing secret** and add to production `.env`

### Step 4: Update Frontend URL

In backend `.env`:
```env
FRONTEND_URL=https://your-frontend-domain.com
```

## 🐛 Troubleshooting

### Issue: "Stripe error: No such price"

**Solution:** Make sure the `STRIPE_PRICE_ID` in `.env` matches your Stripe price ID.

### Issue: "Webhook signature verification failed"

**Solution:** 
- For local testing: Make sure `stripe listen` is running
- For production: Verify the webhook secret matches your Stripe dashboard

### Issue: "CORS error when calling API"

**Solution:** Backend CORS is configured for `http://localhost:3000`. If using a different port, update `FRONTEND_URL` in backend `.env`.

### Issue: Payment succeeds but status not updated

**Solution:** 
- Check webhook is configured correctly
- Check backend logs for webhook errors
- Verify webhook secret is correct

## 📊 Monitoring

### View Logs

Backend logs show all API calls and database operations:
```bash
# Backend logs are in the terminal where you ran python main.py
```

### Stripe Dashboard

Monitor in real-time:
- **Payments:** See all transactions
- **Customers:** View customer records
- **Webhooks:** Check webhook delivery status
- **Logs:** View API request logs

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use test keys in development** - Only use live keys in production
3. **Verify webhook signatures** - Already implemented in backend
4. **Use HTTPS in production** - Required by Stripe
5. **Rotate keys regularly** - Especially if compromised

## 📚 Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)

## 🎉 Success!

Once everything is set up, your payment flow should work seamlessly:
1. User signs up → 2. Redirects to Stripe → 3. Pays → 4. Returns to success page → 5. Webhook confirms payment

Happy coding! 🚀