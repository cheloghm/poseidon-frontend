<!-- src/views/Dashboard.vue -->

<template>
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <div v-if="passengers.length === 0">
        <p>No passengers found.</p>
      </div>
      <div v-else>
        <h3>Passenger Statistics</h3>
        <!-- Display total number of passengers -->
        <p>Total Passengers: {{ passengers.length }}</p>
        
        <!-- Include the PassengerChart component and pass passengers as a prop -->
        <PassengerChart :passengers="passengers" />
      </div>
    </div>
  </template>
  
  <script>
  // Import Vuex store to access passengers
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  // Import the PassengerChart component
  import PassengerChart from '../components/common/PassengerChart.vue';
  
  export default {
    name: 'Dashboard',
    components: {
      PassengerChart, // Register PassengerChart component
    },
    setup() {
      const store = useStore(); // Access Vuex store
  
      // Compute the list of passengers from the store
      const passengers = computed(() => store.getters.getPassengers);
  
      /**
       * Fetch passengers when the component is mounted.
       */
      onMounted(async () => {
        try {
          await store.dispatch('fetchPassengers'); // Dispatch action to fetch passengers
        } catch (error) {
          console.error('Error fetching passengers for dashboard:', error);
        }
      });
  
      return {
        passengers,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Dashboard component */
  
  .dashboard-container {
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-top: 20px;
  }
  </style>
  