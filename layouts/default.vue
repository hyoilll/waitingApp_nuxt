<template>
  <div>
    <AppHeader />
    <div
      class="min-h-[calc(100vh-160px)] bg-gray-100"
      :class="{ 'flex items-center justify-center': isSignPage }">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isSignPage = computed(() => route.meta.isSignPage)
</script>