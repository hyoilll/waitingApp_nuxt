<template>
  <header class="bg-gray-800 text-white py-4 flex justify-around h-[60px]">
    <div>
      <span>logo</span>
    </div>

    <nav>
      <ul class="flex justify-center space-x-6">
        <li>
          <NuxtLink to="/" :class="{ active: currentTab === 'home' }" @click="currentTab = 'home'">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/services" :class="{ active: currentTab === 'services' }" @click="currentTab = 'services'">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/inquiry" :class="{ active: currentTab === 'inquiry' }" @click="currentTab = 'inquiry'">Inquiry</NuxtLink>
        </li>
        <template v-if="isLogin">
          <li>
            <NuxtLink to="/logout" :class="{ active: currentTab === 'logout' }" @click="currentTab = 'logout'">Signout</NuxtLink>
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
            <NuxtLink to="/login" :class="{ active: currentTab === 'login' }" @click="currentTab = 'login'">Signin</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/signup" :class="{ active: currentTab === 'signup' }" @click="currentTab = 'signup'">Signup</NuxtLink>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const { user, isLogin } = storeToRefs(useUserStore())

const userEmail = computed(() => user.value.email.split('@')[0])

type TabType = 'home' | 'services' | 'inquiry' | 'login' | 'signup' | 'logout'
const currentTab = ref<TabType>('home')
</script>

<style scoped>
.active {
  border-bottom-width: 2px;
  padding-bottom: 0.25rem;
  border-color: #60a5fa;
  /* This is the Tailwind color for blue-400 */
}
</style>