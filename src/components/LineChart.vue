<template>
  <div class="chart-container">
    <Line 
      v-if="chartData && chartOptions" 
      :data="chartData" 
      :options="chartOptions" 
      :key="chartKey"
    />
    <div v-else class="flex items-center justify-center h-full">
      <div class="text-gray-500">Loading chart...</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
)

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})


const chartKey = ref(0)


const chartData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return null
  }

  return {
    labels: props.data.map(item => item.month),
    datasets: [
      {
        label: 'Donors Number',
        data: props.data.map(item => item.count),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true
      }
    ]
  }
})


const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index'
  },
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3b82f6',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context) {
          return `Month ${context[0].label}`
        },
        label: function(context) {
          return `Donors Number: ${context.parsed.y.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Months',
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Donors Number',
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12
        },
        callback: function(value) {
          return value.toLocaleString()
        }
      },
      beginAtZero: true
    }
  },
  elements: {
    point: {
      hoverBackgroundColor: '#3b82f6'
    }
  }
}))


watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    chartKey.value += 1
    console.log('LineChart data updated:', newData)
  }
}, { deep: true, immediate: true })
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 300px;
}
</style>

