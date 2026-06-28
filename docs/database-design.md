# Database Design

## Collections

### 1. Users
- _id
- name
- email
- password
- role (candidate/recruiter/admin)
- phone
- profileImage
- resume
- skills
- experience
- createdAt

### 2. Companies
- _id
- companyName
- logo
- website
- location
- recruiterId
- description

### 3. Jobs
- _id
- title
- companyId
- recruiterId
- salary
- location
- jobType
- skills
- description
- deadline

### 4. Applications
- _id
- userId
- jobId
- resume
- status
- appliedAt

### 5. Notifications
- _id
- userId
- title
- message
- isRead

### 6. Messages
- _id
- senderId
- receiverId
- message
- createdAt

### 7. Reviews
- _id
- companyId
- userId
- rating
- review

### 8. SavedJobs
- _id
- userId
- jobId

### 9. Interviews
- _id
- applicationId
- recruiterId
- candidateId
- interviewDate
- interviewMode
- status