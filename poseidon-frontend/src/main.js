// src/main.js

import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue'; // Import root component
import router from './router'; // Import Vue Router
import store from './store'; // Import Vuex store
import './styles/main.css'; // Import global styles

// Create Vue application instance
const app = createApp(App);

// Register Vuex Store before Router
app.use(store);

// Use Vue Router
app.use(router);

// Mount the app to the DOM element with id 'app'
app.mount('#app');
