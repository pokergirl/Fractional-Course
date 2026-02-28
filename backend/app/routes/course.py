from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.course import CourseContent, CurriculumSession, Testimonial
from app.schemas.course import (
    CourseContentResponse,
    CurriculumSessionResponse,
    TestimonialResponse,
    LandingPageData
)
from typing import List

router = APIRouter(prefix="/api/course", tags=["course"])


@router.get("/content", response_model=CourseContentResponse)
async def get_course_content(db: Session = Depends(get_db)):
    """
    Get course content (hero, bio, pricing)
    """
    course_content = db.query(CourseContent).first()
    
    if not course_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course content not found"
        )
    
    return course_content


@router.get("/curriculum", response_model=List[CurriculumSessionResponse])
async def get_curriculum(db: Session = Depends(get_db)):
    """
    Get all curriculum sessions
    """
    sessions = db.query(CurriculumSession).order_by(
        CurriculumSession.session_number
    ).all()
    
    return sessions


@router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials(db: Session = Depends(get_db)):
    """
    Get all testimonials
    """
    testimonials = db.query(Testimonial).all()
    
    return testimonials


@router.get("/landing-page", response_model=LandingPageData)
async def get_landing_page_data(db: Session = Depends(get_db)):
    """
    Get all data needed for the landing page in one request
    """
    course_content = db.query(CourseContent).first()
    
    if not course_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course content not found"
        )
    
    curriculum_sessions = db.query(CurriculumSession).order_by(
        CurriculumSession.session_number
    ).all()
    
    testimonials = db.query(Testimonial).all()
    
    return LandingPageData(
        course_content=course_content,
        curriculum_sessions=curriculum_sessions,
        testimonials=testimonials
    )