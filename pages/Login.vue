<template>
  <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg md:shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-800">Sign In</h2>
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300"
          placeholder="Enter your email"
          required />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300"
          placeholder="Enter your password"
          required />
      </div>
      <p v-if="loginError.length" class="text-red-500 font-bold">{{ loginError }}</p>
      <button type="button" class="text-blue-500 font-bold text-right" @click="resetPassword">forgot password?</button>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-indigo-600 md:hover:bg-indigo-700 rounded-md">
        Sign In
      </button>
    </form>
  </div>

  <UpdatePwDialog #="{ resolve, reject }">
    <Modal id="updatePw" @close="reject(CLOSE_MODAL)">
      <SendMailUpdatePw :err-msg="sendMailError" @send="sendMail($event, resolve)" />
    </Modal>
  </UpdatePwDialog>
</template>

<script lang="ts" setup>
import { useLogin } from '~/composables/useLogin';

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

const { user, loginError, login } = useLogin()

const sendMailError = ref('')
const UpdatePwDialog = createTemplatePromise()
const resetPassword = async () => {
  sendMailError.value = ''
  await UpdatePwDialog.start()
}

const sendMail = async (email: string, resolve: (v: unknown) => void) => {
  const resp = await $fetch('/api/forgotpassword', {
    method: 'post',
    body: {
      email,
      redirectTo: 'http://localhost:3000/updatepassword',
    }
  })

  if (resp?.error) {
    sendMailError.value = resp.error
    return
  }

  // TODO: loading component追加
  // TODO: 登録されてないmailの場合にもerror表示しないので、修正
  alert('Sent mail')
  resolve(null)
}
</script>
