// src/store/index.js
import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    getToken: (state) => state.token,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },    
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },    
    UPDATE_USER(state, updatedUser) {
      state.user = { ...state.user, ...updatedUser };
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/User/login', credentials);
        const token = response.data.token;
        commit('SET_TOKEN', token);
        const userResponse = await api.get('/User/me');
        commit('SET_USER', userResponse.data);
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await api.post('/User/register', userData);
        console.log('Registration successful:', response.data);
        // Redirect to login handled in the component
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await api.post('/User/logout');
        commit('CLEAR_AUTH');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async updateUserProfile({ commit }, updatedData) {
      try {
        const response = await api.put('/User/me', updatedData);
        commit('UPDATE_USER', response.data);
      } catch (error) {
        throw error;
      }
    },
    async updatePassengerData({ commit }, { id, data }) {
      try {
        const response = await api.put(`/People/${id}`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
