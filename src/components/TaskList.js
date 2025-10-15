import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  if (tasks.length === 0) {
    return <p>No tasks scheduled yet. Add one above! 📝</p>;
  }

  return (
    <div>
      <h2>📋 Scheduled Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> — {task.date} at {task.hour}:{task.minute.toString().padStart(2, '0')} {task.ampm} ({task.repeat})
          </li>
        ))}
      </ul>
    </div>
  );
}