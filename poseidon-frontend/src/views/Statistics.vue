<!-- src/views/Statistics.vue -->

<template>
    <div class="statistics-container">
      <h2>Passenger Statistics</h2>
      <div class="statistics">
        <div class="stat-item">
          <h3>Total Passengers</h3>
          <p>{{ statistics.totalPassengers }}</p>
        </div>
        <div class="stat-item">
          <h3>Survival Rate</h3>
          <p>{{ statistics.survivalRate }}%</p>
        </div>
        <div class="stat-item">
          <h3>Number of Men</h3>
          <p>{{ statistics.numberOfMen }}</p>
        </div>
        <div class="stat-item">
          <h3>Number of Women</h3>
          <p>{{ statistics.numberOfWomen }}</p>
        </div>
        <div class="stat-item">
          <h3>Number of Boys</h3>
          <p>{{ statistics.numberOfBoys }}</p>
        </div>
        <div class="stat-item">
          <h3>Number of Girls</h3>
          <p>{{ statistics.numberOfGirls }}</p>
        </div>
        <div class="stat-item">
          <h3>Number of Adults</h3>
          <p>{{ statistics.numberOfAdults }}</p>
        </div>
        <div class="stat-item">
          <h3>Number of Children</h3>
          <p>{{ statistics.numberOfChildren }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'Statistics',
    setup() {
      const store = useStore();
      const statistics = ref({
        totalPassengers: 0,
        survivalRate: 0,
        numberOfMen: 0,
        numberOfWomen: 0,
        numberOfBoys: 0,
        numberOfGirls: 0,
        numberOfAdults: 0,
        numberOfChildren: 0,
      });
  
      const fetchStatistics = async () => {
        try {
          const totalResponse = await store.dispatch('fetchTotalPassengers');
          statistics.value.totalPassengers = totalResponse.data.TotalPassengers;
  
          const survivalResponse = await store.dispatch('fetchSurvivalRate');
          statistics.value.survivalRate = survivalResponse.data.SurvivalRate;
  
          const menResponse = await store.dispatch('fetchNumberOfMen');
          statistics.value.numberOfMen = menResponse.data.NumberOfMen;
  
          const womenResponse = await store.dispatch('fetchNumberOfWomen');
          statistics.value.numberOfWomen = womenResponse.data.NumberOfWomen;
  
          const boysResponse = await store.dispatch('fetchNumberOfBoys');
          statistics.value.numberOfBoys = boysResponse.data.NumberOfBoys;
  
          const girlsResponse = await store.dispatch('fetchNumberOfGirls');
          statistics.value.numberOfGirls = girlsResponse.data.NumberOfGirls;
  
          const adultsResponse = await store.dispatch('fetchNumberOfAdults');
          statistics.value.numberOfAdults = adultsResponse.data.NumberOfAdults;
  
          const childrenResponse = await store.dispatch('fetchNumberOfChildren');
          statistics.value.numberOfChildren = childrenResponse.data.NumberOfChildren;
        } catch (error) {
          console.error('Failed to fetch statistics:', error);
        }
      };
  
      onMounted(() => {
        fetchStatistics();
      });
  
      return {
        statistics,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Statistics component */
  
  .statistics-container {
    padding: 20px;
  }
  
  .statistics {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .stat-item {
    background-color: #f2f2f2;
    padding: 15px;
    border-radius: 8px;
    width: 200px;
    text-align: center;
  }
  
  .stat-item h3 {
    margin-bottom: 10px;
  }
  
  .stat-item p {
    font-size: 1.2em;
    font-weight: bold;
  }
  </style>
  