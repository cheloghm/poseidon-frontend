<!-- src/views/UserManagement/EditPassenger.vue -->

<template>
    <div class="edit-passenger-container">
      <h2>Edit Passenger</h2>
      <!-- Display error message if any -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="passenger.name" <!-- Bind input to passenger.name -->
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="passenger.email" <!-- Bind input to passenger.email -->
            required
          />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            v-model="passenger.age" <!-- Bind input to passenger.age -->
            required
          />
        </div>
        <button type="submit">Update Passenger</button>
      </form>
    </div>
  </template>
  
  <script>
  // Import the Axios instance for making HTTP requests
  import api from '../../services/api';
  // Import Vue's ref and onMounted for reactive data and lifecycle hooks
  import { ref, onMounted } from 'vue';
  // Import Vue Router's useRouter and useRoute to navigate and access route parameters
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'EditPassenger',
    setup() {
      const router = useRouter(); // Initialize router for navigation
      const route = useRoute(); // Access current route to get passenger ID
      const passenger = ref({
        name: '',
        email: '',
        age: '',
      }); // Reactive object to store passenger data
      const error = ref(''); // Reactive variable to store error messages
  
      /**
       * Fetches passenger data by ID from the backend.
       */
      const fetchPassenger = async () => {
        try {
          // Make GET request to '/passengers/{id}' endpoint
          const response = await api.get(`/passengers/${route.params.id}`);
          passenger.value = response.data; // Populate passenger data with response
          error.value = ''; // Clear any previous errors
        } catch (err) {
          console.error('Error fetching passenger:', err);
          error.value = 'Failed to fetch passenger details.';
        }
      };
  
      /**
       * Handles form submission to update passenger details.
       */
      const handleSubmit = async () => {
        try {
          // Make PUT request to '/passengers/{id}' endpoint with updated data
          const response = await api.put(`/passengers/${route.params.id}`, passenger.value);
          console.log('Passenger updated:', response.data);
  
          // Redirect to Passenger List after successful update
          router.push('/users');
        } catch (err) {
          console.error('Error updating passenger:', err);
          error.value = 'Failed to update passenger.';
        }
      };
  
      // Fetch passenger data when component is mounted
      onMounted(() => {
        fetchPassenger();
      });
  
      return {
        passenger,
        handleSubmit,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to EditPassenger component */
  
  .edit-passenger-container {
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
  
  input {
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
  }
  
  button:hover {
    background-color: #2c8a6e;
  }
  
  .error {
    color: red;
    margin-bottom: 15px;
    text-align: center;
  }
  </style>
  