<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center mb-4">Logout</h2>
    <p class="text-gray-600 text-center mb-6">
      Are you sure you want to log out?
    </p>
    <div class="flex justify-between">
      <button
        @click="handleLogout"
        class="bg-red-500 w-full text-white px-4 py-2 rounded transition">
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  isSignPage: true
})

const router = useRouter()
const supabase = useSupabaseClient()
const { clearUser } = useUserStore()

const handleLogout = async () => {
  if (!confirm('Are you sure you want to log out?')) {
    return
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('signout error', error)
    return
  }

  clearUser()

  await router.push('/')
  window.location.reload()
}
</script>