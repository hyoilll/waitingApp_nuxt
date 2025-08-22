<template>
  <div class="bg-white p-6 rounded-lg md:shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center mb-4">{{ $t('logout.title') }}</h2>
    <p class="text-gray-600 text-center mb-6">
      {{ $t('logout.message') }}
    </p>
    <div class="flex justify-between">
      <button
        @click="handleLogout"
        class="bg-red-500 w-full text-white px-4 py-2 rounded transition">
        {{ $t('logout.button') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  isSignPage: true
})

const router = useRouter()
const supabase = useSupabaseClient()
const { clearUser } = useUserStore()

const handleLogout = async () => {
  if (!confirm(t('logout.confirm'))) {
    return
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('signout error', error)
    return
  }

  clearUser()

  await router.push(localePath('/'))
  window.location.reload()
}
</script>