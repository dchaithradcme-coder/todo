import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: '',
    date: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    repeat: 'none'
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add-task`, task);
      alert('✅ Task added!');
      setTask({
        title: '',
        date: '',
        hour: '',
        minute: '',
        ampm: 'AM',
        repeat: 'none'
      });
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="title" placeholder="Task" value={task.title} onChange={handleChange} required />
      <input name="date" type="date" value={task.date} onChange={handleChange} required />
      <input name="hour" type="number" min="1" max="12" value={task.hour} onChange={handleChange} required />
      <input name="minute" type="number" min="0" max="59" value={task.minute} onChange={handleChange} required />
      <select name="ampm" value={task.ampm} onChange={handleChange}>
        <option>AM</option>
        <option>PM</option>
      </select>
      <select name="repeat" value={task.repeat} onChange={handleChange}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}