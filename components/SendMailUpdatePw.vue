<template>
  <div class="space-y-6 w-full">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800">{{ $t('sendMailUpdatePw.title') }}</h2>
      <p class="text-xs text-gray-400" v-html="$t('sendMailUpdatePw.description')" />
    </div>
    <form @submit.prevent="$emit('send', email)" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('sendMailUpdatePw.email') }}</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300"
          :placeholder="$t('sendMailUpdatePw.email')"
          required />
      </div>
      <p v-if="errMsg.length" class="text-red-500 font-bold">{{ errMsg }}</p>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-indigo-600 md:hover:bg-indigo-700 rounded-md">
        {{ $t('sendMailUpdatePw.button') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')

defineProps<{
  errMsg: string
}>()

defineEmits<{
  send: [string]
}>()
</script>
