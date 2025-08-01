<template>
  <div class="bg-white rounded-2xl shadow-md p-6 ">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">
        📌 Latest {{ activeTab === 'events' ? 'Events' : 'Donations' }}
      </h2>
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
