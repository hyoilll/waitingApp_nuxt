<template>
  <div :class="customClass ? customClass : 'border-t-2 border-gray-300 w-[80%] mx-auto my-8'"></div>
</template>

<script setup lang="ts">
const { customClass } = defineProps<{
  customClass?: string
}>()
</script>