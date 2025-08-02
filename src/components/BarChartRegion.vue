<template>
  <div class="chart-container">
    <Bar 
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
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
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
    labels: props.data.map(item => item.region),
    datasets: [
      {
        label: 'Number of Donations',
        data: props.data.map(item => item.amount),
        backgroundColor: [
          '#f97316',
          '#ea580c',
          '#dc2626',
          '#b91c1c',
          '#991b1b'
        ],
        borderColor: [
          '#f97316',
          '#ea580c',
          '#dc2626',
          '#b91c1c',
          '#991b1b'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: [
          '#fb923c',
          '#f97316',
          '#ea580c',
          '#dc2626',
          '#b91c1c'
        ],
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 3
      }
    ]
  }
})


const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#f97316',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context) {
          return `Reigon: ${context[0].label}`
        },
        label: function(context) {
          return `Quantity: ${context.parsed.y.toLocaleString()} usd`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Regions',
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
        },
        maxRotation: 45,
        minRotation: 0
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Donations quantity (usd)',
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
    bar: {
      borderWidth: 2
    }
  }
}))


watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    chartKey.value += 1
    console.log('BarChartRegion data updated:', newData)
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

