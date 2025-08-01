<template>
  <router-link :to="to" class="flex items-center  px-4 py-3 text-gray-700 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group">
    <slot />
    <span  v-if="!isCollapsed" class="ps-4 font-semibold">{{ text }}</span>
  </router-link>
</template>

<script >
export default{
props:['text','to' ,'isCollapsed']
}
</script>
