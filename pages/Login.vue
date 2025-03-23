<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Sign In</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
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
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  </div>

  <UpdatePwDialog #="{ resolve, reject }">
    <Modal id="updatePw">
      <SendMailUpdatePw @close="reject(null)" @send="sendMail($event, resolve)" />
    </Modal>
  </UpdatePwDialog>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    async () => {
      const { isLogin } = storeToRefs(useUserStore())
      const router = useRouter()
      if (isLogin.value) {
        router.push('/')
      }
    }
  ]
})

interface User {
  email: string
  password: string
}

const user = reactive<User>({
  email: '',
  password: ''
})

const router = useRouter()
const supabase = useSupabaseClient()
const { setUser } = useUserStore()
const loginError = ref('')

const handleSubmit = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  })
  if (error) {
    console.error('login error: ', error)
    loginError.value = error.message
    return
  }

  const loginUser = {
    email: data.user?.email ?? ''
  }

  setUser(loginUser)
  router.push('/')
}

const UpdatePwDialog = createTemplatePromise()
const resetPassword = async () => {
  await UpdatePwDialog.start()
}

const sendMail = async (mail: string, resolve: (v: unknown) => void) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(mail, {
    redirectTo: 'http://localhost:3000/updatepassword'
  })
  if (error) {
    console.error('Send mail error: ', error)
    return
  }

  // TODO: loading component追加
  // TODO: 登録されてないmailの場合にもerror表示しないので、修正
  alert('Sent mail')
  resolve(null)
}
</script>