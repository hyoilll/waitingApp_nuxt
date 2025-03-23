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
          <!-- <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p> -->
        </div>
        <div class="mb-4">
          <label for="shopName" class="block text-sm font-medium text-gray-700">Shop name</label>
          <input
            type="text"
            id="shopName"
            v-model="shopName"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          <!-- <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p> -->
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          <!-- <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p> -->
        </div>
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
interface NewUser {
  email: string
  password: string
}

const form = reactive<NewUser>({
  email: '',
  password: ''
})

const shopName = ref('')

const supabase = useSupabaseClient()

const submitForm = async () => {
  // TODO: 同じemailでも登録ができる、修正必要
  const { data, error } = await supabase.auth.signUp(form)
  console.log(data, error)

}
</script>