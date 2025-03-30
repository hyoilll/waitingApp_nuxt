<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <div>
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

if (data.value?.user) {
  setUser(data.value.user)
}

// const { data: session } = await useFetch('/api/session', {
//   headers: useRequestHeaders(['cookie'])
// })
</script>