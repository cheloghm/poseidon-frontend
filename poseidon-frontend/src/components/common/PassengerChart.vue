<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { computed } from 'vue';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: 'PassengerChart',
  components: {
    LineChart: Line, // Register Line as LineChart
  },
  props: {
    passengers: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartData = computed(() => {
      // Process passenger data for chart
      const dataMap = {};

      props.passengers.forEach(passenger => {
        const date = new Date(passenger.createdAt);
        const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        dataMap[month] = (dataMap[month] || 0) + 1;
      });

      const sortedMonths = Object.keys(dataMap).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
      });

      return {
        labels: sortedMonths,
        datasets: [
          {
            label: 'New Passengers',
            backgroundColor: '#42b983',
            borderColor: '#42b983',
            data: sortedMonths.map(month => dataMap[month]),
          },
        ],
      };
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Passenger Growth Over Time',
        },
      },
    };

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>
