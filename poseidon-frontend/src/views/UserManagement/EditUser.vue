<!-- src/views/UserManagement/EditUser.vue -->

<template>
    <div class="edit-user-container">
      <h2>Edit User</h2>
      <!-- Display error message if any -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <!-- Display success message if update is successful -->
      <div v-if="success" class="success">
        {{ success }}
      </div>
      <form @submit.prevent="handleUpdate">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role" required>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'EditUser',
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const userId = route.params.id;
      const user = ref({
        username: '',
        email: '',
        role: 'User',
      });
      const error = ref('');
      const success = ref('');
  
      const fetchUser = async () => {
        try {
          const response = await store.dispatch('fetchUserById', userId);
          user.value = {
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
          };
        } catch (err) {
          console.error('Failed to fetch user:', err);
          error.value = 'Failed to fetch user details.';
        }
      };
  
      const handleUpdate = async () => {
        // Basic validation
        if (!user.value.username || !user.value.email || !user.value.role) {
          error.value = 'All fields are required.';
          return;
        }
  
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.value.email)) {
          error.value = 'Please enter a valid email address.';
          return;
        }
  
        try {
          await store.dispatch('updateUser', { id: userId, userData: user.value });
          success.value = 'User updated successfully!';
          error.value = '';
  
          // Redirect to user list after a short delay
          setTimeout(() => {
            router.push('/users');
          }, 2000);
        } catch (err) {
          console.error('Failed to update user:', err);
          error.value = err.response?.data?.message || 'Failed to update user.';
          success.value = '';
        }
      };
  
      onMounted(() => {
        fetchUser();
      });
  
      return {
        user,
        handleUpdate,
        error,
        success,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to EditUser component */
  
  .edit-user-container {
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
  