<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { setUser } = useUserStore()

const { data } = await useFetch('/api/me', {
  headers: useRequestHeaders(['cookie'])
})

const { t } = useI18n()

if (data.value?.error) {
  alert(t(data.value.error))
}

if (data.value?.user) {
  setUser(data.value.user, data.value.shop)
}

// const { data: session } = await useFetch('/api/session', {
//   headers: useRequestHeaders(['cookie'])
// })
</script>