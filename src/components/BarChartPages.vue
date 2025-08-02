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
    labels: props.data.map(item => item.page),
    datasets: [
      {
        label: 'Number of visits',
        data: props.data.map(item => item.visits),
        backgroundColor: [
          '#8b5cf6',
          '#7c3aed',
          '#6d28d9',
          '#5b21b6',
          '#4c1d95'
        ],
        borderColor: [
          '#8b5cf6',
          '#7c3aed',
          '#6d28d9',
          '#5b21b6',
          '#4c1d95'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: [
          '#a78bfa',
          '#8b5cf6',
          '#7c3aed',
          '#6d28d9',
          '#5b21b6'
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
  indexAxis: 'y', 
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
      borderColor: '#8b5cf6',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context) {
          return `Page: ${context[0].label}`
        },
        label: function(context) {
          return `Number of visits: ${context.parsed.x.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Number of visits',
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
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Pages',
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
    console.log(' BarChartPages data updated:', newData)
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

