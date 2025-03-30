<template>
  <div class="bg-black flex flex-col items-center h-screen text-white gap-5">
    <DashboardHeader v-if="!isQRCordScreen" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isQRCordScreen = computed(() => route.path === '/dashboard/qrcodedisplay')
</script>