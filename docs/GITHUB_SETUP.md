# GitHub Repository Setup Guide

## Repository Information

### Recommended Repository Details

**Repository Name:** 
```
job-application-system
```

**Alternative Names:**
- `enginow-internship`
- `internship-portal`
- `job-application-portal`

**Repository Description:**
```
A full-stack job application and internship management system built with React, Node.js, 
Express, and MongoDB. Features user authentication, job listings with advanced filters, 
job application tracking, and admin dashboard for managing opportunities and applicant statuses. 
Production-ready with JWT authentication, role-based access control, and comprehensive error handling.
```

**Repository Topics/Tags:**
```
react
nodejs
express
mongodb
full-stack
job-portal
internship
jwt-authentication
job-application
dashboard
```

---

## Steps to Create GitHub Repository

### 1. Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `job-application-system`
3. Description: (Use the description above)
4. Set to **Public**
5. Add README: No (we have one)
6. Add .gitignore: Yes, select Node
7. License: MIT
8. Click **Create repository**

### 2. Clone Locally (if starting fresh)
```bash
cd /path/to/projects
git clone https://github.com/yourusername/job-application-system.git
cd job-application-system
```

### 3. Push Existing Project
```bash
cd ~/Desktop/Enginow-2

# Initialize git (if not already initialized)
git init
git branch -M main

# Add remote
git remote add origin https://github.com/yourusername/job-application-system.git

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Full-stack job application system"

# Push to GitHub
git push -u origin main
```

### 4. Create .gitignore (if not present)
```gitignore
# Backend
backend/node_modules/
backend/.env
backend/.env.local
backend/npm-debug.log
backend/dist/
backend/build/

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env.local
frontend/npm-debug.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
logs/

# Test results
test-flow-v2.js
test-me-endpoint.js
test-complete-flow.js
```

### 5. Setup GitHub Workflows (Optional - for CI/CD)

Create `.github/workflows/test.yml`:
```yaml
name: Test Workflow

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install backend dependencies
      run: cd backend && npm install
    
    - name: Install frontend dependencies
      run: cd frontend && npm install
    
    - name: Run linter (backend)
      run: cd backend && npm run lint --if-present
      continue-on-error: true
    
    - name: Run tests (frontend)
      run: cd frontend && npm test --if-present
      continue-on-error: true
```

---

## Repository Content Structure

```
job-application-system/
├── README.md                      # Main documentation
├── LICENSE                        # MIT License
├── .gitignore                     # Git ignore rules
├── .github/
│   └── workflows/
│       └── test.yml              # CI/CD workflow
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── README.md                 # Backend specific docs
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   ├── public/
│   └── README.md                 # Frontend specific docs
│
└── docs/
    ├── API.md                    # API documentation
    ├── DEPLOYMENT.md             # Deployment guide
    ├── ARCHITECTURE.md           # System architecture
    └── CONTRIBUTING.md           # Contributing guidelines
```

---

## Create Additional Documentation

### Backend README (backend/README.md)
```markdown
# Backend - Job Application System

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Running

```bash
npm run dev
```

Server runs on http://localhost:5000
```

### Frontend README (frontend/README.md)
```markdown
# Frontend - Job Application System

## Installation

```bash
cd frontend
npm install
```

## Running

```bash
npm run dev
```

App runs on http://localhost:3000

## Building

```bash
npm run build
```
```

---

## GitHub Releases & Versioning

When ready to release:

```bash
# Create a tag
git tag -a v1.0.0 -m "Initial production release"

# Push tag to GitHub
git push origin v1.0.0

# Create GitHub Release via web UI with:
# - Title: "v1.0.0 - Initial Release"
# - Description: Release notes and changelog
```

---

## GitHub Pages (Optional Documentation Site)

Enable GitHub Pages in repository settings:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: /docs (if you create a docs folder)

---

## Badge for README

Add this to your README.md header:

```markdown
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/status-Production%20Ready-success)](https://github.com)
```

---

## Quick Links to Share

Once repository is created:

```
GitHub: https://github.com/yourusername/job-application-system
Issues: https://github.com/yourusername/job-application-system/issues
Discussions: https://github.com/yourusername/job-application-system/discussions
```

---

## Deployment Links

**Frontend (Vercel):** https://your-app.vercel.app  
**Backend (Render):** https://your-api.onrender.com  
**Database (MongoDB Atlas):** [Connection String in .env]

---

**Created:** February 8, 2026  
**Project Version:** 1.0.0
