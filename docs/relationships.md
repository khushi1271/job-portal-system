# Database Relationships

## Main Relationship

User
│
├── Candidate
│
└── Recruiter
        │
        ▼
    Company
        │
        ▼
      Jobs
        │
        ▼
 Applications

---

## Details

### User
- One User can be:
  - Candidate
  - Recruiter
  - Admin

### Candidate
- Can apply for many Jobs.
- Can save many Jobs.
- Can receive many Notifications.
- Can send/receive Messages.
- Can attend Interviews.

### Recruiter
- Can create one or more Companies.
- Can post many Jobs.
- Can schedule Interviews.
- Can send Notifications.

### Company
- One Company can have many Jobs.
- One Company can receive many Reviews.

### Job
- Belongs to one Company.
- Created by one Recruiter.
- Can have many Applications.

### Application
- Belongs to one Candidate.
- Belongs to one Job.

### Interview
- Belongs to one Application.

### Notification
- Belongs to one User.

### Message
- Sender → User
- Receiver → User.

### Review
- Belongs to one Company.

---

## Relationship Diagram

Candidate -----------+
                     |
                     v
                  Application -------> Job -------> Company
                     ^
                     |
Recruiter ----------+
      |
      v
Interview

User
├── Candidate
├── Recruiter
└── Admin

User
├── Notifications
├── Messages
└── Saved Jobs