<template>
  <footer class="w-full py-4 px-6 bg-gray-50 text-gray-500 text-sm border-t border-gray-200 flex items-center justify-between z-30">
    <span>© {{ currentYear }} Wasl Org Dashboard</span>
    <span class="font-semibold">Eng.Osama Maktari</span>
<span>🚀 Advanced Dashboard - v1.0</span>

  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
