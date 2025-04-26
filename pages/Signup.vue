<template>
  <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="shopName" class="block text-sm font-medium text-gray-700">Shop name</label>
        <input
          type="text"
          id="shopName"
          v-model="form.shopName"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <p v-if="errorMsg.length" class="text-red-500 font-bold">{{ errorMsg }}</p>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { SignUpUserInfo } from '~/composables/types/Admin'

definePageMeta({
  isSignPage: true
})

// ログイン状態の場合はリダイレクト
const supabaseUser = useSupabaseUser()
watch(supabaseUser, () => {
  if (supabaseUser.value) {
    return navigateTo('/')
  }
}, { immediate: true })

const form = reactive<SignUpUserInfo>({
  email: '',
  password: '',
  shopName: '',
})

const errorMsg = ref('')

const router = useRouter()

const submitForm = async () => {
  errorMsg.value = ''

  const resp = await $fetch('/api/signup', {
    method: 'post',
    body: form
  })

  if (resp?.error) {
    errorMsg.value = resp.error
    return
  }

  alert('会員登録完了しました。')
  router.push('/login')
}
</script>