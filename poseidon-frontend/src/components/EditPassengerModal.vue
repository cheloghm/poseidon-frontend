<!-- src/components/EditPassengerModal.vue -->
<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>Edit Passenger</h2>
        <form @submit.prevent="updatePassenger">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="form.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Sex:</label>
            <select v-model="form.sex" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Age:</label>
            <input v-model.number="form.age" type="number" min="0" />
          </div>
          <div class="form-group">
            <label>Class:</label>
            <input v-model.number="form.pclass" type="number" min="1" max="3" required />
          </div>
          <div class="form-group">
            <label>Fare:</label>
            <input v-model.number="form.fare" type="number" min="0" step="0.01" />
          </div>
          <div class="form-group">
            <label>Survived:</label>
            <select v-model="form.survived" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit">Save</button>
            <button type="button" @click="close">Cancel</button>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'EditPassengerModal',
    props: {
      passenger: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        form: {
          name: '',
          sex: 'male',
          age: 0,
          pclass: 1,
          fare: 0,
          survived: false,
        },
        error: '',
      };
    },
    methods: {
      ...mapActions(['updatePassengerData']),
      close() {
        this.$emit('close');
      },
      async updatePassenger() {
        try {
          this.error = '';
          // Call the Vuex action to update the passenger
          await this.updatePassengerData({
            id: this.passenger.id,
            data: { ...this.form },
          });
          // Emit an event to notify parent component to refresh the passenger list
          this.$emit('updated');
          this.close();
        } catch (err) {
          console.error(err);
          this.error =
            err.response?.data?.message || 'Failed to update passenger. Please try again.';
        }
      },
      populateForm() {
        this.form.name = this.passenger.name;
        this.form.sex = this.passenger.sex;
        this.form.age = this.passenger.age;
        this.form.pclass = this.passenger.pclass;
        this.form.fare = this.passenger.fare;
        this.form.survived = this.passenger.survived;
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
  
  input,
  select {
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
  </style>
  