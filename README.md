# TaskFlow

**TaskFlow** is a multi-tenant training management web application designed to help organizations manage their complete training operations from a single platform.

The project is currently **under development**. The goal is to build a practical SaaS platform where organizations can manage trainers, mentors, students, courses, batches, classes, tasks, assessments, attendance, resources, and student progress.

---

## Project Status

**Currently in Development**

The core backend, PostgreSQL database, authentication system, organization management, and initial workspace onboarding are currently being developed.

The project is being built feature-by-feature, connecting the database, Flask backend, REST APIs, and React frontend together throughout development.

---

## Current Features

The following parts of TaskFlow have been developed so far:

* Flask backend setup
* PostgreSQL database integration
* Database migrations using Flask-Migrate
* User registration
* Email verification using OTP
* Secure password hashing
* User login
* JWT-based authentication
* Protected API routes
* Current user authentication endpoint
* Forgot password functionality
* Password reset through email
* Real email delivery using Gmail SMTP
* User profile structure
* Organization structure
* Organization membership structure
* Organization-specific member identifiers
* Organization creation API
* Organization owner assignment
* Workspace onboarding flow
* Create workspace interface
* Organization type selection
* React authentication state management
* Protected frontend routes
* Responsive workspace onboarding UI

The frontend and backend are still being developed, so several features currently exist only as the initial structure and will be connected in upcoming development phases.

---

## Planned Features

### Organization Management

* Multiple organizations per user
* Workspace switching
* Organization settings
* Organization administrators
* Organization invitations
* Organization member management
* Organization-level permissions
* Organization data isolation

### Training Management

* Course management
* Batch management
* Trainer management
* Mentor management
* Student management
* Class scheduling
* Training resources
* PDF and document resources
* Images and external links
* Class recordings

### Student Management

* Student profiles
* Organization-specific member identifiers
* Batch enrollment
* Student join requests
* Invitation-based enrollment
* Trainer approval
* Student course access
* Student progress tracking

### Tasks & Assessments

* Create tasks
* Assign tasks to batches
* Student submissions
* Submission review
* Marks and feedback
* Create assessments
* Questions and marks
* Assessment attempts
* Assessment results

### Attendance & Mentoring

* Class attendance
* Present / absent / late tracking
* Attendance history
* Mentor assignments
* Student mentoring
* Mentor feedback
* Follow-up tracking

### Progress & Reports

* Student progress
* Course progress
* Batch progress
* Attendance reports
* Trainer reports
* Student performance reports
* Organization reports

### Notifications

* New task notifications
* Task deadline notifications
* Submission review notifications
* Class notifications
* Resource notifications
* Assessment notifications
* Result notifications
* Mentor feedback notifications
* Email and in-app notifications

### Certificates

* Course completion tracking
* Certificate eligibility
* Certificate generation
* Unique certificate ID
* Certificate verification

---

## Technology Stack

### Frontend

* React.js
* JavaScript
* React Router
* Bootstrap
* CSS

### Backend

* Python
* Flask
* Flask-SQLAlchemy
* Flask-Migrate
* REST APIs
* PyJWT

### Database

* PostgreSQL
* Alembic migrations

### Authentication

* JWT authentication
* Password hashing
* Email verification
* OTP verification
* Password reset tokens
* Gmail SMTP

### Tools

* Git
* GitHub
* Visual Studio Code
* Postman

---

## Project Structure

```text
TaskFlow/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── extensions.py
│   │   └── __init__.py
│   ├── migrations/
│   ├── .env
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── database/
├── docs/
└── README.md
```

> The project structure may change as development continues.

---

## Development Roadmap

### Phase 1 — Authentication & User Management

**Status: Completed**

* User registration
* Email verification
* OTP verification
* Secure password hashing
* Login
* JWT authentication
* Protected routes
* Forgot password
* Password reset
* Real email delivery
* User profiles

### Phase 2 — Organization & Workspace

**Status: In Progress**

* Organization model
* Organization memberships
* Organization-specific identifiers
* Organization creation
* Organization owner
* Workspace onboarding
* Create workspace UI
* Workspace entry
* Workspace layout
* Workspace switching
* Organization authorization
* Role-based access control

### Phase 3 — Courses & Batches

**Status: Planned**

* Course management
* Batch management
* Trainer assignment
* Mentor assignment
* Student enrollment
* Batch join requests
* Student approval workflow
* Batch invitations
* Class scheduling

### Phase 4 — Training Operations

**Status: Planned**

* Classes
* Attendance
* Training resources
* Recordings
* Tasks
* Student submissions
* Trainer review
* Marks
* Feedback
* Assessments

### Phase 5 — Mentoring & Progress

**Status: Planned**

* Mentor dashboard
* Student guidance
* Mentor feedback
* Student progress
* Course progress
* Batch progress
* Performance tracking
* Training reports

### Phase 6 — Notifications & Certificates

**Status: Planned**

* In-app notifications
* Email notifications
* Task reminders
* Class reminders
* Assessment notifications
* Results
* Certificate generation
* Certificate verification

### Phase 7 — Testing & Deployment

**Status: Planned**

* API testing
* Frontend testing
* Form validation
* Error handling
* Security improvements
* Performance improvements
* Production configuration
* Deployment
* Documentation

---

## Project Goal

TaskFlow is being developed to demonstrate practical full-stack development through a real-world **multi-tenant SaaS application**.

The project focuses on solving common training-management problems such as:

* Managing multiple organizations
* Reducing repetitive trainer work
* Organizing courses and batches
* Managing student enrollment
* Tracking attendance
* Managing tasks and assessments
* Monitoring student progress
* Supporting mentors and trainers
* Centralizing training resources

The long-term goal is to build a platform that can be used by different organizations while keeping each organization's data and operations isolated.

---

## Current Development

TaskFlow is **actively being developed**.

The current focus is on completing the **organization workspace and authorization foundation** before moving into courses, batches, trainers, mentors, and students.

As development progresses, this README will be updated with newly completed features.

---

## Author

**Mounika**

TaskFlow is a personal full-stack SaaS project focused on building a practical training management platform using React, Flask, and PostgreSQL.
