<template>
  <header class="bg-gray-800 text-white py-4 flex justify-around">
    <div>
      <span>logo</span>
    </div>

    <nav>
      <ul class="flex justify-center space-x-6">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/services">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/inquiry">Inquiry</NuxtLink>
        </li>
        <template v-if="isLogin">
          <li>
            <NuxtLink to="/logout">Signout</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/dashboard/modeselect"
              class="border p-1 bg-white text-black font-bold rounded-md"
              target="_blank">Dashboard</NuxtLink>
          </li>
          <li>
            <span>{{ userEmail }}</span>
          </li>
        </template>
        <template v-else>
          <li>
            <NuxtLink to="/login">Signin</NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink to="/signup">Signup</NuxtLink>
          </li> -->
        </template>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const { user, isLogin } = storeToRefs(useUserStore())

const userEmail = computed(() => user.value.email.split('@')[0])
</script>