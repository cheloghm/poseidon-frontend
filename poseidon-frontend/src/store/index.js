// src/store/index.js

import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
    passengers: [],
    currentPage: 1,
    totalPages: 1,
    // Statistics
    statistics: {
        totalPassengers: 0,
        survivalRate: 0,
        numberOfMen: 0,
        numberOfWomen: 0,
        numberOfBoys: 0,
        numberOfGirls: 0,
        numberOfAdults: 0,
        numberOfChildren: 0,
        class1Count: 0,
        class2Count: 0,
        class3Count: 0,
      },
    // Filters
    filterType: '',
    filterValue: {},
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

    SET_PASSENGERS(state, payload) {
      state.passengers = payload.passengers;
      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
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
      state.statistics = { ...state.statistics, ...stats };
    },

    SET_FILTER(state, { type, value }) {
      state.filterType = type;
      state.filterValue = value;
    },

    CLEAR_FILTER(state) {
      state.filterType = '';
      state.filterValue = {};
    },
  },
  actions: {
    // User Actions
    async registerUser({ commit }, userData) {
      try {
        const response = await api.post('/User/register', userData);
        return response.data;
      } catch (error) {
        console.error('Failed to register user:', error);
        throw error;
      }
    },

    async loginUser({ commit }, credentials) {
      try {
        const response = await api.post('/User/login', credentials);
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem('token', token);

        commit('SET_USER', { user, token });

        return response.data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    logout({ commit }) {
      commit('CLEAR_USER');
      localStorage.removeItem('token');
    },

    // In fetchPassengers action
async fetchPassengers({ commit }, { page = 1, pageSize = 10 }) {
    try {
      const response = await api.get('/Passenger/all', {
        params: { page, pageSize },
      });
      console.log('Response data:', response.data);
      commit('SET_PASSENGERS', {
        passengers: response.data.items, // Adjusted based on actual response
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Failed to fetch passengers:', error);
      commit('SET_PASSENGERS', { passengers: [], currentPage: 1, totalPages: 1 });
      throw error;
    }
  },
  
  // In applyFilter action
  async applyFilter({ commit }, { filterType, filterValue, page = 1, pageSize = 10 }) {
    try {
      // ... (existing code)
      const response = await api.get(endpoint, { params });
      console.log('Response data:', response.data);
      commit('SET_PASSENGERS', {
        passengers: response.data.items, // Adjusted based on actual response
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Failed to apply filter:', error);
      commit('SET_PASSENGERS', { passengers: [], currentPage: 1, totalPages: 1 });
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

    // In actions
async fetchStatistics({ commit }) {
    try {
      const [
        totalResp,
        survivalResp,
        menResp,
        womenResp,
        boysResp,
        girlsResp,
        adultsResp,
        childrenResp,
        class1Resp,
        class2Resp,
        class3Resp,
      ] = await Promise.all([
        api.get('/Statistics/total-passengers'),
        api.get('/Passenger/survival-rate'),
        api.get('/Statistics/men'),
        api.get('/Statistics/women'),
        api.get('/Statistics/boys'),
        api.get('/Statistics/girls'),
        api.get('/Statistics/adults'),
        api.get('/Statistics/children'),
        api.get('/Statistics/class/1/count'),
        api.get('/Statistics/class/2/count'),
        api.get('/Statistics/class/3/count'),
      ]);
  
      commit('SET_STATISTICS', {
        totalPassengers: totalResp.data.totalPassengers,
        survivalRate: survivalResp.data.survivalRate,
        numberOfMen: menResp.data.numberOfMen,
        numberOfWomen: womenResp.data.numberOfWomen,
        numberOfBoys: boysResp.data.numberOfBoys,
        numberOfGirls: girlsResp.data.numberOfGirls,
        numberOfAdults: adultsResp.data.numberOfAdults,
        numberOfChildren: childrenResp.data.numberOfChildren,
        class1Count: class1Resp.data.numberOfPassengers,
        class2Count: class2Resp.data.numberOfPassengers,
        class3Count: class3Resp.data.numberOfPassengers,
      });
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  },  

    // Filtering Actions
    async applyFilter({ commit }, { filterType, filterValue, page = 1, pageSize = 10 }) {
      try {
        let endpoint = '/Passenger/all';
        let params = { page, pageSize };

        switch (filterType) {
          case 'survivors':
            endpoint = '/Passenger/survivors';
            break;
          case 'class':
            endpoint = `/Passenger/class/${filterValue.classNumber}`;
            break;
          case 'gender':
            endpoint = `/Passenger/gender/${filterValue.sex}`;
            break;
          case 'ageRange':
            endpoint = '/Passenger/age-range';
            params.minAge = filterValue.minAge;
            params.maxAge = filterValue.maxAge;
            break;
          case 'fareRange':
            endpoint = '/Passenger/fare-range';
            params.minFare = filterValue.minFare;
            params.maxFare = filterValue.maxFare;
            break;
          case 'search':
            endpoint = '/Passenger/search';
            params = { ...filterValue, page, pageSize };
            break;
          default:
            endpoint = '/Passenger/all';
            break;
        }

        const response = await api.get(endpoint, { params });

        commit('SET_PASSENGERS', {
            passengers: response.data.items,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
      } catch (error) {
        console.error('Failed to apply filter:', error);
        commit('SET_PASSENGERS', { passengers: [], currentPage: 1, totalPages: 1 });
        throw error;
      }
    },

    async resetFilter({ commit, dispatch }) {
      commit('CLEAR_FILTER');
      dispatch('fetchPassengers', { page: 1, pageSize: 10 });
    },
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
  },
});
