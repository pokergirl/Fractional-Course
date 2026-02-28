from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class CourseContentResponse(BaseModel):
    """Schema for course content response"""
    id: int
    hero_headline: str
    hero_subheadline: str
    hero_cta_text: str
    instructor_name: str
    instructor_title: str
    instructor_photo_url: Optional[str]
    instructor_bio: str
    instructor_years_experience: int
    instructor_achievements: Optional[List[str]]
    course_price: int
    course_early_bird_price: Optional[int]
    course_start_date: str
    course_duration: str
    
    class Config:
        from_attributes = True


class CurriculumSessionResponse(BaseModel):
    """Schema for curriculum session response"""
    id: int
    session_number: int
    title: str
    description: str
    date: str
    time: str
    topics: List[str]
    format: str
    
    class Config:
        from_attributes = True


class TestimonialResponse(BaseModel):
    """Schema for testimonial response"""
    id: int
    name: str
    role: str
    company: Optional[str]
    photo_url: Optional[str]
    quote: str
    rating: int
    
    class Config:
        from_attributes = True


class LandingPageData(BaseModel):
    """Schema for complete landing page data"""
    course_content: CourseContentResponse
    curriculum_sessions: List[CurriculumSessionResponse]
    testimonials: List[TestimonialResponse]