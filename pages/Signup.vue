<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
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
            v-model="shopName"
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
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import type { User } from '~/composables/types/Admin'

interface NewUser {
  email: string
  password: string
}

const form = reactive<NewUser>({
  email: '',
  password: ''
})

const errorMsg = ref('')
const shopName = ref('')

const supabase = useSupabaseClient()
const router = useRouter()

const submitForm = async () => {
  // TODO: 同じemailでも登録ができる、修正必要
  errorMsg.value = ''

  // TODO: 会員登録のやり方をリンク先をクリックするとログイン状態に遷移されるのではなく、auth codeを送信するように修正
  const { data, error } = await supabase.auth.signUp(form)
  if (error) {
    console.error('signup error: ', error)
    errorMsg.value = error.message
    return
  }

  if (!data.user?.identities?.length) {
    errorMsg.value = 'Already registered'
    return
  }

  const newUser: User = {
    id: data.user.id,
    email: data.user.email ?? '',
    shop_name: shopName.value,
  }


  const [userInsertResult, shopInsertResult] = await Promise.all([
    insertUserToUsersTable(newUser),
    insertShopToShopsTable(newUser.id)
  ])

  if (!userInsertResult || !shopInsertResult) {
    errorMsg.value = 'Failed to complete the sign-up process'
    return
  }

  alert('会員登録完了しました。')
  router.push('/')
}

/**
 * insert user to public.users
 * @param newUser 
 */
const insertUserToUsersTable = async (newUser: User) => {
  const { data, error } = await supabase
    .from('users')
    .insert(newUser)

  if (error) {
    console.error('signup error: ', error)
    errorMsg.value = error.message
    return false
  }

  return true
}

/**
 * insert shop to public.shops
 * @param id 
 */
const insertShopToShopsTable = async (id: string) => {
  const { data, error } = await supabase
    .from('shops')
    .insert({ id: uuidv4(), user_id: id, current_number: 1 })

  if (error) {
    console.error('signup error: ', error)
    errorMsg.value = error.message
    return false
  }

  return true
}
</script>