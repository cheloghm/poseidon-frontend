<!-- src/views/UserManagement/UserList.vue -->

<template>
    <div class="user-list-container">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <router-link :to="`/edit-user/${user.id}`">Edit</router-link>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination Controls (if applicable) -->
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserList',
    setup() {
      const store = useStore();
  
      const users = computed(() => store.getters.getUsers);
      const currentPage = computed(() => store.state.currentPage);
      const totalPages = computed(() => store.state.totalPages);
  
      onMounted(() => {
        store.dispatch('fetchUsers', { page: currentPage.value, pageSize: 10 });
      });
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          store.dispatch('fetchUsers', { page: currentPage.value + 1, pageSize: 10 });
        }
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          store.dispatch('fetchUsers', { page: currentPage.value - 1, pageSize: 10 });
        }
      };
  
      const deleteUser = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
          store.dispatch('deleteUser', id)
            .then(() => {
              alert('User deleted successfully.');
              // Refresh the user list after deletion
              store.dispatch('fetchUsers', { page: currentPage.value, pageSize: 10 });
            })
            .catch(() => {
              alert('Failed to delete user.');
            });
        }
      };
  
      return {
        users,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        deleteUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to UserList component */
  
  .user-list-container {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  thead {
    background-color: #f2f2f2;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    font-weight: bold;
  }
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #2c8a6e;
  }
  </style>
  