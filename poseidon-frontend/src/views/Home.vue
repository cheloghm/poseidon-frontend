<!-- src/views/Home.vue -->
<template>
    <div class="home">
      <h1>Welcome to Poseidon Frontend</h1>
      <p>This is the home page.</p>
  
      <div v-if="isAuthenticated" class="user-details">
        <h2>Your Details</h2>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser']),
      user() {
        return this.getUser;
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
    text-align: center;
  }
  
  .user-details {
    margin-top: 30px;
    text-align: left;
    display: inline-block;
  }
  
  .user-details h2 {
    margin-bottom: 15px;
  }
  
  .user-details p {
    font-size: 16px;
    margin: 5px 0;
  }
  </style>
  