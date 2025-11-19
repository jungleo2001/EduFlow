# EduFlow
EduFlow Grader - Assignment Correction System

# 📚 EduFlow Grader - AI-Powered Assignment Correction System

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-000000?style=for-the-badge&logo=redis&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**A scalable, asynchronous assignment correction system built with modern tech stack**

[Demo](#demo) • [Features](#features) • [Architecture](#architecture) • [Installation](#installation) • [API](#api)

</div>

## Overview

EduFlow Grader is a proof-of-concept system that demonstrates **asynchronous processing of student assignments** using AI-powered correction. It mimics real-world education technology platforms by implementing:

- **Background job processing** with BullMQ and Redis
- **Real-time progress tracking** 
- **Scalable worker architecture**
- **Modern full-stack TypeScript development**

This project was built to demonstrate proficiency in the **exact tech stack** used by modern EdTech companies.

## Features

### Core Functionality
- **Async Assignment Processing** - Submit assignments to background queue
- **Real-time Status Updates** - Live progress tracking for teachers
- **AI-Powered Correction** - Simulated AI grading engine
- **Teacher Dashboard** - Monitor all student submissions

### 🛠 Technical Features
- **TypeScript End-to-End** - Full type safety across frontend and backend
- **Message Queue Architecture** - BullMQ with Redis for job management
- **RESTful API** - Clean, documented API endpoints
- **Responsive React UI** - Modern, intuitive interface

## System Architecture

### High-Level Design
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React         │    │   Node.js        │    │   Redis         │
│   Frontend      │────│   API Server     │────│   Message Queue │
│  (TypeScript)   │    │  (TypeScript)    │    │    (BullMQ)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         │              ┌──────────────────┐             │
         └──────────────│   Worker         │─────────────┘
                        │  Processes       │
                        └──────────────────┘
```

### 🔄 Data Flow
1. **Submission** → Teacher submits assignment via React frontend
2. **Queueing** → API adds correction job to BullMQ queue
3. **Processing** → Worker picks up job, simulates AI correction
4. **Completion** → Results stored, frontend notified
5. **Display** → Real-time UI updates with grades and feedback

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Real-time updates** via polling
- **Modern hooks** (useState, useEffect)
- **Clean component architecture**

### Backend  
- **Node.js** with Express and TypeScript
- **BullMQ** for job queue management
- **Redis** for queue persistence and performance
- **RESTful API design**

### Infrastructure
- **Docker** for Redis containerization
- **Horizontal scaling** ready architecture

## Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Redis (via Docker)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/eduflow-grader.git
cd eduflow-grader
```

2. **Start Redis**
```bash
cd backend
docker-compose up redis -d
```

3. **Setup Backend**
```bash
cd backend
npm install
npm run dev
```
*Backend runs on http://localhost:3001*

4. **Setup Frontend**
```bash
cd frontend  
npm install
npm start
```
*Frontend runs on http://localhost:3000*

## 🎮 Usage

### For Teachers
1. Access the dashboard at `http://localhost:3000`
2. Simulate student submissions using the test form
3. Monitor real-time processing status
4. View completed corrections with scores and feedback

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/test` | Health check |
| `GET` | `/api/submissions` | Get all submissions |
| `POST` | `/api/submit` | Submit new assignment |
| `GET` | `/api/queue-stats` | Get queue metrics |

### Example Submission
```bash
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "João Silva", 
    "exercise": "Implement bubble sort in Python"
  }'
```

## 🔧 Development

### Project Structure
```
eduflow-grader/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Express server
│   │   └── correctionQueue.ts # BullMQ queue setup
│   ├── package.json
│   └── docker-compose.yml     # Redis configuration
└── frontend/
    ├── src/
    │   ├── App.tsx            # Main React component
    │   └── components/        # UI components
    └── package.json
```

### Key Implementation Details

**Backend Job Processing:**
```typescript
// Asynchronous job processing with simulated AI
correctionQueue.process('correct-exercise', async (job) => {
  const { studentName, exercise } = job.data;
  
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate realistic grading
  const score = Math.floor(Math.random() * 100);
  const feedback = generateAIFeedback(score, exercise);
  
  return { score, feedback, correctedAt: new Date() };
});
```

**Frontend Real-time Updates:**
```typescript
// Auto-refresh submissions every 3 seconds
useEffect(() => {
  const interval = setInterval(fetchSubmissions, 3000);
  return () => clearInterval(interval);
}, []);
```

## Scaling & Production Readiness

### Current Architecture Supports:
- **Horizontal scaling** of worker processes
- **Queue persistence** with Redis
- **Error handling** and job retries
- **Real-time monitoring** capabilities

### Production Enhancements:
- Add Firebase/Firestore for data persistence
- Implement proper authentication
- Add Docker containers for all services
- Integrate with real AI APIs (OpenAI, etc.)
- Add comprehensive testing suite

## 📊 Performance

- **Queue Throughput**: 1000+ jobs/hour per worker
- **Processing Time**: ~3 seconds per assignment (simulated)
- **Concurrent Workers**: Unlimited horizontal scaling
- **Memory Usage**: Minimal with Redis-backed queues

## 🤝 Contributing

This is a demonstration project, but contributions are welcome! Areas for improvement:

1. Add real AI integration
2. Implement proper database persistence
3. Add unit and integration tests
4. Enhance UI/UX design
5. Add Dockerization for full stack

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 👨‍💻 Author

**Leonardo Jung** - Senior Full Stack Engineer passionate about scalable architectures and education technology.

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ to demonstrate modern full-stack development practices**

</div>

---
