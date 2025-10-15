
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL
});

// Task APIs
export const getTasks = () => api.get('/tasks');
export const addTask = (task) => api.post('/add-task', task);

// Push Notification API
export const subscribeToPush = (subscription) => api.post('/subscribe', subscription);

export default api;