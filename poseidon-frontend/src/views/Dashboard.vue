<!-- src/views/Dashboard.vue -->

<template>
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <PassengerList />
      <Statistics />
    </div>
  </template>
  
  <script>
  import PassengerList from './UserManagement/PassengerList.vue';
  import Statistics from './Statistics.vue';
  
  export default {
    name: 'Dashboard',
    components: {
      PassengerList,
      Statistics,
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Dashboard component */
  
  .dashboard-container {
    padding: 20px;
  }
  </style>
  