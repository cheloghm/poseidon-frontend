// src/services/api.js
import axios from 'axios';
import store from '../store';
import config from '../config'; // Ensure this file exports apiBaseUrl

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (requestConfig) => {
    const token = store.getters.getToken; // Use getter
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

export default api;
