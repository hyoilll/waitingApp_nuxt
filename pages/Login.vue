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
        <p class="text-blue-500 font-bold text-right">forgot password?</p>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

</script>