<template>
  <div>
    <header class="bg-indigo-100 shadow-md sticky top-0 z-50">
      <div class="mx-auto px-6 py-4 flex justify-between items-center md:justify-around">
        <!-- Logo -->
        <div class="flex items-center gap-5">
          <NuxtLink :to="localePath('/')" class="text-2xl font-bold text-indigo-600">
            Qパス
          </NuxtLink>
          <CommonLanguageSelector class="md:hidden" />
          <span v-if="isLogin" class="hidden sm:block text-gray-600">{{ $t('msg.welcome', { username: userEmail }) }}</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex md:items-center space-x-8">
          <CommonLanguageSelector />

          <NuxtLink v-for="link in navLinks" :key="link.to" :to="localePath(link.to)" class="nav-link" active-class="active-link">
            {{ $t(link.text) }}
          </NuxtLink>

          <template v-if="isLogin">
            <NuxtLink :to="localePath('/dashboard/modeselect')" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-3 rounded-lg transition duration-300" target="_blank">
              {{ $t('header.dashboard') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/logout')" class="nav-link !text-red-500 md:hover:!text-red-700">{{ $t('header.logout') }}</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink :to="localePath('/login')" class="nav-link" active-class="active-link">{{ $t('header.login') }}</NuxtLink>
            <NuxtLink :to="localePath('/signup')" class="nav-link" active-class="active-link">
              {{ $t('header.signup') }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile Menu Button -->
        <button popovertarget="mobile-menu-popover" popovertargetaction="toggle" class="text-gray-700 focus:outline-none md:hidden">
          <Icon name="mdi:menu" size="2em" />
        </button>
      </div>
    </header>

    <!-- Mobile Menu Component -->
    <MobileMenu :nav-links :is-login :user-email />
  </div>
</template>

<script lang="ts" setup>
import MobileMenu from '~/components/common/MobileMenu.vue';

const { user, isLogin } = storeToRefs(useUserStore());
const localePath = useLocalePath();

const userEmail = computed(() => {
  if (!user.value || !user.value.email) return '';
  return user.value.email.split('@')[0];
});

const navLinks = [
  { to: '/', text: 'header.home' },
  { to: '/services', text: 'header.service' },
  { to: '/inquiry', text: 'header.inquiry' },
];
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-indigo-600 transition duration-300 pb-1 border-b-2 border-transparent;
}

.active-link {
  @apply text-indigo-600 border-indigo-600;
}
</style>