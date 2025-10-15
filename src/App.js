import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    repeat: 'none'
  });

  // Fetch tasks on load
  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add-task`, form);
      alert('✅ Task added!');
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

 import React, { useEffect, useState } from 'react';
import { registerPush } from './push';
import { getTasks, addTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    repeat: 'none'
  });

  // Load tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    registerPush();
    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addTask(formData);
      alert('✅ Task added!');
      fetchTasks();
    } catch (err) {
      console.error('❌ Error adding task:', err);
      alert('Failed to add task.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 To-Do Reminder App</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="title" placeholder="Task" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="hour" type="number" min="1" max="12" onChange={handleChange} required />
        <input name="minute" type="number" min="0" max="59" onChange={handleChange} required />
        <select name="ampm" onChange={handleChange}>
          <option>AM</option>
          <option>PM</option>
        </select>
        <select name="repeat" onChange={handleChange}>
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <h2>📋 Scheduled Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} — {task.date} at {task.hour}:{task.minute} {task.ampm} ({task.repeat})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;