// src/store/index.js

import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
    passengers: [],
    currentPage: 1,
    totalPages: 10,
    statistics: {},
    // ... other state properties
    users: [],
    // Pagination state for users
    userCurrentPage: 1,
    userTotalPages: 1,
    survivors: [],
    classPassengers: [],
    genderPassengers: [],
    ageRangePassengers: [],
    fareRangePassengers: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },

    CLEAR_USER(state) {
      state.user = null;
      state.token = '';
    },

    SET_PASSENGERS(state, passengers) {
      state.passengers = passengers.data;
      state.currentPage = passengers.currentPage;
      state.totalPages = passengers.totalPages;
    },

    ADD_PASSENGER(state, passenger) {
      state.passengers.push(passenger);
    },

    UPDATE_PASSENGER(state, updatedPassenger) {
      const index = state.passengers.findIndex(p => p.id === updatedPassenger.id);
      if (index !== -1) {
        state.passengers.splice(index, 1, updatedPassenger);
      }
    },

    REMOVE_PASSENGER(state, passengerId) {
      state.passengers = state.passengers.filter(p => p.id !== passengerId);
    },

    SET_STATISTICS(state, stats) {
      state.statistics = stats;
    },

    // Updated SET_USERS mutation with pagination data
    SET_USERS(state, users) {
      state.users = users.data;
      state.userCurrentPage = users.currentPage;
      state.userTotalPages = users.totalPages;
    },

    // Added REMOVE_USER mutation
    REMOVE_USER(state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
    },

    SET_SURVIVORS(state, payload) {
        state.survivors = payload.passengers;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      },
  
      SET_CLASS_PASSENGERS(state, payload) {
        state.classPassengers = payload.passengers;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      },
  
      SET_GENDER_PASSENGERS(state, payload) {
        state.genderPassengers = payload.passengers;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      },
  
      SET_AGE_RANGE_PASSENGERS(state, payload) {
        state.ageRangePassengers = payload.passengers;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      },
  
      SET_FARE_RANGE_PASSENGERS(state, payload) {
        state.fareRangePassengers = payload.passengers;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      },

    // ... other mutations
  },
  actions: {
    // ... existing actions

    async fetchPassengers({ commit }, { page = 1, pageSize = 10 }) {
      try {
        const response = await api.get('/Passenger/all', {
          params: { page, pageSize },
        });
        commit('SET_PASSENGERS', response.data);
      } catch (error) {
        console.error('Failed to fetch passengers:', error);
        throw error;
      }
    },

    async deletePassenger({ commit }, passengerId) {
      try {
        await api.delete(`/Passenger/${passengerId}`);
        commit('REMOVE_PASSENGER', passengerId);
      } catch (error) {
        console.error('Failed to delete passenger:', error);
        throw error;
      }
    },

    // Statistics Actions
    async fetchTotalPassengers({ commit }) {
      try {
        const response = await api.get('/Statistics/total-passengers');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch total passengers:', error);
        throw error;
      }
    },

    async fetchSurvivalRate({ commit }) {
      try {
        const response = await api.get('/Passenger/survival-rate');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch survival rate:', error);
        throw error;
      }
    },

    async fetchNumberOfMen({ commit }) {
      try {
        const response = await api.get('/Statistics/men');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of men:', error);
        throw error;
      }
    },

    async fetchNumberOfWomen({ commit }) {
      try {
        const response = await api.get('/Statistics/women');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of women:', error);
        throw error;
      }
    },

    async fetchNumberOfBoys({ commit }) {
      try {
        const response = await api.get('/Statistics/boys');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of boys:', error);
        throw error;
      }
    },

    async fetchNumberOfGirls({ commit }) {
      try {
        const response = await api.get('/Statistics/girls');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of girls:', error);
        throw error;
      }
    },

    async fetchNumberOfAdults({ commit }) {
      try {
        const response = await api.get('/Statistics/adults');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of adults:', error);
        throw error;
      }
    },

    async fetchNumberOfChildren({ commit }) {
      try {
        const response = await api.get('/Statistics/children');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch number of children:', error);
        throw error;
      }
    },

    // User Actions
    async fetchUserById({ commit }, userId) {
      try {
        const response = await api.get(`/User/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch user by ID:', error);
        throw error;
      }
    },

    async updateUser({ commit }, { id, userData }) {
      try {
        await api.put(`/User/${id}`, userData);
        // Optionally, fetch the updated user or update state accordingly
      } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
      }
    },

    async fetchUsers({ commit }, { page = 1, pageSize = 10 }) {
      try {
        const response = await api.get('/User/all', {
          params: { page, pageSize },
        });
        commit('SET_USERS', response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
      }
    },

    // Added deleteUser action
    async deleteUser({ commit }, userId) {
      try {
        await api.delete(`/User/${userId}`);
        commit('REMOVE_USER', userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
      }
    },

     // Fetch Survivors
     async fetchSurvivors({ commit }, { page = 1, pageSize = 10 }) {
        try {
          const response = await api.get('/Passenger/survivors', {
            params: { page, pageSize },
          });
          commit('SET_SURVIVORS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error('Failed to fetch survivors:', error);
          throw error;
        }
      },
  
      // Fetch Passengers by Class
      async fetchPassengersByClass({ commit }, { classNumber, page = 1, pageSize = 10 }) {
        try {
          const response = await api.get(`/Passenger/class/${classNumber}`, {
            params: { page, pageSize },
          });
          commit('SET_CLASS_PASSENGERS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error(`Failed to fetch passengers of class ${classNumber}:`, error);
          throw error;
        }
      },
  
      // Fetch Passengers by Gender
      async fetchPassengersByGender({ commit }, { sex, page = 1, pageSize = 10 }) {
        try {
          const response = await api.get(`/Passenger/gender/${sex}`, {
            params: { page, pageSize },
          });
          commit('SET_GENDER_PASSENGERS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error(`Failed to fetch passengers with gender ${sex}:`, error);
          throw error;
        }
      },
  
      // Fetch Passengers by Age Range
      async fetchPassengersByAgeRange({ commit }, { minAge, maxAge, page = 1, pageSize = 10 }) {
        try {
          const response = await api.get('/Passenger/age-range', {
            params: { minAge, maxAge, page, pageSize },
          });
          commit('SET_AGE_RANGE_PASSENGERS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error('Failed to fetch passengers by age range:', error);
          throw error;
        }
      },
  
      // Fetch Passengers by Fare Range
      async fetchPassengersByFareRange({ commit }, { minFare, maxFare, page = 1, pageSize = 10 }) {
        try {
          const response = await api.get('/Passenger/fare-range', {
            params: { minFare, maxFare, page, pageSize },
          });
          commit('SET_FARE_RANGE_PASSENGERS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error('Failed to fetch passengers by fare range:', error);
          throw error;
        }
      },
  
      // Search Passengers
      async searchPassengers({ commit }, { searchCriteria, page = 1, pageSize = 10 }) {
        try {
          const response = await api.get('/Passenger/search', {
            params: { ...searchCriteria, page, pageSize },
          });
          commit('SET_PASSENGERS', {
            passengers: response.data.passengers,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          });
        } catch (error) {
          console.error('Failed to search passengers:', error);
          throw error;
        }
      },

    // ... other actions
  },
  getters: {
    getUser(state) {
      return state.user;
    },

    getToken(state) {
      return state.token;
    },

    getPassengers(state) {
      return state.passengers;
    },

    isAuthenticated(state) {
      return !!state.token;
    },

    currentPage(state) {
      return state.currentPage;
    },

    totalPages(state) {
      return state.totalPages;
    },

    getStatistics(state) {
      return state.statistics;
    },

    // Added getUsers getter
    getUsers(state) {
      return state.users;
    },

    // User pagination getters
    userCurrentPage(state) {
      return state.userCurrentPage;
    },

    userTotalPages(state) {
      return state.userTotalPages;
    },

    // Getters for specific passenger lists
    getSurvivors(state) {
        return state.survivors;
      },
  
      getClassPassengers(state) {
        return state.classPassengers;
      },
  
      getGenderPassengers(state) {
        return state.genderPassengers;
      },
  
      getAgeRangePassengers(state) {
        return state.ageRangePassengers;
      },
  
      getFareRangePassengers(state) {
        return state.fareRangePassengers;
      },
  },
});
