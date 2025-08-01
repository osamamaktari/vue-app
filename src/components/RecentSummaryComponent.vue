<template>
  <div class="bg-white rounded-2xl shadow-md p-6 ">
    <div class="flex justify-between items-center mb-4">
      <div class="text-xl font-semibold text-gray-800 flex  gap-x-1">
      <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
</svg>
</span>  <span>Latest</span> {{ activeTab === 'events' ? 'Events' : 'Donations' }}
      </div>
      <div class="flex gap-2">
        <button
          @click="activeTab = 'events'"
          :class="tabClass('events')"
        >
          Events
        </button>
        <button
          @click="activeTab = 'donations'"
          :class="tabClass('donations')"
        >
          Donations
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-sm text-gray-500">Loading data...</div>
    <div v-else-if="filteredList.length === 0" class="text-sm text-gray-400">No data available.</div>

    <ul v-else class="space-y-4 ">
      <li
        v-for="item in filteredList"
        :key="item.id"
        class="border-l-4 pl-4 border-blue-500"
      >
        <p class="text-gray-700 font-medium">{{ item.title }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(item.date) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const activeTab = ref('events')
const data = ref({ events: [], donations: [] })
const loading = ref(true)

const filteredList = computed(() => {
  return activeTab.value === 'events' ? data.value.events : data.value.donations
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function tabClass(tab) {
  return [
    'px-4 py-1 rounded-full text-sm font-medium transition-all',
    activeTab.value === tab
      ? 'bg-blue-600 text-white'
      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
  ]
}

onMounted(async () => {
  try {
    const response = await axios.get('/recent-data.json') // from public folder
    data.value = response.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
})
</script>
