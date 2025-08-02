<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Projects & Campaigns</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-left">
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Budget</th>
            <th class="py-3 px-4">Impact</th>
            <th class="py-3 px-4">Progress</th>
            <th class="py-3 px-4">Report</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id" class="border-t">
            <td class="py-3 px-4 font-medium">{{ project.name }}</td>
            <td class="py-3 px-4">
              <span :class="statusClass(project.status)">{{ project.status }}</span>
            </td>
            <td class="py-3 px-4">${{ project.budget.toLocaleString() }}</td>
            <td class="py-3 px-4">{{ project.impact }}</td>
            <td class="py-3 px-4">
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-blue-600 h-3 rounded-full" :style="`width: ${project.progress}%`"></div>
              </div>
              <span class="text-sm text-gray-600">{{ project.progress }}%</span>
            </td>
            <td class="py-3 px-4">
              <a :href="project.report" target="_blank" class="text-blue-500 hover:underline">View</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import data from '../data/projects.json' // Adjust the path as necessary

const projects = ref([])

onMounted(() => {
  projects.value = data
})

function statusClass(status) {
  return {
    'text-green-600 font-semibold': status === 'Completed',
    'text-yellow-500 font-semibold': status === 'Ongoing',
    'text-red-500 font-semibold': status === 'Paused'
  }
}
</script>
