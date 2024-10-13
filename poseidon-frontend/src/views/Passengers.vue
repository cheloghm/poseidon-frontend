<!-- src/views/Passengers.vue -->
<template>
    <div class="passengers-page">
      <div class="sidebar">
        <button @click="fetchPassengers('all')">All Passengers</button>
        <button @click="fetchPassengers('survivors')">Survivors</button>
        <button @click="fetchPassengers('class', 1)">Class 1</button>
        <button @click="fetchPassengers('class', 2)">Class 2</button>
        <button @click="fetchPassengers('class', 3)">Class 3</button>
        <button @click="fetchPassengers('gender', 'male')">Male Passengers</button>
        <button @click="fetchPassengers('gender', 'female')">Female Passengers</button>
        <button @click="fetchPassengers('search')">Search</button>
      </div>
      <div class="content">
        <!-- Search Form (Displayed when 'search' is selected) -->
        <div v-if="currentEndpoint === 'search'" class="search-form">
          <h3>Search Passengers</h3>
          <form @submit.prevent="searchPassengers">
            <input v-model="searchCriteria.name" placeholder="Name" />
            <input
              v-model.number="searchCriteria.pclass"
              placeholder="Class"
              type="number"
              min="1"
              max="3"
            />
            <select v-model="searchCriteria.sex">
              <option value="">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              v-model.number="searchCriteria.minAge"
              placeholder="Min Age"
              type="number"
              min="0"
            />
            <input
              v-model.number="searchCriteria.maxAge"
              placeholder="Max Age"
              type="number"
              min="0"
            />
            <input
              v-model.number="searchCriteria.minFare"
              placeholder="Min Fare"
              type="number"
              min="0"
              step="0.01"
            />
            <input
              v-model.number="searchCriteria.maxFare"
              placeholder="Max Fare"
              type="number"
              min="0"
              step="0.01"
            />
            <button type="submit">Search</button>
          </form>
        </div>
  
        <!-- Error Message -->
        <p v-if="error" class="error">{{ error }}</p>
  
        <!-- Table of Passengers -->
        <table v-if="passengers.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Class</th>
              <th>Fare</th>
              <th>Survived</th>
              <th v-if="isAdmin">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="passenger in passengers" :key="passenger.id">
              <td>{{ passenger.name }}</td>
              <td>{{ passenger.sex }}</td>
              <td>{{ passenger.age }}</td>
              <td>{{ passenger.pclass }}</td>
              <td>{{ passenger.fare }}</td>
              <td>{{ passenger.survived ? 'Yes' : 'No' }}</td>
              <td v-if="isAdmin">
                <button @click="editPassenger(passenger)">Edit</button>
                <button @click="deletePassenger(passenger.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No passengers to display.</p>
        </div>
  
        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="previousPage" :disabled="page === 1">Previous</button>
          <span>Page {{ page }}</span>
          <button @click="nextPage" :disabled="!hasMore">Next</button>
        </div>
      </div>
  
      <!-- Edit Passenger Modal -->
      <EditPassengerModal
        v-if="showEditModal"
        :passenger="selectedPassenger"
        @close="showEditModal = false"
        @updated="refreshPassengers"
      />
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  import { mapGetters } from 'vuex';
  import EditPassengerModal from '../components/EditPassengerModal.vue';
  import { debounce } from 'lodash';
  
  export default {
    name: 'Passengers',
    components: {
      EditPassengerModal,
    },
    data() {
      return {
        passengers: [],
        page: 1,
        pageSize: 10,
        hasMore: false,
        currentEndpoint: '', // 'all', 'survivors', 'class', 'gender', 'search'
        endpointParam: null, // parameter for endpoints like classNumber or sex
        searchCriteria: {
          name: '',
          pclass: null,
          sex: '',
          minAge: null,
          maxAge: null,
          minFare: null,
          maxFare: null,
        },
        selectedPassenger: null,
        showEditModal: false,
        error: '',
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser']),
      isAdmin() {
        return this.getUser?.role === 'Admin';
      },
    },
    methods: {
      async fetchPassengers(endpoint, param = null) {
        this.currentEndpoint = endpoint;
        this.endpointParam = param;
        this.page = 1;
        this.error = '';
        if (endpoint !== 'search') {
          // Reset search criteria if not searching
          this.searchCriteria = {
            name: '',
            pclass: null,
            sex: '',
            minAge: null,
            maxAge: null,
            minFare: null,
            maxFare: null,
          };
        }
        await this.loadPassengers();
      },
      async loadPassengers() {
        try {
          let url = '';
          let params = {
            page: this.page,
            pageSize: this.pageSize,
          };
  
          if (this.currentEndpoint === 'search') {
            params = {
              ...params,
              ...this.searchCriteria,
            };
            const response = await api.get('/people/search', { params });
            this.passengers = response.data;
            this.hasMore = response.data.length === this.pageSize;
          } else {
            switch (this.currentEndpoint) {
              case 'all':
                url = `/people/all`;
                break;
              case 'survivors':
                url = `/people/survivors`;
                break;
              case 'class':
                url = `/people/class/${this.endpointParam}`;
                break;
              case 'gender':
                url = `/people/gender/${this.endpointParam}`;
                break;
              default:
                return;
            }
            const response = await api.get(url, { params });
            this.passengers = response.data;
            this.hasMore = response.data.length === this.pageSize;
          }
        } catch (err) {
          console.error(err);
          this.error = 'Failed to load passengers. Please try again.';
        }
      },
      nextPage() {
        if (this.hasMore) {
          this.page++;
          this.loadPassengers();
        }
      },
      previousPage() {
        if (this.page > 1) {
          this.page--;
          this.loadPassengers();
        }
      },
      editPassenger(passenger) {
        this.selectedPassenger = { ...passenger }; // Clone to prevent direct mutation
        this.showEditModal = true;
      },
      async deletePassenger(id) {
        if (confirm('Are you sure you want to delete this passenger?')) {
          try {
            await api.delete(`/people/${id}`);
            this.loadPassengers();
          } catch (err) {
            console.error(err);
            this.error = 'Failed to delete passenger. Please try again.';
          }
        }
      },
      refreshPassengers() {
        this.showEditModal = false;
        this.loadPassengers();
      },
      async searchPassengers() {
        this.currentEndpoint = 'search';
        this.page = 1;
        await this.loadPassengers();
      },
    },
    watch: {
      searchCriteria: {
        handler: debounce(function () {
          if (this.currentEndpoint === 'search') {
            this.page = 1;
            this.loadPassengers();
          }
        }, 500), // 500ms debounce
        deep: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .passengers-page {
    display: flex;
    height: calc(100vh - 60px); /* Adjust based on navbar height */
  }
  
  .sidebar {
    width: 220px;
    background-color: #ffffff;
    border-right: 1px solid #eaeaea;
    padding: 20px;
    overflow-y: auto;
  }
  
  .sidebar button {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 12px 20px;
    text-align: left;
    background-color: #f9f9f9;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .sidebar button:hover {
    background-color: #eaeaea;
  }
  
  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .search-form {
    margin-bottom: 20px;
  }
  
  .search-form h3 {
    margin-top: 0;
  }
  
  .search-form form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .search-form input,
  .search-form select {
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  
  .search-form button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .search-form button:hover {
    background-color: #0056b3;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    margin-top: 20px;
  }
  
  thead th {
    text-align: left;
    border-bottom: 2px solid #eaeaea;
    padding: 10px;
  }
  
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
  }
  
  tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  
  .pagination button {
    margin-right: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .pagination button:hover {
    background-color: #0056b3;
  }
  
  .pagination button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  