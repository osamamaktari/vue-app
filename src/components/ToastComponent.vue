<template>
  <transition name="fade">
    <div
      v-if="showToast"
      class="fixed top-4 left-4 bg-white border border-gray-300 text-gray-600 shadow-lg px-6 py-3 rounded-xl flex items-center gap-3 z-50 "
    >
      <span class="text-base  font-medium">Welcome to the Dashboard</span>
   <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill="#1C274C"></ellipse> <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"></ellipse> <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"></path> </g></svg>

    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showToast = ref(false)

onMounted(() => {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 1500) 
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
