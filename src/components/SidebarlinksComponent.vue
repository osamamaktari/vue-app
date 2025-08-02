<template>
  <router-link :to="to" class="flex items-center  px-4 py-3 text-gray-700 hover:bg-purple-400 hover:text-white hover:rounded-full rounded-lg transition-colors group mb-2">
    <slot />
    <span  v-if="!isCollapsed" class="ps-4 font-semibold">{{ text }}</span>
  </router-link>
</template>

<script >
export default{
props:['text','to' ,'isCollapsed']
}
</script>
