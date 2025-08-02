<template>
  <div class="chart-container">
    <Pie 
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
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
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
    labels: props.data.map(item => item.name),
    datasets: [
      {
        data: props.data.map(item => item.value),
        backgroundColor: [
          '#6366f1',
          '#a78bfa',
          '#c084fc',
          '#d8b4fe',
          '#e9d5ff'
        ],
        borderColor: [
          '#4f46e5',
          '#8b5cf6',
          '#a855f7',
          '#c084fc',
          '#d8b4fe'
        ],
        borderWidth: 3,
        hoverBackgroundColor: [
          '#818cf8',
          '#c4b5fd',
          '#ddd6fe',
          '#ede9fe',
          '#f3f4f6'
        ],
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 4,
        hoverOffset: 10
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
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter, sans-serif'
        },
        generateLabels: function(chart) {
          const data = chart.data
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const dataset = data.datasets[0]
              const value = dataset.data[i]
              const total = dataset.data.reduce((sum, val) => sum + val, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.borderColor[i],
                lineWidth: dataset.borderWidth,
                hidden: false,
                index: i
              }
            })
          }
          return []
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#6366f1',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context) {
          return context[0].label
        },
        label: function(context) {
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `Percentage: ${percentage}% (${context.parsed})`
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 3,
      hoverBorderWidth: 4
    }
  },
  cutout: 0,
  radius: '80%',
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1000
  }
}))


watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    chartKey.value += 1
    console.log(' PieChartVisitors data updated:', newData)
  }
}, { deep: true, immediate: true })
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

