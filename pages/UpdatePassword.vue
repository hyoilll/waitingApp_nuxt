<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Update Password</h2>
      <form @submit.prevent="updatePassword">
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
    </div>
  </div>
</template>

<script setup lang="ts">
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const supabase = useSupabaseClient()
const router = useRouter()

const { setUser } = useUserStore()

const updatePassword = async () => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword.value
  })
  if (error) {
    console.error('update password error: ', error)
    errorMessage.value = error.message
    return
  }

  const loginUser = {
    email: data.user?.email ?? ''
  }

  //TODO: 更新したら、元のページに戻ってログインしてくださいと表示すべき？そとれも、今のページで進めるべき？
  setUser(loginUser)
  router.push('/')
}
</script>