<template>
  <footer class="bg-gray-800 text-white py-4 h-[100px] flex flex-col justify-between relative">
    <button type="button" class="p-2 bg-blue-400 absolute right-10 -top-24 rounded-full flex items-center justify-center shadow-lg" @click="scrollToTop">
      <Icon name="mdi:arrow-up-bold" size="3em" />
    </button>

    <nav class="container mx-auto">
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
      </ul>
    </nav>

    <div class="text-center mt-4 text-sm">
      © 2025 lee. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const { scrollToTop } = useAnchorScroll({
  toTop: {
    scrollOptions: {
      behavior: 'smooth',
      offsetTop: 0,
    }
  }
})
</script>