<template>
  <div class="p-6 space-y-10">
    <h2 class="text-xl font-bold text-gray-800">Performance Analytics</h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-gray-600">Loading analytics data...</span>
    </div>

    <!-- Charts Container -->
    <div v-else class="space-y-10">
      <!-- Donor Growth Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h3 class="font-semibold mb-4 text-gray-700">Donor Growth Over Time</h3>
        <div class="h-80">
          <LineChart v-if="chartData.donorGrowth.length > 0" :data="chartData.donorGrowth" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        </div>
      </div>

      <!-- Age Group Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h3 class="font-semibold mb-4 text-gray-700">Donations by Age Group</h3>
        <div class="h-80">
          <BarChartAge v-if="chartData.donationByAge.length > 0" :data="chartData.donationByAge" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        </div>
      </div>

      <!-- Region Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h3 class="font-semibold mb-4 text-gray-700">Donations by Region</h3>
        <div class="h-80">
          <BarChartRegion v-if="chartData.donationByRegion.length > 0" :data="chartData.donationByRegion" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        </div>
      </div>

      <!-- Visitor Stats Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h3 class="font-semibold mb-4 text-gray-700">Visitor Engagement</h3>
        <div class="h-80">
          <PieChartVisitors v-if="chartData.visitorStats.length > 0" :data="chartData.visitorStats" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        </div>
      </div>

      <!-- Top Pages Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <h3 class="font-semibold mb-4 text-gray-700">Top Visited Pages</h3>
        <div class="h-80">
          <BarChartPages v-if="chartData.topVisitedPages.length > 0" :data="chartData.topVisitedPages" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import LineChart from './LineChart.vue'
import BarChartAge from './BarChartAge.vue'
import BarChartRegion from './BarChartRegion.vue'
import PieChartVisitors from './PieChartVisitors.vue'
import BarChartPages from './BarChartPages.vue'

// استيراد البيانات مباشرة (الطريقة الأولى - الأفضل)
// import { analyticsData as importedData } from './analyticsData.js'

// حالة التحميل
const isLoading = ref(true)

// البيانات التفاعلية
const chartData = reactive({
  donorGrowth: [],
  donationByAge: [],
  donationByRegion: [],
  visitorStats: [],
  topVisitedPages: []
})

// دالة تحميل البيانات
const loadAnalyticsData = async () => {
  try {
    isLoading.value = true
    
    // الطريقة الأولى: استيراد مباشر (إذا كان الملف في نفس المجلد)
    // Object.assign(chartData, importedData)
    
    // الطريقة الثانية: fetch من ملف JSON (للملفات في public folder)
    const response = await fetch('/analyticsData.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    // تحديث البيانات التفاعلية
    Object.assign(chartData, data)
    
    console.log('✅ Analytics data loaded successfully:', chartData)
    
    // انتظار التحديث التالي للـ DOM
    await nextTick()
    
  } catch (error) {
    console.error('❌ Error loading analytics data:', error)
    
    // بيانات احتياطية في حالة فشل التحميل
    const fallbackData = {
      donorGrowth: [
        { month: "Jan", count: 50 },
        { month: "Feb", count: 70 },
        { month: "Mar", count: 110 },
        { month: "Apr", count: 160 },
        { month: "May", count: 200 },
        { month: "Jun", count: 240 }
      ],
      donationByAge: [
        { ageGroup: "18-25", amount: 7000 },
        { ageGroup: "26-35", amount: 12000 },
        { ageGroup: "36-50", amount: 9200 },
        { ageGroup: "51-65", amount: 5400 },
        { ageGroup: "65+", amount: 3200 }
      ],
      donationByRegion: [
        { region: "Sana'a", amount: 14000 },
        { region: "Aden", amount: 10000 },
        { region: "Taiz", amount: 7000 },
        { region: "Hadramout", amount: 6000 },
        { region: "Ibb", amount: 5000 }
      ],
      visitorStats: [
        { name: "Bounce Rate", value: 45 },
        { name: "Visited Pages", value: 55 }
      ],
      topVisitedPages: [
        { page: "/home", visits: 500 },
        { page: "/donate", visits: 400 },
        { page: "/projects", visits: 350 },
        { page: "/about", visits: 250 },
        { page: "/contact", visits: 200 }
      ]
    }
    
    Object.assign(chartData, fallbackData)
    console.log('🔄 Using fallback data')
  } finally {
    isLoading.value = false
  }
}

// تحميل البيانات عند تحميل المكون
onMounted(() => {
  loadAnalyticsData()
})

// تصدير البيانات للاستخدام في مكونات أخرى (اختياري)
defineExpose({
  chartData,
  isLoading,
  loadAnalyticsData
})
</script>

<style scoped>
/* إضافة أنيميشن للتحميل */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* تحسين مظهر الرسوم البيانية */
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>

