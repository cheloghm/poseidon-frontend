<!-- src/views/UserManagement/Register.vue -->

<template>
    <div class="register-container">
      <h2>User Registration</h2>
      <!-- Display error message if any -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <!-- Display success message if registration is successful -->
      <div v-if="success" class="success">
        {{ success }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="credentials.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="credentials.confirmPassword"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="credentials.role" required>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  // Import the Axios instance for making HTTP requests
  import api from '../../services/api';
  // Import Vue's ref for reactive data
  import { ref } from 'vue';
  // Import Vue Router's useRouter for navigation
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Register',
    setup() {
      const router = useRouter(); // Initialize router for navigation
      const credentials = ref({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      }); // Reactive object to store registration data
      const error = ref(''); // Reactive variable to store error messages
      const success = ref(''); // Reactive variable to store success messages
  
      /**
       * Handles form submission to register a new user.
       */
      const handleSubmit = async () => {
        // Basic validation: Check if passwords match
        if (credentials.value.password !== credentials.value.confirmPassword) {
          error.value = 'Passwords do not match.';
          return;
        }
  
        // Validate email format using helper function or regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.value.email)) {
          error.value = 'Please enter a valid email address.';
          return;
        }
  
        // Validate role selection
        if (!credentials.value.role) {
          error.value = 'Please select a role.';
          return;
        }
  
        try {
          // Make POST request to '/User/register' endpoint with registration data
          const response = await api.post('/User/register', {
            username: credentials.value.username,
            email: credentials.value.email,
            password: credentials.value.password,
            role: credentials.value.role,
          });
          console.log('Registration successful:', response.data);
          success.value = 'Registration successful! Redirecting to login...';
          error.value = ''; // Clear any previous errors
  
          // Redirect to login page after a short delay (e.g., 2 seconds)
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } catch (err) {
          console.error('Registration failed:', err);
          // Display error message from backend or a default message
          error.value = err.response?.data?.message || 'Registration failed.';
          success.value = ''; // Clear any previous success messages
        }
      };
  
      return {
        credentials,
        handleSubmit,
        error,
        success,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Register component */
  
  .register-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2c8a6e;
  }
  
  .error {
    color: red;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .success {
    color: green;
    margin-bottom: 15px;
    text-align: center;
  }
  </style>
  