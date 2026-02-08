# API Documentation

## Base URL

**Development:** `http://localhost:5000/api`  
**Production:** `https://your-api.onrender.com/api`

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

Token format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
Expiry: 7 days  
Renewal: Requires re-login

---

## Endpoints

### 1. Authentication (Public)

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // or "admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6988d4943d5038926b978bc3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

---

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6988d4943d5038926b978bc3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d4943d5038926b978bc3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-02-08T18:23:16.354Z",
    "updatedAt": "2026-02-08T18:23:16.354Z"
  }
}
```

**Error (401):**
```json
{
  "message": "Token is not valid"
}
```

---

### 2. Jobs (Open for browsing, admin only for CRUD)

#### Get All Jobs
```http
GET /api/jobs
GET /api/jobs?type=Internship
GET /api/jobs?role=Frontend%20Developer
GET /api/jobs?location=Remote
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "jobs": [
    {
      "_id": "6988d49e3d5038926b978bce",
      "title": "Frontend Developer Internship",
      "description": "Build modern React applications",
      "skills": ["React", "JavaScript", "CSS"],
      "type": "Internship",
      "role": "Frontend Developer",
      "location": "Remote",
      "stipend": 50000,
      "duration": "3 months",
      "isActive": true,
      "createdBy": "6988d4943d5038926b978bc1",
      "createdAt": "2026-02-08T18:23:45.123Z"
    }
  ]
}
```

---

#### Get Single Job
```http
GET /api/jobs/6988d49e3d5038926b978bce
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d49e3d5038926b978bce",
    "title": "Frontend Developer Internship",
    "description": "Build modern React applications",
    "skills": ["React", "JavaScript", "CSS"],
    "type": "Internship",
    "role": "Frontend Developer",
    "location": "Remote",
    "stipend": 50000,
    "duration": "3 months",
    "isActive": true,
    "createdBy": {
      "_id": "6988d4943d5038926b978bc1",
      "name": "Admin User"
    },
    "createdAt": "2026-02-08T18:23:45.123Z",
    "appliedCount": 3
  }
}
```

**Error (404):**
```json
{
  "message": "Job not found"
}
```

---

#### Create Job (Admin Only)
```http
POST /api/jobs
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Backend Developer Internship",
  "description": "Build scalable Node.js APIs",
  "skills": ["Node.js", "Express", "MongoDB"],
  "type": "Internship",
  "role": "Backend Developer",
  "location": "Remote",
  "stipend": 60000,
  "duration": "3 months"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d49e3d5038926b978bce",
    "title": "Backend Developer Internship",
    "description": "Build scalable Node.js APIs",
    "skills": ["Node.js", "Express", "MongoDB"],
    "type": "Internship",
    "role": "Backend Developer",
    "location": "Remote",
    "stipend": 60000,
    "duration": "3 months",
    "isActive": true,
    "createdBy": "6988d4943d5038926b978bc1",
    "createdAt": "2026-02-08T19:00:00.000Z"
  }
}
```

**Error (403):**
```json
{
  "message": "Only admins can create jobs"
}
```

---

#### Update Job (Admin Only)
```http
PUT /api/jobs/6988d49e3d5038926b978bce
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "stipend": 70000,
  "isActive": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": { /* updated job object */ }
}
```

---

#### Delete Job (Admin Only)
```http
DELETE /api/jobs/6988d49e3d5038926b978bce
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

### 3. Applications (User & Admin)

#### Create Application (User)
```http
POST /api/applications
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "jobId": "6988d49e3d5038926b978bce",
  "resumeLink": "https://example.com/resume.pdf",
  "coverNote": "I am very interested in this opportunity!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d49e3d5038926b978bd6",
    "userId": "6988d4943d5038926b978bc3",
    "jobId": "6988d49e3d5038926b978bce",
    "resumeLink": "https://example.com/resume.pdf",
    "coverNote": "I am very interested in this opportunity!",
    "status": "Applied",
    "appliedAt": "2026-02-08T19:15:30.000Z",
    "updatedAt": "2026-02-08T19:15:30.000Z"
  }
}
```

**Error (409):**
```json
{
  "message": "You have already applied for this job"
}
```

---

#### Get User Applications
```http
GET /api/applications/me
Authorization: Bearer <user_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6988d49e3d5038926b978bd6",
      "userId": "6988d4943d5038926b978bc3",
      "jobId": {
        "_id": "6988d49e3d5038926b978bce",
        "title": "Frontend Developer Internship"
      },
      "resumeLink": "https://example.com/resume.pdf",
      "coverNote": "I am very interested in this opportunity!",
      "status": "Applied",
      "appliedAt": "2026-02-08T19:15:30.000Z"
    }
  ]
}
```

---

#### Get All Applications (Admin Only)
```http
GET /api/applications/
Authorization: Bearer <admin_token>

// With filters
GET /api/applications/?status=Shortlisted
GET /api/applications/?jobId=6988d49e3d5038926b978bce
```

**Response (200):**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "6988d49e3d5038926b978bd6",
      "userId": {
        "_id": "6988d4943d5038926b978bc3",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "jobId": {
        "_id": "6988d49e3d5038926b978bce",
        "title": "Frontend Developer Internship"
      },
      "resumeLink": "https://example.com/resume.pdf",
      "coverNote": "I am very interested in this opportunity!",
      "status": "Applied",
      "appliedAt": "2026-02-08T19:15:30.000Z"
    }
  ]
}
```

---

#### Update Application Status (Admin Only)
```http
PUT /api/applications/6988d49e3d5038926b978bd6/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Shortlisted"
}
```

**Valid statuses:** `Applied`, `Shortlisted`, `Selected`, `Rejected`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d49e3d5038926b978bd6",
    "userId": "6988d4943d5038926b978bc3",
    "jobId": "6988d49e3d5038926b978bce",
    "status": "Shortlisted",
    "updatedAt": "2026-02-08T20:00:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "message": "Invalid status"
}
```

---

#### Get Application Details
```http
GET /api/applications/6988d49e3d5038926b978bd6
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6988d49e3d5038926b978bd6",
    "userId": { /* user details */ },
    "jobId": { /* job details */ },
    "resumeLink": "https://example.com/resume.pdf",
    "coverNote": "I am very interested in this opportunity!",
    "status": "Shortlisted",
    "appliedAt": "2026-02-08T19:15:30.000Z",
    "updatedAt": "2026-02-08T20:00:00.000Z"
  }
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal server error |

---

## Rate Limiting

No rate limiting currently implemented. Recommended for production:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Example Requests

### Using cURL
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","role":"user"}'

# Get jobs
curl http://localhost:5000/api/jobs

# Apply for job (with token)
curl -X POST http://localhost:5000/api/applications \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"jobId":"6988d49e3d5038926b978bce","resumeLink":"url","coverNote":"msg"}'
```

### Using JavaScript/Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Signup
const signup = await api.post('/auth/signup', {
  name: 'John',
  email: 'john@example.com',
  password: 'pass123',
  role: 'user'
});

// Get jobs
const jobs = await api.get('/jobs');

// Apply for job
const application = await api.post('/applications', {
  jobId: 'job_id_here',
  resumeLink: 'https://example.com/resume.pdf',
  coverNote: 'Interest message'
});
```

---

**Last Updated:** February 8, 2026  
**API Version:** 1.0.0  
**Status:** Production Ready ✅
