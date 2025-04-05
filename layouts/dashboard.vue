<template>
  <div class="bg-black flex flex-col items-center h-screen text-white gap-5">
    <DashboardHeader v-if="!disableHeader" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const disableHeader = computed(() => route.meta.disableDashboardHeader)
</script>