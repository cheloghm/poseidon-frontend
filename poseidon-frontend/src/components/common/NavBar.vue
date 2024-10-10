<!-- src/components/NavBar.vue -->

<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/dashboard">Poseidon API Orchestrator</router-link>
      </div>
      <ul class="navbar-links">
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/passengers">Passengers</router-link></li>
        <li v-if="isAdmin"><router-link to="/statistics">Statistics</router-link></li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NavBar',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const isAdmin = computed(() => store.state.user?.role === 'Admin');
      const isAuthenticated = computed(() => store.getters.isAuthenticated);
  
      const logout = () => {
        store.dispatch('logout');
        router.push('/login');
      };
  
      return {
        isAdmin,
        isAuthenticated,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to NavBar component */
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #42b983;
    padding: 10px 20px;
  }
  
  .navbar-brand a {
    color: white;
    font-size: 1.5em;
    text-decoration: none;
  }
  
  .navbar-links {
    list-style: none;
    display: flex;
    gap: 15px;
  }
  
  .navbar-links li a,
  .navbar-links li button {
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1em;
  }
  
  .navbar-links li button:hover,
  .navbar-links li a:hover {
    text-decoration: underline;
  }
  </style>
  