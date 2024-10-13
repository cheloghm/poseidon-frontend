<template>
    <div class="user-profile-container">
      <h2>User Profile</h2>
      <form @submit.prevent="handleUpdate">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="userData.Username" type="text" id="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="userData.Email" type="email" id="email" required />
        </div>
        <!-- Role should not be editable by the user -->
        <!-- <div class="form-group">
          <label for="role">Role:</label>
          <input v-model="userData.Role" type="text" id="role" disabled />
        </div> -->
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserProfile',
    setup() {
      const store = useStore();
      const userData = ref({
        Username: '',
        Email: '',
        Role: '',
      });
      const error = ref('');
      const success = ref('');
  
      const fetchUserProfile = async () => {
        try {
          await store.dispatch('fetchUserProfile');
          const user = store.getters.getUser;
          userData.value = {
            Username: user.Username,
            Email: user.Email,
            Role: user.Role,
          };
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          error.value = 'Failed to fetch user profile.';
        }
      };
  
      const handleUpdate = async () => {
        try {
          await store.dispatch('updateUserProfile', userData.value);
          success.value = 'Profile updated successfully!';
          error.value = '';
        } catch (err) {
          console.error('Failed to update user profile:', err);
          error.value = err.response?.data || 'Failed to update profile.';
          success.value = '';
        }
      };
  
      onMounted(() => {
        fetchUserProfile();
      });
  
      return {
        userData,
        handleUpdate,
        error,
        success,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  