<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Update Password</h2>
      <form v-if="!successUpdated" @submit.prevent="updatePassword">
        <div class="mb-4">
          <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required />
        </div>
        <div v-if="errorMessage" class="error-message mb-4 text-sm text-red-500 font-bold">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
          Update Password
        </button>
      </form>
      <p v-else class="text-center text-sm text-gray-500">
        パスワードを更新しました。<br>前のページに戻ってログインしてください。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successUpdated = ref(false)

const { t } = useI18n()

const updatePassword = async () => {
  errorMessage.value = ''
  successUpdated.value = false
  const resp = await $fetch('/api/updatepassword', {
    method: 'post',
    body: {
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    }
  })

  if (resp?.error) {
    errorMessage.value = t(resp.error)
    return
  }

  successUpdated.value = true
}
</script>