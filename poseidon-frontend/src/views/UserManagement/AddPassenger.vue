<!-- src/views/UserManagement/AddPassenger.vue -->

<template>
    <div class="add-passenger-container">
      <h2>Add New Passenger</h2>
      <!-- Display error message if any -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="passenger.name"
            required
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="passenger.email"
            required
          />
        </div>
        <div>
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            v-model="passenger.age"
            required
          />
        </div>
        <button type="submit">Add Passenger</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../../services/api'; // Import Axios instance
  import { ref } from 'vue'; // Import ref for reactive variables
  import { useRouter } from 'vue-router'; // Import useRouter for navigation
  
  export default {
    name: 'AddPassenger',
    setup() {
      const router = useRouter(); // Initialize router
      const passenger = ref({
        name: '',
        email: '',
        age: '',
      }); // Reactive object for passenger data
      const error = ref(''); // Reactive variable for error messages
  
      /**
       * Handles form submission to add a new passenger.
       */
      const handleSubmit = async () => {
        try {
          // Make POST request to '/passengers' endpoint with passenger data
          const response = await api.post('/passengers', passenger.value);
          console.log('Passenger added:', response.data);
  
          // Redirect to Passenger List after successful addition
          router.push('/users');
        } catch (err) {
          console.error('Error adding passenger:', err);
          error.value = 'Failed to add passenger.';
        }
      };
  
      return {
        passenger,
        handleSubmit,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to AddPassenger component */
  .add-passenger-container {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
  }
  
  form div {
    margin-bottom: 15px;
    text-align: left;
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
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
    margin-bottom: 10px;
  }
  </style>
  