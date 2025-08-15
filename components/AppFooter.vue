<template>
  <footer class="bg-indigo-100 border-t border-indigo-100">
    <div class="container mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo and Copyright -->
        <div class="text-center md:text-left mb-6 md:mb-0">
          <h2 class="text-2xl font-bold text-indigo-600 mb-2">Qパス</h2>
          <p class="text-sm text-gray-500">&copy; {{ new Date().getFullYear() }} Q-Pass（Lee）. All rights reserved.</p>
        </div>

        <!-- Navigation Links -->
        <nav class="flex gap-8 mb-6 md:mb-0">
          <NuxtLink to="/" class="footer-link">{{ $t('header.home') }}</NuxtLink>
          <NuxtLink to="/services" class="footer-link">{{ $t('header.service') }}</NuxtLink>
          <NuxtLink to="/inquiry" class="footer-link">{{ $t('header.inquiry') }}</NuxtLink>
        </nav>

        <!-- TODO: SNSを作ったら表示する -->
        <div class="flex gap-6">
          <!-- <a href="#" aria-label="Twitter" class="footer-icon">
            <Icon name="mdi:twitter" />
          </a>
          <a href="#" aria-label="Facebook" class="footer-icon">
            <Icon name="mdi:facebook" />
          </a>
          <a href="#" aria-label="Instagram" class="footer-icon">
            <Icon name="mdi:instagram" />
          </a> -->
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button
      v-show="showScrollTopButton"
      type="button"
      class="fixed bottom-8 right-8 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white shadow-lg flex items-center justify-center transition duration-300"
      @click="scrollToTop"
      aria-label="Scroll to top">
      <Icon name="mdi:arrow-up-bold" size="1.5em" />
    </button>
  </footer>
</template>

<script setup lang="ts">
import { useAnchorScroll } from '#imports';

const { scrollToTop } = useAnchorScroll({
  toTop: {
    scrollOptions: {
      behavior: 'smooth',
      offsetTop: 0,
    }
  }
});

// Show button only when scrolled down
const showScrollTopButton = ref(false);
const handleScroll = () => {
  if (window.scrollY > 200) {
    showScrollTopButton.value = true;
  } else {
    showScrollTopButton.value = false;
  }
};

onMounted(() => window.addEventListener('scroll', handleScroll));

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.footer-link {
  @apply text-gray-600 md:hover:text-indigo-600 transition duration-300;
}

/* .footer-icon {
  @apply text-gray-400 hover:text-indigo-600 text-2xl transition duration-300;
} */
</style>