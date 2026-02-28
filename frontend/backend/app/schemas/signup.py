from pydantic import BaseModel, EmailStr, Field, HttpUrl
from datetime import datetime
from typing import Optional


class SignupSubmissionCreate(BaseModel):
    """Schema for creating a signup submission"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    linkedin: str = Field(..., min_length=10, max_length=200)


class SignupSubmissionResponse(BaseModel):
    """Schema for signup submission response"""
    id: int
    name: str
    email: str
    phone: str
    linkedin: str
    payment_status: str
    submitted_at: datetime
    stripe_checkout_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class StripeCheckoutResponse(BaseModel):
    """Schema for Stripe checkout response"""
    checkout_url: str
    session_id: str