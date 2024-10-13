<!-- src/components/ProfileModal.vue -->
<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label>Username:</label>
            <input v-model="form.username" type="text" required disabled />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div class="form-actions">
            <button type="submit">Save</button>
            <button type="button" @click="close">Cancel</button>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">{{ success }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'ProfileModal',
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
        },
        error: '',
        success: '',
      };
    },
    computed: {
      ...mapGetters(['getUser']),
    },
    methods: {
      ...mapActions(['updateUserProfile']),
      close() {
        this.$emit('close');
      },
      async updateProfile() {
        try {
          this.error = '';
          this.success = '';
  
          // Prepare the data to be sent. Only include password if it's not empty.
          const updatedData = {
            email: this.form.email,
            ...(this.form.password && { password: this.form.password }),
          };
  
          await this.updateUserProfile(updatedData);
          this.success = 'Profile updated successfully.';
          this.$emit('close'); // Close the modal after successful update
        } catch (err) {
          console.error(err);
          this.error =
            err.response?.data?.message || 'Failed to update profile. Please try again.';
        }
      },
      populateForm() {
        const user = this.getUser;
        this.form.username = user.username;
        this.form.email = user.email;
        this.form.password = ''; // Clear password field
      },
    },
    mounted() {
      this.populateForm();
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  .modal-content {
    background-color: #ffffff;
    padding: 20px 30px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type='submit'] {
    background-color: #28a745;
    color: #ffffff;
  }
  
  button[type='button'] {
    background-color: #dc3545;
    color: #ffffff;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  </style>
  