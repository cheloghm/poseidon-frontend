<!-- src/views/UserManagement/PassengerList.vue -->

<template>
    <div class="passenger-list-container">
      <h2>Passenger List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Survived</th>
            <th>Class</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Siblings/Spouses Aboard</th>
            <th>Parents/Children Aboard</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="passenger in passengers" :key="passenger.id">
            <td>{{ passenger.id }}</td>
            <td>{{ passenger.survived ? 'Yes' : 'No' }}</td>
            <td>{{ passenger.pclass }}</td>
            <td>{{ passenger.name }}</td>
            <td>{{ passenger.sex }}</td>
            <td>{{ passenger.age }}</td>
            <td>{{ passenger.siblingsOrSpousesAboard }}</td>
            <td>{{ passenger.parentsOrChildrenAboard }}</td>
            <td>{{ passenger.fare }}</td>
            <td>
              <router-link :to="`/edit-passenger/${passenger.id}`">Edit</router-link>
              <button @click="deletePassenger(passenger.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'PassengerList',
    setup() {
      const store = useStore();
  
      // Computed properties to access state from Vuex store
      const passengers = computed(() => store.getters.getPassengers);
      const currentPage = computed(() => store.state.currentPage);
      const totalPages = computed(() => store.state.totalPages);
  
      // Fetch passengers when component is mounted
      onMounted(() => {
        store.dispatch('fetchPassengers', { page: currentPage.value, pageSize: 10 });
      });
  
      // Methods to handle pagination
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          store.dispatch('fetchPassengers', { page: currentPage.value + 1, pageSize: 10 });
        }
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          store.dispatch('fetchPassengers', { page: currentPage.value - 1, pageSize: 10 });
        }
      };
  
      // Method to delete a passenger
      const deletePassenger = (id) => {
        if (confirm('Are you sure you want to delete this passenger?')) {
          store.dispatch('deletePassenger', id)
            .then(() => {
              alert('Passenger deleted successfully.');
              // Refresh the passenger list after deletion
              store.dispatch('fetchPassengers', { page: currentPage.value, pageSize: 10 });
            })
            .catch(() => {
              alert('Failed to delete passenger.');
            });
        }
      };
  
      return {
        passengers,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        deletePassenger,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to PassengerList component */
  
  .passenger-list-container {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  thead {
    background-color: #f2f2f2;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    font-weight: bold;
  }
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #2c8a6e;
  }
  </style>
  