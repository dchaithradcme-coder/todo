# 🛠️ To-Do App Backend

This is the backend server for the To-Do Reminder App. It handles task storage, scheduling, and push notifications using Node.js, Express, MongoDB, and Web Push.

## 🚀 Features

- REST API for adding and retrieving tasks
- MongoDB integration via Mongoose
- Push notifications using VAPID keys
- Cron-based scheduler for recurring reminders

## 📦 Dependencies

- express
- mongoose
- web-push
- node-cron
- dotenv
- cors
- body-parser

## 📁 Folder Structure

backend/ ├── server.js             # Main Express server ├── models/ │   └── Task.js           # Mongoose schema ├── .env                  # Environment variables (not pushed to GitHub) ├── package.json          # Backend dependencies and start script
# 🔐 Environment Variables

Create a `.env` file in the backend folder with:
MONGODB_URI=your_mongodb_connection_string VAPID_PUBLIC_KEY=your_public_key VAPID_PRIVATE_KEY=your_private_key

## 🧪 Running Locally

```bash
npm install
node server.js
Server will run on http://localhost:3000

---

✅ This version fixes:
- Folder structure formatting (uses code block for clarity)
- Environment variable formatting (uses code block for readability)
- Bash block for install/run commands
- Removes stray line breaks

Let me know if you want me to help write the frontend README next or zip this for submission!





