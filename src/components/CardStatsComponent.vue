<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-gray-500 transition-shadow w-full"
  >
    <div class="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
        <div class="flex items-center mt-2">
          <span
            :class="[
              'text-sm font-medium flex items-center',
              percentage >= 0 ? 'text-green-600' : 'text-red-600'
            ]"
          >
            <svg
              v-if="percentage !== null"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-4 h-4 mr-1"
            >
              <path
                v-if="percentage >= 0"
                d="M5 10l5-5 5 5H5z"
              />
              <path
                v-else
                d="M15 10l-5 5-5-5h10z"
              />
            </svg>
            {{ Math.abs(percentage) }}%
          </span>
          <span class="text-gray-500 text-sm ml-2">vs last month</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  value: String,
  percentage: Number
})
</script>
