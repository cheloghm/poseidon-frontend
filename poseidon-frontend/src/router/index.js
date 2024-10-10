// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/UserManagement/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import PassengerList from '../views/UserManagement/PassengerList.vue';
import AddPassenger from '../views/UserManagement/AddPassenger.vue';
import EditPassenger from '../views/UserManagement/EditPassenger.vue';
import EditUser from '../views/UserManagement/EditUser.vue'; // Import EditUser component
import Statistics from '../views/Statistics.vue'; // Import Statistics component
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/passengers',
    name: 'PassengerList',
    component: PassengerList,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-passenger',
    name: 'AddPassenger',
    component: AddPassenger,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-passenger/:id',
    name: 'EditPassenger',
    component: EditPassenger,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: EditUser,
    meta: { requiresAuth: true, roles: ['Admin'] }, // Only Admin can edit users
    props: true,
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta: { requiresAuth: true },
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.state.user?.role; // Assuming user object has a 'role' property

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      // If route has role restrictions and user does not have the required role
      next('/dashboard'); // Redirect to dashboard or show an unauthorized page
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
