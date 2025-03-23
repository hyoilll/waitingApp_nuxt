<template>
  <div class="mt-20 flex flex-col items-center">
    <h1 class="text-2xl font-bold text-gray-800">モードを選択してください</h1>
    <div class="mt-8 flex gap-6 justify-center">
      <NuxtLink to="/dashboard/admin">
        <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md">
          管理者モード
        </button>
      </NuxtLink>
      <NuxtLink to="/dashboard/qrcodedisplay">
        <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md">
          QRコード表示モード
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})
</script>