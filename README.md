# ✅ To-Do Reminder App

A full-stack to-do app with recurring reminders, push notifications, and local alerts — built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## 🚀 Features

- Add tasks with custom date, time, and repeat frequency
- Local reminders with sound, speech, and browser notifications
- Push notifications using VAPID keys
- MongoDB backend with Mongoose
- Cron-based scheduler for recurring tasks

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB (local or Atlas)
- **Notifications**: Web Push API
- **Scheduler**: node-cron

## 📁 Folder Structure
todo-app/ ├── backend/                  # Backend server │   ├── server.js │   ├── models/ │   │   └── Task.js │   ├── .env │   ├── package.json │   └── README.md
├── frontend/                 # Frontend UI │   ├── index.html │   ├── style.css │   ├── script.js │   ├── sw.js │   └── assets/
├── README.md                 # Main project README

## 📦 Installation

### Backend
```bash
cd backend
npm install
node server.js