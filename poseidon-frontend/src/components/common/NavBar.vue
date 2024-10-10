<!-- src/components/common/NavBar.vue -->

<template>
    <header class="app-header">
      <div class="container">
        <h1>Poseidon API Orchestrator</h1>
        <nav>
          <ul>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/users">Passengers</router-link></li>
            <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
            <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
            <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import { useStore } from 'vuex'; // Import useStore once
  import { computed } from 'vue'; // Import computed
  import { useRouter } from 'vue-router'; // Import useRouter
  
  export default {
    name: 'NavBar',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      // Debugging: Log the store to verify it's accessible
      console.log('Vuex Store:', store);
  
      const isAuthenticated = computed(() => {
        if (!store) {
          console.error('Vuex store is not available!');
          return false;
        }
        return store.getters.isAuthenticated;
      });
  
      const logout = () => {
        store.dispatch('logout');
        router.push('/login');
      };
  
      return {
        isAuthenticated,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to NavBar component */
  
  .app-header {
    background-color: #42b983;
    padding: 15px 0;
    color: white;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h1 {
    margin: 0;
    font-size: 1.5em;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 15px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  