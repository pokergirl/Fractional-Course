# Create Stripe Product & Price

Quick guide to create your course product in Stripe and get the Price ID.

## 🎯 Steps to Create Product

### Option 1: Using Stripe Dashboard (Easiest)

1. **Go to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com
   - Make sure you're in **LIVE mode** (toggle in top right)

2. **Create Product**
   - Click **Products** in left sidebar
   - Click **+ Add product** button
   - Fill in:
     - **Name:** FractionalPro Academy Course
     - **Description:** 6-week cohort-based fractional consulting course
     - **Image:** (optional) Upload course image

3. **Set Pricing**
   - **Pricing model:** One-time
   - **Price:** $795.00 USD (or your chosen price)
   - **Currency:** USD
   - Click **Save product**

4. **Get Price ID**
   - After saving, you'll see your product page
   - Under "Pricing", you'll see your price
   - Click on the price to see details
   - Copy the **Price ID** (starts with `price_`)
   - Example: `price_1QYZ123abc456DEF789`

5. **Update Backend .env**
   - Open: `/Users/hasmacbookair/Warm Intros/fractional-course-backend/.env`
   - Replace: `STRIPE_PRICE_ID=price_REPLACE_WITH_YOUR_PRICE_ID`
   - With: `STRIPE_PRICE_ID=price_YOUR_ACTUAL_PRICE_ID`

6. **Restart Backend Server**
   ```bash
   # Stop current server (Ctrl+C in terminal)
   # Then restart:
   cd /Users/hasmacbookair/Warm\ Intros/fractional-course-backend
   source venv/bin/activate
   python main.py
   ```

### Option 2: Using Stripe CLI (Advanced)

```bash
# Make sure you're logged in to Stripe CLI
stripe login

# Create product
stripe products create \
  --name "FractionalPro Academy Course" \
  --description "6-week cohort-based fractional consulting course"

# Note the product ID from output (prod_...)

# Create price
stripe prices create \
  --product prod_YOUR_PRODUCT_ID \
  --unit-amount 79500 \
  --currency usd

# Copy the price ID from output (price_...)
```

## 🔧 Set Up Webhook (Important!)

For LIVE mode, you need to configure a webhook endpoint:

### For Production (when deployed):

1. **Go to Stripe Dashboard**
   - Click **Developers** → **Webhooks**
   - Click **+ Add endpoint**

2. **Configure Endpoint**
   - **Endpoint URL:** `https://your-production-domain.com/api/webhook/stripe`
   - **Description:** FractionalPro payment webhooks
   - **Events to send:**
     - ✅ `checkout.session.completed`
     - ✅ `checkout.session.expired`
   - Click **Add endpoint**

3. **Get Signing Secret**
   - After creating, click on your webhook
   - Click **Reveal** under "Signing secret"
   - Copy the secret (starts with `whsec_`)
   - Update `.env`: `STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET`

### For Local Testing:

```bash
# Install Stripe CLI if not already installed
brew install stripe/stripe-cli/stripe

# Forward webhooks to local backend
stripe listen --forward-to localhost:8000/api/webhook/stripe

# Copy the webhook signing secret from output
# Update .env with the secret
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Product created in Stripe Dashboard
- [ ] Price ID copied and added to `.env`
- [ ] Webhook endpoint configured (for production) or CLI running (for local)
- [ ] Webhook secret added to `.env`
- [ ] Backend server restarted
- [ ] Test signup flow works

## 🧪 Test Your Setup

1. **Visit frontend:** http://localhost:3000
2. **Fill signup form** with test data
3. **Click "Secure My Spot"**
4. **You should be redirected to Stripe Checkout**
5. **Complete payment** (use real card in LIVE mode!)
6. **Verify success page** shows after payment

## ⚠️ Important Notes

- **LIVE MODE WARNING:** You're using LIVE Stripe keys, so any payments will be REAL charges!
- **Test First:** Consider switching to TEST mode first to verify everything works
- **Webhook Required:** Without webhooks, payment status won't update in database
- **HTTPS Required:** Stripe requires HTTPS for production webhooks

## 🔄 Switch to Test Mode (Recommended for Development)

If you want to test without real charges:

1. **Get TEST keys from Stripe Dashboard**
   - Toggle to **Test mode** in Stripe Dashboard
   - Go to **Developers** → **API keys**
   - Copy TEST keys (start with `sk_test_` and `pk_test_`)

2. **Update `.env` with TEST keys**

3. **Create TEST product/price** (same steps as above, but in Test mode)

4. **Use test cards:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

## 📞 Need Help?

- **Stripe Documentation:** https://stripe.com/docs/payments/checkout
- **Stripe Support:** https://support.stripe.com
- **Test Cards:** https://stripe.com/docs/testing

---

Once you have your Price ID, update the `.env` file and restart the backend server! 🚀