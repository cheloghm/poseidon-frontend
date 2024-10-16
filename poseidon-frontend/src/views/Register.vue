<!-- src/views/Register.vue -->
<template>
  <div class="auth-page">
    <div class="auth-container">
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
      <p v-if="error" class="error-message">{{ error }}</p>
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
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  background-color: #f0f2f5;
}

.auth-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.auth-container h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
