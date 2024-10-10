<!-- src/views/Passengers.vue -->

<template>
    <div class="passengers-container">
      <h2>Passengers</h2>
      <PassengerList />
    </div>
  </template>
  
  <script>
  import PassengerList from './UserManagement/PassengerList.vue';
  
  export default {
    name: 'Passengers',
    components: {
      PassengerList,
    },
  };
  </script>
  