<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    {{ $t('dashboard.canceled.message') }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  disableDashboardHeader: true,
})
</script>
