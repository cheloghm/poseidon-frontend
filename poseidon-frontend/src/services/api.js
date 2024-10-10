// src/services/api.js

import axios from 'axios';
import config from '../config'; // Ensure this points to your config.js with the correct API base URL

const api = axios.create({
  baseURL: config.apiBaseUrl, // e.g., 'http://localhost:5000/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Include JWT token in headers if available
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
