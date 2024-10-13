<!-- src/components/NavBar.vue -->
<template>
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">Poseidon</router-link>
        <ul class="nav-links">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/passengers">Passengers</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/statistics">Statistics</router-link>
          </li>
          <li v-if="isAuthenticated" class="user-menu">
            <span @click="toggleDropdown">{{ user?.username }}</span>
            <ul v-if="dropdownOpen" class="dropdown">
              <li @click="openProfileModal">Profile</li>
              <li @click="logout">Logout</li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Profile Modal -->
      <ProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
    </nav>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import ProfileModal from './ProfileModal.vue';
  
  export default {
    name: 'NavBar',
    components: {
      ProfileModal,
    },
    data() {
      return {
        dropdownOpen: false,
        showProfileModal: false,
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser']),
      user() {
        return this.getUser;
      },
    },
    methods: {
      ...mapActions(['logout']),
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      openProfileModal() {
        this.showProfileModal = true;
        this.dropdownOpen = false;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.dropdownOpen = false;
        }
      },
      async handleLogout() {
        await this.logout();
        this.$router.push('/login'); // Redirect after logout
      },
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #ffffff;
    border-bottom: 1px solid #eaeaea;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    text-decoration: none;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
  }
  
  .nav-links li {
    margin-left: 20px;
  }
  
  .nav-links a {
    color: #333333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .nav-links a:hover {
    color: #007bff;
  }
  
  .user-menu {
    position: relative;
    cursor: pointer;
  }
  
  .user-menu span {
    font-weight: 500;
    color: #333333;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    min-width: 150px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dropdown li {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .dropdown li:hover {
    background-color: #f5f5f5;
  }
  </style>
  