<template>
  <header class="flex justify-between items-center w-full px-3 h-[60px]">
    <div>
      <button
        v-if="enableBackBtn"
        class="px-3 py-1 bg-gray-500 font-semibold rounded-lg shadow-md"
        @click="$router.back()">戻る</button>
    </div>

    <span class="font-bold">{{ user.shop_name }}</span>
  </header>
</template>

<script setup lang="ts">
const { user } = useUserStore()
const route = useRoute()
const enableBackBtn = computed(() => route.path === '/dashboard/admin')
</script>