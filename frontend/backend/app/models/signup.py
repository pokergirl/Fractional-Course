from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from app.config.database import Base
import enum


class PaymentStatus(str, enum.Enum):
    """Payment status enumeration"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class SignupSubmission(Base):
    """Model for course signup submissions"""
    __tablename__ = "signup_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    linkedin = Column(String(200), nullable=False)
    
    # Stripe integration fields
    stripe_checkout_session_id = Column(String(200), nullable=True)
    stripe_customer_id = Column(String(200), nullable=True)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING)
    
    # Timestamps
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    payment_completed_at = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<SignupSubmission(id={self.id}, email={self.email}, status={self.payment_status})>"