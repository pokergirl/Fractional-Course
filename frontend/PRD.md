# PRODUCT REQUIREMENTS DOCUMENT

## EXECUTIVE SUMMARY

**Product Name:** FractionalPro Academy

**Product Vision:** A professional course landing page that builds credibility and captures interested leads for a fractional consulting practice course. The platform presents a cohort-based learning experience with live workshops, establishing trust through instructor credentials and social proof, then converting interested professionals into paying students via Stripe checkout.

**Core Purpose:** Solve the challenge of attracting and converting qualified professionals who want to start or grow fractional consulting practices by providing a credible, information-rich landing page that clearly communicates course value and facilitates seamless enrollment.

**Target Users:** Mid-career to senior professionals (consultants, executives, specialists) exploring fractional work models who need structured guidance to launch or scale their fractional consulting practice.

**Key MVP Features:**
- Hero Section - User-Generated Content (static marketing content)
- Consultant Bio Section - User-Generated Content (instructor profile)
- Course Curriculum Display - Configuration (course structure and session details)
- Testimonials Section - User-Generated Content (social proof)
- Course Signup Form - User-Generated Content (lead capture with Stripe integration)
- Responsive Design - System (cross-device compatibility)

**Platform:** Web application (responsive single-page landing, accessible via browser on desktop, tablet, and mobile devices)

**Complexity Assessment:** Simple
- State Management: Minimal local state (form inputs, accordion toggles)
- External Integrations: Stripe Checkout (reduces complexity - standard payment flow)
- Business Logic: Simple linear conversion funnel with form validation

**MVP Success Criteria:**
- Users can view complete course information and submit signup form
- Form submission redirects to Stripe checkout successfully
- All sections display correctly on mobile, tablet, and desktop
- Page loads under 2 seconds with smooth scrolling navigation

---

## 1. USERS & PERSONAS

**Primary Persona:**
- **Name:** "Marcus the Mid-Career Consultant"
- **Context:** 10+ years in management consulting or corporate strategy, exploring fractional work for flexibility and higher earnings. Currently employed but seeking transition path to independent consulting.
- **Goals:** Understand if fractional consulting is viable, learn proven frameworks to launch practice, connect with experienced instructor who has done it successfully, minimize risk by learning from others' mistakes.
- **Pain Points:** Uncertain how to price services, find first clients, structure engagements, or balance multiple clients. Skeptical of online courses without clear instructor credibility. Needs confidence this investment will provide actionable guidance, not generic advice.

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Core MVP Features (Priority 0)

**FR-001: Hero Section with Value Proposition**
- **Description:** Displays compelling headline, subheadline, and primary CTA that communicates course value and target audience
- **Entity Type:** User-Generated Content (marketing copy)
- **Operations:** View only (static content managed by site owner)
- **Key Rules:** CTA button scrolls to signup form; headline clearly states "Launch Your Fractional Consulting Practice"
- **Acceptance:** Users immediately understand what the course offers and who it's for within 3 seconds of landing

**FR-002: Consultant Bio and Expertise Section**
- **Description:** Showcases instructor's background, achievements, credentials, and fractional consulting experience with professional photo
- **Entity Type:** User-Generated Content (instructor profile)
- **Operations:** View only (static content)
- **Key Rules:** Must include photo, years of experience, notable clients/achievements, and why instructor is qualified to teach
- **Acceptance:** Users can assess instructor credibility and expertise before deciding to enroll

**FR-003: Course Curriculum Display**
- **Description:** Shows 6 live workshop sessions with topics, dates/times, office hours, and Q&A format in expandable/collapsible format
- **Entity Type:** Configuration (course structure)
- **Operations:** View, Expand/Collapse session details
- **Key Rules:** Each session shows title, date/time, key topics covered, and format (workshop + office hours + Q&A)
- **Acceptance:** Users can review complete curriculum and understand time commitment and learning outcomes

**FR-004: Testimonials Section**
- **Description:** Displays social proof from previous students with names, photos, and quotes about course impact
- **Entity Type:** User-Generated Content (social proof)
- **Operations:** View only (static testimonials)
- **Key Rules:** Minimum 3 testimonials with realistic names, professional photos, and specific outcomes achieved
- **Acceptance:** Users see credible social proof that builds trust in course effectiveness

**FR-005: Course Signup Form with Stripe Integration**
- **Description:** Captures lead information (name, email, phone, company) and redirects to Stripe checkout for payment
- **Entity Type:** User-Generated Content (lead capture)
- **Operations:** Create (submit form), View (form fields), Validate (required fields)
- **Key Rules:** All fields required; email must be valid format; successful submission redirects to Stripe checkout page
- **Acceptance:** Users can complete form, submit, and reach Stripe payment page without errors

**FR-006: Responsive Mobile Design**
- **Description:** Ensures all sections display correctly and remain functional on mobile, tablet, and desktop devices
- **Entity Type:** System (cross-device compatibility)
- **Operations:** View (responsive layout adaptation)
- **Key Rules:** Mobile-first design with breakpoints at 768px (tablet) and 1024px (desktop); touch-friendly buttons minimum 44px
- **Acceptance:** Users on any device can navigate, read content, and submit form without horizontal scrolling or layout breaks

---

## 3. USER WORKFLOWS

### 3.1 Primary Workflow: Course Discovery to Enrollment

**Trigger:** User lands on FractionalPro Academy homepage via marketing link or search
**Outcome:** User completes signup form and reaches Stripe checkout to pay for course

**Steps:**
1. User views hero section, reads value proposition, understands course is for fractional consulting professionals
2. User scrolls down to read instructor bio, assesses credibility and expertise
3. User expands curriculum accordion to review 6 sessions, dates/times, and topics covered
4. User reads testimonials to validate course effectiveness through social proof
5. User clicks CTA button (hero or inline) which scrolls to signup form
6. User fills required fields (name, email, phone, company) and clicks "Enroll Now"
7. System validates form, redirects user to Stripe checkout page with course payment details

### 3.2 Key Supporting Workflows

**Expand Curriculum Session:** User clicks session title → accordion expands → shows date/time, topics, format → user reads details

**Navigate via CTA:** User clicks any "Enroll Now" button → page smoothly scrolls to signup form section → form is visible and ready

**Submit Signup Form:** User enters all fields → clicks submit → sees loading state → redirects to Stripe checkout on success

**View on Mobile:** User accesses site on phone → layout adapts to single column → all sections stack vertically → buttons remain tappable

---

## 4. BUSINESS RULES

### 4.1 Entity Lifecycle Rules

**Hero Section Content:**
- **Type:** User-Generated Content
- **Creation:** Site owner/admin only
- **Editing:** Site owner/admin only
- **Deletion:** Not allowed (core marketing content must persist)

**Consultant Bio:**
- **Type:** User-Generated Content
- **Creation:** Site owner/admin only
- **Editing:** Site owner/admin only
- **Deletion:** Not allowed (instructor credibility is permanent requirement)

**Course Curriculum:**
- **Type:** Configuration
- **Creation:** Site owner/admin only
- **Editing:** Site owner/admin can update session dates/topics before course starts
- **Deletion:** Not allowed (curriculum must always be visible)

**Testimonials:**
- **Type:** User-Generated Content
- **Creation:** Site owner/admin only
- **Editing:** Site owner/admin only
- **Deletion:** Site owner/admin can remove outdated testimonials

**Signup Form Submission:**
- **Type:** User-Generated Content
- **Creation:** Any site visitor
- **Editing:** Not allowed (immutable lead record)
- **Deletion:** Not allowed (lead data retained for marketing)

### 4.2 Data Validation Rules

**Signup Form:**
- **Required Fields:** name, email, phone, company
- **Field Constraints:** Name minimum 2 characters; email must match valid email pattern; phone minimum 10 digits; company minimum 2 characters; all fields maximum 100 characters

**Curriculum Sessions:**
- **Required Fields:** sessionNumber, title, date, time, topics, format
- **Field Constraints:** Session number 1-6; date must be future date; time in HH:MM format; topics array minimum 3 items; format must include "Workshop + Office Hours + Q&A"

**Testimonials:**
- **Required Fields:** name, quote, photo
- **Field Constraints:** Name minimum 2 characters; quote minimum 20 characters, maximum 200 characters; photo must be valid image URL

### 4.3 Access & Process Rules
- All content is publicly viewable (no authentication required for landing page)
- Form submissions are one-time events (no user accounts or editing)
- Stripe checkout handles payment processing (no payment data stored on site)
- Form data stored in backend database for lead tracking and follow-up
- Successful form submission triggers immediate redirect to Stripe checkout URL

---

## 5. DATA REQUIREMENTS

### 5.1 Core Entities

**HeroContent**
- **Type:** User-Generated Content | **Storage:** Backend database
- **Key Fields:** id, headline, subheadline, ctaText, ctaTarget, backgroundImage, createdAt, updatedAt
- **Relationships:** Standalone entity (no relationships)
- **Lifecycle:** View only (managed by admin, not exposed in MVP)

**InstructorBio**
- **Type:** User-Generated Content | **Storage:** Backend database
- **Key Fields:** id, name, photo, title, yearsExperience, achievements, credentials, bio, createdAt, updatedAt
- **Relationships:** Standalone entity
- **Lifecycle:** View only (managed by admin)

**CurriculumSession**
- **Type:** Configuration | **Storage:** Backend database
- **Key Fields:** id, sessionNumber, title, date, time, timezone, topics (array), format, description, createdAt, updatedAt
- **Relationships:** Belongs to Course (implicit - all sessions part of single course)
- **Lifecycle:** View and Expand/Collapse (managed by admin)

**Testimonial**
- **Type:** User-Generated Content | **Storage:** Backend database
- **Key Fields:** id, name, photo, quote, company, role, createdAt, updatedAt
- **Relationships:** Standalone entity
- **Lifecycle:** View only (managed by admin)

**SignupSubmission**
- **Type:** User-Generated Content | **Storage:** Backend database
- **Key Fields:** id, name, email, phone, company, submittedAt, stripeCheckoutUrl, paymentStatus
- **Relationships:** Standalone entity (no user accounts)
- **Lifecycle:** Create and View only (immutable lead record)

### 5.2 Data Storage Strategy
- **Primary Storage:** Backend database (MongoDB or PostgreSQL)
- **Capacity:** Minimal storage needs (hundreds of submissions, not thousands)
- **Persistence:** All data persists indefinitely for marketing and lead tracking
- **Audit Fields:** All entities include createdAt, updatedAt for tracking changes

---

## 6. INTEGRATION REQUIREMENTS

**Stripe Checkout:**
- **Purpose:** Handles course payment processing and redirects user to secure checkout
- **Type:** Frontend redirect to Stripe-hosted checkout page
- **Data Exchange:** Sends customer email and course price; Receives payment confirmation webhook
- **Trigger:** User submits valid signup form
- **Error Handling:** If Stripe redirect fails, show error message and allow form resubmission

---

## 7. VIEWS & NAVIGATION

### 7.1 Primary Views

**Landing Page** (`/`) - Single-page layout with sections: Hero, Bio, Curriculum, Testimonials, Signup Form, Footer

**Stripe Checkout** (external) - Stripe-hosted payment page (redirected after form submission)

### 7.2 Navigation Structure

**Main Nav:** Logo (left), "Curriculum" link, "Instructor" link, "Enroll Now" CTA button (right) - all scroll to respective sections
**Default Landing:** Hero section at top of page
**Mobile:** Hamburger menu with same links, sticky "Enroll Now" button at bottom

---

## 8. MVP SCOPE & CONSTRAINTS

### 8.1 MVP Success Definition

The MVP is successful when:
- ✅ User can view complete course information (hero, bio, curriculum, testimonials)
- ✅ User can submit signup form with valid data
- ✅ Form submission redirects to Stripe checkout successfully
- ✅ All sections display correctly on mobile, tablet, and desktop
- ✅ Page loads under 2 seconds with smooth scrolling
- ✅ Form validation prevents invalid submissions

### 8.2 In Scope for MVP

Core features included:
- FR-001: Hero Section with Value Proposition
- FR-002: Consultant Bio and Expertise Section
- FR-003: Course Curriculum Display
- FR-004: Testimonials Section
- FR-005: Course Signup Form with Stripe Integration
- FR-006: Responsive Mobile Design

### 8.3 Technical Constraints

- **Data Storage:** Backend database for content and lead submissions
- **Concurrent Users:** Expected 100-500 visitors per month initially
- **Performance:** Page loads <2s on 3G connection, instant scroll interactions
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile:** Responsive design, iOS Safari and Android Chrome support
- **Offline:** Not supported (requires internet for form submission and Stripe redirect)

### 8.4 Known Limitations

**For MVP:**
- No user accounts or login (single landing page only)
- No payment processing on site (Stripe handles all payment logic)
- No email confirmation after signup (Stripe sends payment receipt)
- No admin dashboard to manage content (content hardcoded or managed via database directly)
- No analytics dashboard (relies on external tools like Google Analytics)

**Future Enhancements:**
- Admin CMS to edit hero, bio, curriculum, testimonials without code changes
- Email automation for signup confirmation and course reminders
- Student portal for enrolled users to access course materials
- Waitlist functionality for sold-out cohorts
- Multi-cohort support with different dates and pricing

---

## 9. ASSUMPTIONS & DECISIONS

### 9.1 Platform Decisions
- **Type:** Web application (full-stack with backend for data storage)
- **Storage:** Backend database (MongoDB or PostgreSQL) for content and lead submissions
- **Auth:** No authentication required for landing page (public access)

### 9.2 Entity Lifecycle Decisions

**HeroContent, InstructorBio, CurriculumSession, Testimonial:** View only for users
- **Reason:** Marketing content managed by site owner, not editable by visitors

**SignupSubmission:** Create and View only (immutable)
- **Reason:** Lead data is permanent record for marketing and compliance; no editing or deletion allowed

### 9.3 Key Assumptions

1. **Course is cohort-based with fixed start date**
   - Reasoning: User specified "live workshops" with dates/times, implying scheduled cohort model rather than evergreen on-demand course

2. **Stripe checkout handles all payment logic**
   - Reasoning: User wants form to "take them to a Stripe checkout page to pay," indicating Stripe-hosted checkout (not embedded payment form)

3. **Single course offering for MVP**
   - Reasoning: Product idea describes "a course" (singular), not multiple courses; simplifies MVP to one curriculum and one price point

4. **No user accounts or student portal in MVP**
   - Reasoning: Focus is on "landing page that captures leads," not post-enrollment experience; student portal is future enhancement

5. **Professional visual design matching Maven template**
   - Reasoning: User referenced Maven's Evals course page as design inspiration, indicating preference for clean, credible, professional aesthetic

### 9.4 Clarification Q&A Summary

**Q:** What specific color palette or visual vibe do you envision for "FractionalPro"?
**A:** Professional, following Maven template (https://maven.com/parlance-labs/evals)
**Decision:** Design will use clean, professional aesthetic with neutral colors, ample whitespace, and credibility-focused layout similar to Maven's course pages

**Q:** For the 6 sessions, are these live workshops (requiring dates/times) or on-demand modules (requiring duration)?
**A:** Live workshops
**Decision:** Curriculum displays specific dates, times, and timezone for each session; course is cohort-based with fixed schedule

**Q:** After a user submits the form, what is the ideal experience?
**A:** It should take them to a Stripe checkout page to pay
**Decision:** Form submission triggers redirect to Stripe-hosted checkout; no embedded payment form or manual payment processing

**Q:** Do you have specific testimonials to include now, or should I create realistic placeholders for the MVP?
**A:** Realistic placeholders
**Decision:** MVP includes 3-5 placeholder testimonials with realistic names, professional scenarios, and specific outcomes to demonstrate social proof format

---

**PRD Complete - Ready for Development**
