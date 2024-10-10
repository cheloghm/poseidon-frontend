<!-- src/views/UserManagement/PassengerList.vue -->

<template>
    <div class="passenger-list-container">
      <h2>Passenger List</h2>
      
      <!-- Filter Options -->
      <div class="filters">
        <label for="filterType">Filter By:</label>
        <select v-model="filterType" @change="applyFilter">
          <option value="">None</option>
          <option value="survivors">Survivors</option>
          <option value="class">Class</option>
          <option value="gender">Gender</option>
          <option value="ageRange">Age Range</option>
          <option value="fareRange">Fare Range</option>
          <option value="search">Search</option>
        </select>
      </div>
  
      <!-- Dynamic Filter Inputs -->
      <div v-if="filterType === 'class'" class="filter-inputs">
        <label for="classNumber">Class Number:</label>
        <select v-model="filterValue.classNumber">
          <option value="">Select Class</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
  
      <div v-if="filterType === 'gender'" class="filter-inputs">
        <label for="sex">Gender:</label>
        <select v-model="filterValue.sex">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
  
      <div v-if="filterType === 'ageRange'" class="filter-inputs">
        <label for="minAge">Min Age:</label>
        <input type="number" v-model="filterValue.minAge" id="minAge" />
        <label for="maxAge">Max Age:</label>
        <input type="number" v-model="filterValue.maxAge" id="maxAge" />
      </div>
  
      <div v-if="filterType === 'fareRange'" class="filter-inputs">
        <label for="minFare">Min Fare:</label>
        <input type="number" v-model="filterValue.minFare" id="minFare" />
        <label for="maxFare">Max Fare:</label>
        <input type="number" v-model="filterValue.maxFare" id="maxFare" />
      </div>
  
      <div v-if="filterType === 'search'" class="filter-inputs">
        <label for="name">Name:</label>
        <input type="text" v-model="filterValue.name" id="name" />
        <!-- Add more search fields as needed -->
      </div>
  
      <button @click="applyFilter">Apply Filter</button>
      <button @click="resetFilter">Reset Filter</button>
  
      <table v-if="passengers.length > 0">
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
  
      <div v-else>
        <p>No passengers found.</p>
      </div>
  
      <!-- Pagination Controls -->
      <div class="pagination-controls" v-if="passengers.length > 0">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, reactive } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'PassengerList',
    setup() {
      const store = useStore();
  
      const passengers = computed(() => store.getters.getPassengers);
      const currentPage = computed(() => store.state.currentPage);
      const totalPages = computed(() => store.state.totalPages);
  
      const filterType = reactive({ value: '' });
      const filterValue = reactive({
        classNumber: '',
        sex: '',
        minAge: '',
        maxAge: '',
        minFare: '',
        maxFare: '',
        name: '',
        // Add more fields as needed
      });
  
      const fetchInitialPassengers = () => {
        store.dispatch('fetchPassengers', { page: 1, pageSize: 10 });
      };
  
      onMounted(() => {
        fetchInitialPassengers();
      });
  
      const applyFilter = () => {
        let action = 'fetchPassengers';
        let params = { page: 1, pageSize: 10 };
  
        switch (filterType.value) {
          case 'survivors':
            action = 'fetchSurvivors';
            break;
          case 'class':
            if (filterValue.classNumber) {
              action = 'fetchPassengersByClass';
              params.classNumber = filterValue.classNumber;
            } else {
              alert('Please select a class number.');
              return;
            }
            break;
          case 'gender':
            if (filterValue.sex) {
              action = 'fetchPassengersByGender';
              params.sex = filterValue.sex;
            } else {
              alert('Please select a gender.');
              return;
            }
            break;
          case 'ageRange':
            if (filterValue.minAge && filterValue.maxAge) {
              action = 'fetchPassengersByAgeRange';
              params.minAge = filterValue.minAge;
              params.maxAge = filterValue.maxAge;
            } else {
              alert('Please enter both minimum and maximum age.');
              return;
            }
            break;
          case 'fareRange':
            if (filterValue.minFare && filterValue.maxFare) {
              action = 'fetchPassengersByFareRange';
              params.minFare = filterValue.minFare;
              params.maxFare = filterValue.maxFare;
            } else {
              alert('Please enter both minimum and maximum fare.');
              return;
            }
            break;
          case 'search':
            if (filterValue.name) {
              action = 'searchPassengers';
              params.searchCriteria = { name: filterValue.name };
              // Add more search criteria as needed
            } else {
              alert('Please enter a name to search.');
              return;
            }
            break;
          default:
            action = 'fetchPassengers';
            break;
        }
  
        store.dispatch(action, params);
      };
  
      const resetFilter = () => {
        filterType.value = '';
        filterValue.classNumber = '';
        filterValue.sex = '';
        filterValue.minAge = '';
        filterValue.maxAge = '';
        filterValue.minFare = '';
        filterValue.maxFare = '';
        filterValue.name = '';
        // Reset other fields as needed
  
        fetchInitialPassengers();
      };
  
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
        filterType,
        filterValue,
        applyFilter,
        resetFilter,
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
  
  .filters {
    margin-bottom: 20px;
  }
  
  .filter-inputs {
    margin-bottom: 10px;
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
  
  .error {
    color: red;
    margin-bottom: 15px;
  }
  
  .success {
    color: green;
    margin-bottom: 15px;
  }
  </style>
  