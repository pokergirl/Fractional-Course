"""
Seed script to populate the database with initial course data
Run this after setting up the database: python seed_data.py
"""

from app.config.database import SessionLocal, engine, Base
from app.models.course import CourseContent, CurriculumSession, Testimonial
from app.models.signup import SignupSubmission

# Create tables
Base.metadata.create_all(bind=engine)

def seed_course_content():
    """Seed course content"""
    db = SessionLocal()
    
    # Check if content already exists
    existing = db.query(CourseContent).first()
    if existing:
        print("Course content already exists, skipping...")
        db.close()
        return
    
    course_content = CourseContent(
        hero_headline="Launch Your Fractional Consulting Practice",
        hero_subheadline="Join experienced operators Ha and Garrett for a 6-week cohort-based course that transforms your expertise into a thriving fractional consulting business.",
        hero_cta_text="Enroll Now",
        instructor_name="Ha & Garrett",
        instructor_title="Fractional Consulting Experts",
        instructor_photo_url="/placeholder-instructor.jpg",
        instructor_bio="Ha and Garrett are seasoned fractional consultants with over 20 years of combined experience helping professionals transition into successful fractional practices. They've worked with Fortune 500 companies and startups alike, building sustainable consulting businesses.",
        instructor_years_experience=20,
        instructor_achievements=[
            "Built 6-figure fractional practices",
            "Advised 100+ professionals on fractional transitions",
            "Featured in Forbes and Entrepreneur Magazine"
        ],
        course_price=99500,  # $995 in cents
        course_early_bird_price=79500,  # $795 in cents
        course_start_date="Friday, April 24, 2026",
        course_duration="6 weeks"
    )
    
    db.add(course_content)
    db.commit()
    print("✓ Course content seeded")
    db.close()


def seed_curriculum():
    """Seed curriculum sessions"""
    db = SessionLocal()
    
    # Check if sessions already exist
    existing = db.query(CurriculumSession).first()
    if existing:
        print("Curriculum sessions already exist, skipping...")
        db.close()
        return
    
    sessions = [
        {
            "session_number": 1,
            "title": "Foundations: Positioning & Pricing",
            "description": "Learn how to position yourself in the market and price your services for maximum value.",
            "date": "April 24, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "Identifying your unique value proposition",
                "Market research and competitive analysis",
                "Pricing strategies for fractional work",
                "Creating compelling service packages"
            ],
            "format": "Workshop + Office Hours + Q&A"
        },
        {
            "session_number": 2,
            "title": "Client Acquisition Strategies",
            "description": "Master the art of finding and winning your first fractional clients.",
            "date": "May 1, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "Building your professional network",
                "Leveraging LinkedIn for client acquisition",
                "Cold outreach that converts",
                "Referral systems that scale"
            ],
            "format": "Workshop + Office Hours + Q&A"
        },
        {
            "session_number": 3,
            "title": "Structuring Engagements",
            "description": "Learn how to structure fractional engagements for success and sustainability.",
            "date": "May 8, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "Defining scope and deliverables",
                "Time management across multiple clients",
                "Contract templates and legal considerations",
                "Setting boundaries and expectations"
            ],
            "format": "Workshop + Office Hours + Q&A"
        },
        {
            "session_number": 4,
            "title": "Delivering Excellence",
            "description": "Develop systems to deliver exceptional value to your fractional clients.",
            "date": "May 15, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "Creating efficient workflows",
                "Communication best practices",
                "Managing client expectations",
                "Building long-term relationships"
            ],
            "format": "Workshop + Office Hours + Q&A"
        },
        {
            "session_number": 5,
            "title": "Scaling Your Practice",
            "description": "Strategies for growing your fractional practice beyond your first clients.",
            "date": "May 22, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "When and how to raise rates",
                "Building a personal brand",
                "Creating passive income streams",
                "Hiring support and delegation"
            ],
            "format": "Workshop + Office Hours + Q&A"
        },
        {
            "session_number": 6,
            "title": "Long-term Success & Community",
            "description": "Plan for sustainable growth and join a community of fractional professionals.",
            "date": "May 29, 2026",
            "time": "10:00 AM PST",
            "topics": [
                "Financial planning for consultants",
                "Avoiding burnout and maintaining balance",
                "Continuing education and skill development",
                "Building your support network"
            ],
            "format": "Workshop + Office Hours + Q&A"
        }
    ]
    
    for session_data in sessions:
        session = CurriculumSession(**session_data)
        db.add(session)
    
    db.commit()
    print("✓ Curriculum sessions seeded")
    db.close()


def seed_testimonials():
    """Seed testimonials"""
    db = SessionLocal()
    
    # Check if testimonials already exist
    existing = db.query(Testimonial).first()
    if existing:
        print("Testimonials already exist, skipping...")
        db.close()
        return
    
    testimonials = [
        {
            "name": "Sarah Chen",
            "role": "Fractional CMO",
            "company": "Tech Startups",
            "photo_url": "/placeholder-testimonial-1.jpg",
            "quote": "This course gave me the confidence and framework to launch my fractional practice. Within 3 months, I had 4 clients and was earning more than my previous full-time role.",
            "rating": 5
        },
        {
            "name": "Michael Rodriguez",
            "role": "Fractional CFO",
            "company": "SaaS Companies",
            "photo_url": "/placeholder-testimonial-2.jpg",
            "quote": "Ha and Garrett's practical advice on pricing and positioning was game-changing. I doubled my rates and clients were happy to pay for the value I deliver.",
            "rating": 5
        },
        {
            "name": "Jennifer Park",
            "role": "Fractional COO",
            "company": "E-commerce Brands",
            "photo_url": "/placeholder-testimonial-3.jpg",
            "quote": "The community alone is worth the investment. I've made lasting connections with other fractional professionals who continue to support my growth.",
            "rating": 5
        }
    ]
    
    for testimonial_data in testimonials:
        testimonial = Testimonial(**testimonial_data)
        db.add(testimonial)
    
    db.commit()
    print("✓ Testimonials seeded")
    db.close()


if __name__ == "__main__":
    print("Starting database seeding...")
    seed_course_content()
    seed_curriculum()
    seed_testimonials()
    print("\n✅ Database seeding completed successfully!")