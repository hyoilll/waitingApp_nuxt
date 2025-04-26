<template>
  <div>
    <AppHeader />
    <div
      class="min-h-[calc(100vh-160px)] bg-gray-100"
      :class="{ 'flex items-center justify-center': isSignPage }">
      <div v-if="!isSignPage" class="w-[70%] mx-auto py-10">
        <slot />
      </div>
      <slot v-else />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isSignPage = computed(() => route.meta.isSignPage)
</script>