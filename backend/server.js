require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cron = require('node-cron');
const Task = require('./models/task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Setup VAPID keys for push notifications
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Store push subscriptions
let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// Send push notification
function sendReminderNotification(taskText) {
  const payload = JSON.stringify({
    title: '🔔 Task Reminder',
    body: `Time to: ${taskText}`,
    icon: 'https://via.placeholder.com/100'
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error(err));
  });
}

// Add a task
app.post('/add-task', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send({ message: 'Task saved!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recurring reminder scheduler
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay();
  const currentDate = now.getDate();

  const tasks = await Task.find({ repeat: { $ne: 'none' } });

  tasks.forEach(task => {
    let taskHour = task.hour;
    if (task.ampm === 'PM' && task.hour < 12) taskHour += 12;
    if (task.ampm === 'AM' && task.hour === 12) taskHour = 0;

    const matchTime = taskHour === currentHour && task.minute === currentMinute;
    if (!matchTime) return;

    const taskDate = new Date(task.date);
    const taskDay = taskDate.getDay();
    const taskDateNum = taskDate.getDate();

    let shouldTrigger = false;
    if (task.repeat === 'daily') shouldTrigger = true;
    if (task.repeat === 'weekly' && currentDay === taskDay) shouldTrigger = true;
    if (task.repeat === 'monthly' && currentDate === taskDateNum) shouldTrigger = true;

    if (shouldTrigger) {
      console.log(`🔔 Reminder: ${task.title} at ${currentHour}:${currentMinute}`);
      sendReminderNotification(task.title);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});