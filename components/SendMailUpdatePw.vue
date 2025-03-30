<template>
  <div class="space-y-6 w-full">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800">Send mail</h2>
      <p class="text-xs text-gray-400">
        ※ 入力したメールアドレスにパスワード変更リンク先をお送りします。<br>
        登録されてないメールアドレスを入力した場合は送信されません。
      </p>
    </div>
    <form @submit.prevent="$emit('send', email)" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300"
          placeholder="Enter your email"
          required />
      </div>
      <p v-if="errMsg.length" class="text-red-500 font-bold">{{ errMsg }}</p>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const loginError = ref('')

defineProps<{
  errMsg: string
}>()

defineEmits<{
  send: [string]
}>()
</script>