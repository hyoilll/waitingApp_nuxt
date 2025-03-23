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

if (data.value) {
  const loginUser = {
    id: data.value.id,
    email: data.value?.email ?? '',
    // TODO: shop_nameが取得できるようにpublic.userからの情報も取得する
    shop_name: ''
  }

  setUser(loginUser)
}

// const { data: session } = await useFetch('/api/session', {
//   headers: useRequestHeaders(['cookie'])
// })
</script>