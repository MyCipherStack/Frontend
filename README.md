# ⚡ CipherStack

CipherStack is a **LeetCode-style competitive coding platform** designed for learners, educators, and developers to improve their problem-solving skills collaboratively.  
It features **Group Coding Challenges, 1v1 Battles, Pair Coding Sessions, and Interview Challenges** with real-time collaboration via voice, video, and screen sharing.

---

## 🚀 Features

### 🧩 Core Platform
- Solve algorithmic and data structure problems directly in the browser.
- Supports multiple programming languages.
- Integrated code execution powered by **Judge0**.

### 👥 Collaboration Modes
- **Group Coding Challenges** – Host or join group challenges with a timer and leaderboard.
- **1v1 Challenges** – Compete head-to-head in real-time.
- **Pair Coding Mode** – Shared coding interface for learning or mentorship.
- **Interview Challenges** – Real interview simulations with video/voice/screen sharing.

### 🧑‍💻 User System
- JWT-based authentication (User & Admin tokens).
- Google OAuth integration.
- OTP-based email verification.
- Profile pages with coding stats and challenge history.

### ⚙️ Architecture & Design
- Built using **Clean Architecture + SOLID Principles**.
- **Polyglot Persistence** – Uses different databases based on use cases.
- **Modular design** separating domain, application, infrastructure, and interface layers.

### ☁️ Deployment
- Hosted on **Oracle Free Cloud**.
- Backend containerized with **Docker** and deployed via **NGINX** reverse proxy.
- HTTPS enabled with SSL certificates.

---

## 🏗️ Project Structure

### **Backend** (Node.js + TypeScript)

Backend Setup
docker-compose up --build


Frontend Setup
cd frontend
npm install
npm run dev




**Backend .env**

PORT=5000
MONGO_URI=<your_mongodb_uri>
REDIS_URL=<your_redis_url>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>
OTP_EXPIRY_MINUTES=10
JUDGE0_API_URL=<judge0_api_url>




**Frontend .env**
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_JUDGE0_URL=https://judge0-ce.p.rapidapi.com
