<!-- src/App.vue -->

<template>
  <div id="app">
    <!-- Include the navigation bar -->
    <NavBar />
    <!-- Display the current route's component -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/common/NavBar.vue'; // Import NavBar component

export default {
  name: 'App',
  components: {
    NavBar, // Register NavBar component
  },
};
</script>

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  text-align: center;
}
</style>
