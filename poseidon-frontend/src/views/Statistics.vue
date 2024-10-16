<!-- src/views/Statistics.vue -->
<template>
  <div class="statistics-page">
    <h1>Passenger Statistics</h1>
    
    <!-- Display Error Message -->
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <!-- Display Loader -->
    <div v-else-if="loading" class="loader">Loading...</div>
    
    <!-- Display Charts -->
    <div v-else class="charts-container">
      <!-- Chart 1: Total Passengers -->
      <div class="chart-card" v-if="totalPassengersData.labels.length">
        <h3>Total Passengers</h3>
        <Bar :chart-data="totalPassengersData" :options="chartOptions" />
      </div>

      <!-- Chart 2: Gender Distribution -->
      <div class="chart-card" v-if="genderDistributionData.labels.length">
        <h3>Gender Distribution</h3>
        <Pie :chart-data="genderDistributionData" :options="chartOptions" />
      </div>

      <!-- Chart 3: Survival Rate by Gender -->
      <div class="chart-card" v-if="survivalRateByGenderData.labels.length">
        <h3>Survival Rate by Gender</h3>
        <Line :chart-data="survivalRateByGenderData" :options="chartOptions" />
      </div>

      <!-- Chart 4: Survival Rate by Class -->
      <div class="chart-card" v-if="survivalRateByClassData.labels.length">
        <h3>Survival Rate by Class</h3>
        <Bar :chart-data="survivalRateByClassData" :options="chartOptions" />
      </div>

      <!-- Chart 5: Age Distribution -->
      <div class="chart-card" v-if="ageDistributionData.labels.length">
        <h3>Age Distribution</h3>
        <Bar :chart-data="ageDistributionData" :options="chartOptions" />
      </div>

      <!-- Chart 6: Fare Distribution -->
      <div class="chart-card" v-if="fareDistributionData.labels.length">
        <h3>Fare Distribution</h3>
        <Bar :chart-data="fareDistributionData" :options="chartOptions" />
      </div>

      <!-- Chart 7: Number of Survivors -->
      <div class="chart-card" v-if="numberOfSurvivorsData.labels.length">
        <h3>Number of Survivors</h3>
        <Doughnut :chart-data="numberOfSurvivorsData" :options="chartOptions" />
      </div>

      <!-- Chart 8: Number of Men vs Women -->
      <div class="chart-card" v-if="menWomenData.labels.length">
        <h3>Number of Men vs Women</h3>
        <Bar :chart-data="menWomenData" :options="chartOptions" />
      </div>

      <!-- Chart 9: Children vs Adults Survival -->
      <div class="chart-card" v-if="childrenAdultsSurvivalData.labels.length">
        <h3>Children vs Adults Survival</h3>
        <Bar :chart-data="childrenAdultsSurvivalData" :options="chartOptions" />
      </div>

      <!-- Chart 10: Survival Rate by Age Range -->
      <div class="chart-card" v-if="survivalRateAgeRangeData.labels.length">
        <h3>Survival Rate by Age Range</h3>
        <Line :chart-data="survivalRateAgeRangeData" :options="chartOptions" />
      </div>

      <!-- Chart 11: Percentage of Passengers by Age Range -->
      <div class="chart-card" v-if="percentageAgeDistributionData.labels.length">
        <h3>Percentage of Passengers by Age Range</h3>
        <Pie :chart-data="percentageAgeDistributionData" :options="chartOptions" />
      </div>

      <!-- Chart 12: Percentage of Passengers by Fare Range -->
      <div class="chart-card" v-if="percentageFareDistributionData.labels.length">
        <h3>Percentage of Passengers by Fare Range</h3>
        <Pie :chart-data="percentageFareDistributionData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Bar, Pie, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import api from '../services/api'

// Register Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

export default {
  name: 'Statistics',
  components: {
    Bar,
    Pie,
    Line,
    Doughnut,
  },
  setup() {
    // Reactive data for charts with initial empty structure
    const totalPassengersData = ref({
      labels: [],
      datasets: [],
    })

    const genderDistributionData = ref({
      labels: [],
      datasets: [],
    })

    const survivalRateByGenderData = ref({
      labels: [],
      datasets: [],
    })

    const survivalRateByClassData = ref({
      labels: [],
      datasets: [],
    })

    const ageDistributionData = ref({
      labels: [],
      datasets: [],
    })

    const fareDistributionData = ref({
      labels: [],
      datasets: [],
    })

    const numberOfSurvivorsData = ref({
      labels: [],
      datasets: [],
    })

    const menWomenData = ref({
      labels: [],
      datasets: [],
    })

    const childrenAdultsSurvivalData = ref({
      labels: [],
      datasets: [],
    })

    const survivalRateAgeRangeData = ref({
      labels: [],
      datasets: [],
    })

    // **New Reactive Data for Percentage Charts**
    const percentageAgeDistributionData = ref({
      labels: [],
      datasets: [],
    })

    const percentageFareDistributionData = ref({
      labels: [],
      datasets: [],
    })

    // Chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
        title: {
          display: false,
        },
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }

    // Loading and error states
    const loading = ref(true)
    const error = ref('')

    // Fetch data from API
    const fetchData = async () => {
      try {
        loading.value = true

        // 1. Total Passengers
        const totalPassengersRes = await api.get('/Statistics/total-passengers')
        console.log('Total Passengers:', totalPassengersRes.data)
        totalPassengersData.value = {
          labels: ['Total Passengers'],
          datasets: [
            {
              label: 'Count',
              data: [totalPassengersRes.data.totalPassengers],
              backgroundColor: ['#36A2EB'],
            },
          ],
        }

        // 2. Gender Distribution
        const menRes = await api.get('/Statistics/men')
        const womenRes = await api.get('/Statistics/women')
        console.log('Men:', menRes.data)
        console.log('Women:', womenRes.data)
        genderDistributionData.value = {
          labels: ['Men', 'Women'],
          datasets: [
            {
              label: 'Number of Passengers',
              data: [menRes.data.numberOfMen, womenRes.data.numberOfWomen],
              backgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        }

        // 3. Survival Rate by Gender
        const survivalRateMaleRes = await api.get('/Statistics/survival-rate/gender/male')
        const survivalRateFemaleRes = await api.get('/Statistics/survival-rate/gender/female')
        console.log('Survival Rate Male:', survivalRateMaleRes.data)
        console.log('Survival Rate Female:', survivalRateFemaleRes.data)
        survivalRateByGenderData.value = {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'Survival Rate (%)',
              data: [survivalRateMaleRes.data.survivalRate, survivalRateFemaleRes.data.survivalRate],
              borderColor: ['#FF6384', '#36A2EB'],
              backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
              fill: true,
            },
          ],
        }

        // 4. Survival Rate by Class
        const survivalRateClass1Res = await api.get('/Statistics/survival-rate/class/1')
        const survivalRateClass2Res = await api.get('/Statistics/survival-rate/class/2')
        const survivalRateClass3Res = await api.get('/Statistics/survival-rate/class/3')
        console.log('Survival Rate Class 1:', survivalRateClass1Res.data)
        console.log('Survival Rate Class 2:', survivalRateClass2Res.data)
        console.log('Survival Rate Class 3:', survivalRateClass3Res.data)
        survivalRateByClassData.value = {
          labels: ['Class 1', 'Class 2', 'Class 3'],
          datasets: [
            {
              label: 'Survival Rate (%)',
              data: [
                survivalRateClass1Res.data.survivalRate,
                survivalRateClass2Res.data.survivalRate,
                survivalRateClass3Res.data.survivalRate,
              ],
              backgroundColor: ['#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        }

        // 5. Age Distribution
        const ageGroups = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71+']
        const ageDistributionCounts = []
        for (let i = 0; i < ageGroups.length; i++) {
          let minAge = 0,
              maxAge = 0
          if (i === ageGroups.length - 1) {
            // Last group: 71+
            minAge = parseInt(ageGroups[i].split('-')[0])
            maxAge = 100 // Assuming max age
          } else {
            [minAge, maxAge] = ageGroups[i].split('-').map(Number)
          }
          try {
            const passengersInRangeRes = await api.get('/Statistics/age-range', {
              params: { minAge, maxAge },
            })
            console.log(`Passengers in age range ${minAge}-${maxAge}:`, passengersInRangeRes.data)
            ageDistributionCounts.push(passengersInRangeRes.data.numberOfPassengers)
          } catch (err) {
            console.error(`Error fetching passengers in age range ${minAge}-${maxAge}:`, err)
            ageDistributionCounts.push(0) // Push zero or handle as needed
          }
        }
        ageDistributionData.value = {
          labels: ageGroups,
          datasets: [
            {
              label: 'Number of Passengers',
              data: ageDistributionCounts,
              backgroundColor: '#FF6384',
            },
          ],
        }

        // 6. Fare Distribution
        const fareRanges = ['$0-50', '$51-100', '$101-150', '$151-200', '$201+']
        const fareDistributionCounts = []
        for (let i = 0; i < fareRanges.length; i++) {
          let minFare = 0,
              maxFare = 0
          if (i === fareRanges.length - 1) {
            // Last group: 201+
            minFare = 201
            maxFare = 10000 // Assuming max fare
          } else {
            [minFare, maxFare] = fareRanges[i]
              .replace('$', '')
              .split('-')
              .map((val) => parseInt(val))
          }
          try {
            const passengersInFareRangeRes = await api.get('/Statistics/fare-range', {
              params: { minFare, maxFare },
            })
            console.log(`Passengers in fare range $${minFare}-$${maxFare}:`, passengersInFareRangeRes.data)
            fareDistributionCounts.push(passengersInFareRangeRes.data.numberOfPassengers)
          } catch (err) {
            console.error(`Error fetching passengers in fare range $${minFare}-$${maxFare}:`, err)
            fareDistributionCounts.push(0) // Push zero or handle as needed
          }
        }
        fareDistributionData.value = {
          labels: fareRanges,
          datasets: [
            {
              label: 'Number of Passengers',
              data: fareDistributionCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        }

        // 7. Number of Survivors
        const survivorsRes = await api.get('/Statistics/survivors')
        const totalPassengersResForSurvivors = await api.get('/Statistics/total-passengers')
        console.log('Survivors:', survivorsRes.data)
        console.log('Total Passengers for Survivors:', totalPassengersResForSurvivors.data)
        numberOfSurvivorsData.value = {
          labels: ['Survived', 'Did Not Survive'],
          datasets: [
            {
              label: 'Number of Passengers',
              data: [
                survivorsRes.data.numberOfSurvivors,
                totalPassengersResForSurvivors.data.totalPassengers - survivorsRes.data.numberOfSurvivors,
              ],
              backgroundColor: ['#4BC0C0', '#FF6384'],
            },
          ],
        }

        // 8. Number of Men vs Women
        menWomenData.value = {
          labels: ['Men', 'Women'],
          datasets: [
            {
              label: 'Number of Passengers',
              data: [menRes.data.numberOfMen, womenRes.data.numberOfWomen],
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        }

        // 9. Children vs Adults Survival
        const childrenRes = await api.get('/Statistics/children')
        const adultsRes = await api.get('/Statistics/adults')
        const survivalRateChildrenRes = await api.get('/Statistics/survival-rate/age-range', {
          params: { minAge: 0, maxAge: 17 }, // Assuming children are under 18
        })
        const survivalRateAdultsRes = await api.get('/Statistics/survival-rate/age-range', {
          params: { minAge: 18, maxAge: 100 },
        })
        console.log('Children:', childrenRes.data)
        console.log('Adults:', adultsRes.data)
        console.log('Survival Rate Children:', survivalRateChildrenRes.data)
        console.log('Survival Rate Adults:', survivalRateAdultsRes.data)
        childrenAdultsSurvivalData.value = {
          labels: ['Children', 'Adults'],
          datasets: [
            {
              label: 'Survival Rate (%)',
              data: [
                survivalRateChildrenRes.data.survivalRate,
                survivalRateAdultsRes.data.survivalRate,
              ],
              backgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        }

        // 10. Survival Rate by Age Range
        const survivalRateAgeRanges = []
        const survivalRateAgeData = []
        for (let i = 0; i <= 8; i++) {
          const minAge = i * 10
          const maxAge = (i + 1) * 10
          try {
            const res = await api.get('/Statistics/survival-rate/age-range', {
              params: { minAge, maxAge },
            })
            console.log(`Survival Rate ${minAge}-${maxAge}:`, res.data)
            survivalRateAgeRanges.push(`${minAge}-${maxAge}`)
            survivalRateAgeData.push(res.data.survivalRate)
          } catch (err) {
            console.error(`Error fetching survival rate for age range ${minAge}-${maxAge}:`, err)
            survivalRateAgeRanges.push(`${minAge}-${maxAge}`)
            survivalRateAgeData.push(0) // Push zero or handle as needed
          }
        }
        survivalRateAgeRangeData.value = {
          labels: survivalRateAgeRanges,
          datasets: [
            {
              label: 'Survival Rate (%)',
              data: survivalRateAgeData,
              borderColor: '#FFCE56',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
            },
          ],
        }

        // **11. Percentage of Passengers by Age Range (Pie Chart)**
        percentageAgeDistributionData.value = {
          labels: ageGroups,
          datasets: [
            {
              label: 'Percentage of Passengers',
              data: ageDistributionCounts.map(count => ((count / totalPassengersRes.data.totalPassengers) * 100).toFixed(2)),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#66FF66',
                '#FF6666',
              ],
            },
          ],
        }

        // **12. Percentage of Passengers by Fare Range (Pie Chart)**
        percentageFareDistributionData.value = {
          labels: fareRanges,
          datasets: [
            {
              label: 'Percentage of Passengers',
              data: fareDistributionCounts.map(count => ((count / totalPassengersRes.data.totalPassengers) * 100).toFixed(2)),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
              ],
            },
          ],
        }

      } catch (err) {
        console.error(err)
        error.value = 'Failed to load statistics. Please try again later.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      totalPassengersData,
      genderDistributionData,
      survivalRateByGenderData,
      survivalRateByClassData,
      ageDistributionData,
      fareDistributionData,
      numberOfSurvivorsData,
      menWomenData,
      childrenAdultsSurvivalData,
      survivalRateAgeRangeData,
      percentageAgeDistributionData,    // New Data
      percentageFareDistributionData,   // New Data
      chartOptions,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.statistics-page {
  padding: 20px;
}

.loader {
  text-align: center;
  font-size: 1.2em;
  color: #555555;
  margin-top: 50px;
}

.error-message {
  text-align: center;
  color: red;
  font-size: 1.2em;
  margin-top: 50px;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 400px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
}

.chart-card h3 {
  text-align: center;
  margin-bottom: 10px;
}

.chart-card > canvas {
  flex-grow: 1;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
  .chart-card {
    height: 350px;
  }
}
</style>
