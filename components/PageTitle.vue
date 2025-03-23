<template>
  <div class="mb-8">
    <button v-if="enableBackBtn" class="flex justify-self-start mb-5" @click="$router.back()">戻る</button>
    <h1>{{ headerTitle }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headerTitle: string
  enableBackBtn?: boolean
}>()
</script>