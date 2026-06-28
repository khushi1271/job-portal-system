# Job Portal System

## Features

- User Authentication (Candidate, Recruiter, Admin)
- Job Posting
- Job Search
- Apply for Jobs
- Resume Upload
- Company Management
- Notifications
- Chat System
- Interview Scheduler
- Admin Dashboard

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- Bcrypt

### Storage

- Cloudinary

---

## Folder Structure

```text
Job-Portal-System
│
├── client
├── server
├── docs
└── README.md
```

---

## Installation Steps

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Create `.env` file inside `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```