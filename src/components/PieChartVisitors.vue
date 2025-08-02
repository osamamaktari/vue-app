<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
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

const props = defineProps({ data: Array })

const chartData = {
  labels: props.data.map(item => item.name),
  datasets: [
    {
      data: props.data.map(item => item.value),
      backgroundColor: ['#6366f1', '#a78bfa']
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>
