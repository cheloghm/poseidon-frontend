// src/services/api.js

/**
 * Axios instance for making HTTP requests to the Poseidon API backend.
 * Includes default headers and an interceptor to attach JWT tokens.
 */

import axios from 'axios'; // Import Axios library
import config from '../config'; // Import API configuration

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: config.apiBaseUrl, // Base URL for API endpoints
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

// Add an interceptor to include JWT token in headers if available
api.interceptors.request.use(
  (request) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, set the Authorization header
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request; // Continue with the request
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api; // Export the Axios instance for use in other files
