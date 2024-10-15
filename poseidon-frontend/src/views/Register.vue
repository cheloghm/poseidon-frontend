<!-- src/views/Register.vue -->
<template>
  <div class="register">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label>Username:</label>
          <input v-model="user.username" type="text" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="user.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input v-model="user.password" type="password" required />
        </div>
        <div class="form-group">
          <label>Role:</label>
          <select v-model="user.role" required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      user: {
        id: '',
        username: '',
        email: '',
        password: '',
        role: 'User',
      },
      error: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    async registerUser() {
      try {
        await this.register(this.user);
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>
