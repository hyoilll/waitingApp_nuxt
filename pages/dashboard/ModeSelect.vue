<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold">モードを選択してください</h1>
    <div class="mt-8 flex gap-6 justify-center">
      <NuxtLink to="/dashboard/admin">
        <button class="px-6 py-3 bg-gray-500 font-semibold rounded-lg shadow-md">
          waiting管理
        </button>
      </NuxtLink>
      <NuxtLink to="/dashboard/qrcodedisplay">
        <button class="px-6 py-3 bg-gray-500 font-semibold rounded-lg shadow-md">
          QRコード表示
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})
</script>