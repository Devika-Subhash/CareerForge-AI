
# CareerForge AI

CareerForge AI is a MERN stack web application designed to help job seekers manage and improve their job-search process.

## 🚀 Features

### 🔐 Authentication
- User signup and login
- JWT-based authentication
- Protected routes
- Public and protected page handling

### 📊 Dashboard
- Personalized user dashboard
- Job application statistics
- Interview practice statistics
- Career-related overview

### 📄 Resume Analyzer
- Upload and analyze resumes
- Compare resume skills with job requirements
- Identify matching and missing skills
- AI-powered resume suggestions

### 🎤 Interview Preparation
- Practice interview questions based on the target job role
- Role-specific question categories
- Record answers for each question
- Calculate and display interview scores
- Review completed interviews

### 📋 Interview History
- Save completed interview sessions
- Store questions and answers in MongoDB
- Store interview scores
- View previous interview sessions

### 💼 Job Tracker
- Track job applications
- Store job details
- Track application status
- Manage job-search progress

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- React Bootstrap
- JavaScript
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### AI
- OpenAI API

---

## 📁 Project Structure

```text
CareerForge AI/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── resumeController.js
│   │   └── interviewController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Interview.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── interviewRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ResumeAnalyzer.jsx
│   │   ├── InterviewPrep.jsx
│   │   ├── InterviewHistory.jsx
│   │   └── JobTracker.jsx
│   │
│   └── App.jsx
│
├── .gitignore
├── package.json
└── README.md

