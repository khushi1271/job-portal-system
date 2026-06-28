# API Planning

## Base URL

/api

---

# Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/logout | Logout User |
| POST | /api/auth/forgot-password | Forgot Password |

---

# Jobs APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get All Jobs |
| GET | /api/jobs/:id | Get Single Job |
| POST | /api/jobs | Create Job |
| PUT | /api/jobs/:id | Update Job |
| DELETE | /api/jobs/:id | Delete Job |

---

# Applications APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/applications | Apply Job |
| GET | /api/applications | Get Applications |
| PATCH | /api/applications/:id | Update Application Status |

---

# Company APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/company | Create Company |
| GET | /api/company/:id | Get Company Details |

---

# Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | Get All Users |
| GET | /api/admin/jobs | Get All Jobs |