// src/services/api.js

import axios from 'axios';
import config from '../config'; // Import API base URL from config.js

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: config.apiBaseUrl, // Set the base URL for all API requests
  headers: {
    'Content-Type': 'application/json', // Set content type to JSON
  },
});

// Add a request interceptor to include the JWT token in headers if available
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      request.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return request; // Return the modified request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Export the Axios instance for use in components and store
export default api;
