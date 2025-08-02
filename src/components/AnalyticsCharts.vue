<template>
  <div class="p-6 space-y-10">
    <h2 class="text-xl font-bold text-gray-800">Performance Analytics</h2>

    <div class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="font-semibold mb-4">Donor Growth Over Time</h3>
      <LineChart :data="analyticsData.donorGrowth" />
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="font-semibold mb-4">Donations by Age Group</h3>
      <BarChartAge :data="analyticsData.donationByAge" />
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="font-semibold mb-4">Donations by Region</h3>
      <BarChartRegion :data="analyticsData.donationByRegion" />
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="font-semibold mb-4">Visitor Engagement</h3>
      <PieChartVisitors :data="analyticsData.visitorStats" />
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="font-semibold mb-4">Top Visited Pages</h3>
      <BarChartPages :data="analyticsData.topVisitedPages" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import LineChart from '@/components/LineChart.vue'
// import BarChartAge from '@/components/BarChartAge.vue'
// import BarChartRegion from '@/components/BarChartRegion.vue'
// import PieChartVisitors from '@/components/PieChartVisitors.vue'
// import BarChartPages from '@/components/BarChartPages.vue'
import LineChart from './LineChart.vue'
import BarChartAge from './BarChartAge.vue'
import BarChartRegion from './BarChartRegion.vue'
import PieChartVisitors from './PieChartVisitors.vue'
import BarChartPages from './BarChartPages.vue'
const analyticsData = ref({
  donorGrowth: [],
  donationByAge: [],
  donationByRegion: [],
  visitorStats: [],
  topVisitedPages: []
})

onMounted(async () => {
//   const res = await fetch('/analyticsData.json')
//   analyticsData.value = await res.json()
  const res = await fetch('../analyticsData.json')     // جلب الملف
  const data = await res.json()                      // تحويله إلى JSON
  console.log('Fetched Analytics Data:', data)       // ✅ اختياري: للتأكد
  analyticsData.value = data  
})
</script>
