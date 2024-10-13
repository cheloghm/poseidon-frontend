<!-- src/views/Unauthorized.vue -->
<template>
    <div class="unauthorized">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Unauthorized',
  };
  </script>
  
  <style scoped>
  .unauthorized {
    padding: 20px;
    text-align: center;
  }
  </style>
  