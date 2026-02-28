# FractionalPro Academy Backend

Backend API for the FractionalPro Academy course platform - a professional course landing page with Stripe payment integration.

## 🚀 Features

- **Course Management**: API endpoints for course content, curriculum, and testimonials
- **Signup & Payment**: Integrated Stripe checkout for course enrollment
- **Webhook Handling**: Automatic payment verification via Stripe webhooks
- **Database**: PostgreSQL with SQLAlchemy ORM
- **API Documentation**: Auto-generated OpenAPI docs at `/docs`

## 📋 Prerequisites

- Python 3.9+
- PostgreSQL database
- Stripe account (for payment processing)

## 🛠️ Installation

### 1. Clone the repository

```bash
cd /Users/hasmacbookair/Warm\ Intros/fractional-course-backend
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `STRIPE_PRICE_ID`: Your Stripe price ID for the course
- `FRONTEND_URL`: URL of your frontend application
- `SECRET_KEY`: Secret key for JWT tokens

### 5. Set up PostgreSQL database

Create a PostgreSQL database:

```bash
createdb fractional_course_db
```

Or using psql:

```sql
CREATE DATABASE fractional_course_db;
```

### 6. Initialize database with seed data

```bash
python seed_data.py
```

This will create all tables and populate them with initial course content, curriculum sessions, and testimonials.

## 🏃 Running the Application

### Development mode (with auto-reload)

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Production mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Endpoints

### Course Endpoints

- `GET /api/course/content` - Get course content (hero, bio, pricing)
- `GET /api/course/curriculum` - Get all curriculum sessions
- `GET /api/course/testimonials` - Get all testimonials
- `GET /api/course/landing-page` - Get all landing page data in one request

### Signup Endpoints

- `POST /api/signup/` - Create signup and get Stripe checkout URL
- `GET /api/signup/verify/{session_id}` - Verify payment status

### Webhook Endpoints

- `POST /api/webhook/stripe` - Handle Stripe webhook events

### Health Check

- `GET /` - Root endpoint with API info
- `GET /health` - Health check endpoint

## 🔧 Stripe Setup

### 1. Create a Stripe account

Sign up at [stripe.com](https://stripe.com)

### 2. Get your API keys

From the Stripe Dashboard:
- Go to Developers → API keys
- Copy your Secret key and Publishable key

### 3. Create a product and price

```bash
# Using Stripe CLI
stripe products create --name "FractionalPro Academy Course" --description "6-week cohort-based course"
stripe prices create --product <PRODUCT_ID> --unit-amount 79500 --currency usd
```

Or create via the Stripe Dashboard:
- Go to Products → Add product
- Set price to $795.00
- Copy the Price ID

### 4. Set up webhook endpoint

```bash
# Using Stripe CLI for local testing
stripe listen --forward-to localhost:8000/api/webhook/stripe
```

Or configure in Stripe Dashboard:
- Go to Developers → Webhooks
- Add endpoint: `https://your-domain.com/api/webhook/stripe`
- Select events: `checkout.session.completed`, `checkout.session.expired`
- Copy the webhook signing secret

## 🗄️ Database Schema

### Tables

- **course_content**: Course information (hero, bio, pricing)
- **curriculum_sessions**: 6 course sessions with details
- **testimonials**: Student testimonials
- **signup_submissions**: User signups and payment status

## 🔐 Security

- CORS configured for frontend origin
- Stripe webhook signature verification
- Environment variables for sensitive data
- SQL injection protection via SQLAlchemy ORM

## 📝 Development

### Project Structure

```
fractional-course-backend/
├── app/
│   ├── config/          # Configuration and database setup
│   ├── models/          # SQLAlchemy models
│   ├── routes/          # API route handlers
│   ├── schemas/         # Pydantic schemas
│   └── services/        # Business logic (Stripe, etc.)
├── main.py              # FastAPI application entry point
├── seed_data.py         # Database seeding script
├── requirements.txt     # Python dependencies
└── .env.example         # Environment variables template
```

### Adding new endpoints

1. Create route handler in `app/routes/`
2. Define Pydantic schemas in `app/schemas/`
3. Add database models in `app/models/` if needed
4. Include router in `main.py`

## 🧪 Testing

Test the API using the interactive docs at `/docs` or with curl:

```bash
# Get course content
curl http://localhost:8000/api/course/landing-page

# Create signup
curl -X POST http://localhost:8000/api/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/johndoe"
  }'
```

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these in your production environment:
- Set `DEBUG=False`
- Use a strong `SECRET_KEY`
- Use production Stripe keys
- Set proper `FRONTEND_URL`
- Use a production PostgreSQL database

### Recommended Hosting

- **Backend**: Railway, Render, Heroku, or AWS
- **Database**: Railway PostgreSQL, Heroku Postgres, or AWS RDS
- **Environment**: Use platform's environment variable management

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Support

For issues or questions, please open an issue on GitHub or contact the development team.