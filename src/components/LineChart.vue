<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({ data: Array })

const chartData = {
  labels: props.data.map(d => d.month),
  datasets: [{
    label: 'Donors',
    data: props.data.map(d => d.count),
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
    tension: 0.4
  }]
}

const chartOptions = { responsive: true, plugins: { legend: { display: true } } }
</script>
