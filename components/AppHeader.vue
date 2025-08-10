<template>
  <div>
    <header class="bg-indigo-100 shadow-md sticky top-0 z-50">
      <div class="mx-auto px-6 py-4 flex justify-between items-center md:justify-around">
        <!-- Logo -->
        <div class="flex items-center gap-5">
          <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">
            Qパス
          </NuxtLink>
          <span v-if="isLogin" class="hidden sm:block text-gray-600">ようこそ, {{ userEmail }} さん</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link" active-class="active-link">
            {{ link.text }}
          </NuxtLink>

          <template v-if="isLogin">
            <NuxtLink to="/dashboard/modeselect" class="action-button" target="_blank">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/logout" class="nav-link !text-red-500 hover:!text-red-700">Signout</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link" active-class="active-link">Signin</NuxtLink>
            <NuxtLink to="/signup" class="action-button">
              無料で会員登録
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button popovertarget="mobile-menu-popover" popovertargetaction="toggle" class="text-gray-700 focus:outline-none">
            <Icon name="mdi:menu" size="2em" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Component -->
    <MobileMenu :nav-links :is-login :user-email />
  </div>
</template>

<script lang="ts" setup>
import MobileMenu from '~/components/common/MobileMenu.vue';

const { user, isLogin } = storeToRefs(useUserStore());

const userEmail = computed(() => {
  if (!user.value || !user.value.email) return '';
  return user.value.email.split('@')[0];
});

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/services', text: 'Services' },
  { to: '/inquiry', text: 'Inquiry' },
];
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-indigo-600 transition duration-300 pb-1 border-b-2 border-transparent;
}

.active-link {
  @apply text-indigo-600 border-indigo-600;
}

.action-button {
  @apply bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300;
}
</style>