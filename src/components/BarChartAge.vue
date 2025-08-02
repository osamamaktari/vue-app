<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement,
  CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({ data: Array })

const chartData = {
  labels: props.data.map(d => d.ageGroup),
  datasets: [{
    label: 'Amount',
    data: props.data.map(d => d.amount),
    backgroundColor: '#10b981'
  }]
}

const chartOptions = { responsive: true, plugins: { legend: { display: false } } }
</script>
