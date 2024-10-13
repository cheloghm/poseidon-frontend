// src/store/index.js
import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    token: null, // Add token to state
    isAuthenticated: false,
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    getToken: (state) => state.token, // Getter for token
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    SET_TOKEN(state, token) { // Mutation to set token
      state.token = token;
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
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
        // Decode token to get user info or fetch user details
        // Assuming the token contains user info
        // Alternatively, you might need to call /User/me
        const userResponse = await api.get('/User/me');
        commit('SET_USER', userResponse.data);
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await api.post('/User/register', userData);
        // Assuming registration also returns a token
        const token = response.data.token;
        commit('SET_TOKEN', token);
        const userResponse = await api.get('/User/me');
        commit('SET_USER', userResponse.data);
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await api.post('/User/logout');
        commit('CLEAR_AUTH');
        // Optionally, redirect to login
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
