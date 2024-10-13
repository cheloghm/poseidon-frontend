<!-- src/views/Register.vue -->
<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      user: {
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
    async register() {
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
.register {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #333333;
}
input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
  }
.error {
  color: red;
  margin-top: 10px;
}
</style>
