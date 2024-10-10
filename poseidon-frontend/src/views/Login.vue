<!-- src/views/Login.vue -->

<template>
    <div class="login-container">
      <h2>Login</h2>
      <!-- Display error message if any -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <form @submit.prevent="handleLogin">
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
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Login',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const credentials = ref({
        email: '',
        password: '',
      });
      const error = ref('');
  
      const handleLogin = async () => {
        try {
          // Dispatch the loginUser action
          await store.dispatch('loginUser', {
            email: credentials.value.email,
            password: credentials.value.password,
          });
          error.value = '';
  
          // Redirect to Dashboard after successful login
          router.push('/dashboard');
        } catch (err) {
          console.error('Login failed:', err);
          // Display error message from backend or a default message
          error.value = err.response?.data?.message || 'Login failed. Please check your credentials.';
        }
      };
  
      return {
        credentials,
        handleLogin,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Login component */
  
  .login-container {
    max-width: 400px;
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
  </style>
  