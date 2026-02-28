from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from app.config.database import Base


class CourseContent(Base):
    """Model for course content (hero, bio, curriculum, testimonials)"""
    __tablename__ = "course_content"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Hero Section
    hero_headline = Column(String(200), nullable=False)
    hero_subheadline = Column(Text, nullable=False)
    hero_cta_text = Column(String(50), default="Enroll Now")
    
    # Instructor Bio
    instructor_name = Column(String(100), nullable=False)
    instructor_title = Column(String(200), nullable=False)
    instructor_photo_url = Column(String(500), nullable=True)
    instructor_bio = Column(Text, nullable=False)
    instructor_years_experience = Column(Integer, nullable=False)
    instructor_achievements = Column(JSON, nullable=True)  # Array of achievements
    
    # Course Details
    course_price = Column(Integer, nullable=False)  # Price in cents
    course_early_bird_price = Column(Integer, nullable=True)  # Early bird price in cents
    course_start_date = Column(String(50), nullable=False)
    course_duration = Column(String(50), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<CourseContent(id={self.id}, instructor={self.instructor_name})>"


class CurriculumSession(Base):
    """Model for curriculum sessions"""
    __tablename__ = "curriculum_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_number = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    date = Column(String(50), nullable=False)
    time = Column(String(50), nullable=False)
    topics = Column(JSON, nullable=False)  # Array of topics
    format = Column(String(200), default="Workshop + Office Hours + Q&A")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<CurriculumSession(id={self.id}, session={self.session_number}, title={self.title})>"


class Testimonial(Base):
    """Model for testimonials"""
    __tablename__ = "testimonials"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    photo_url = Column(String(500), nullable=True)
    quote = Column(Text, nullable=False)
    rating = Column(Integer, default=5)  # 1-5 stars
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Testimonial(id={self.id}, name={self.name})>"