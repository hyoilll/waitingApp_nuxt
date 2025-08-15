<template>
  <section class="w-full lg:w-[70%] mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div>
      <h1 class="text-3xl sm:text-4xl font-bold border-b-2 w-fit pb-1">{{ $t('services.title') }}</h1>
      <p class="text-gray-600">{{ $t('services.description') }}</p>
    </div>

    <!-- 管理者側でのイメージ -->
    <div id="admin" class="mt-10">
      <AnchorLabel
        class="relative w-fit mx-auto group"
        anchor="admin"
        :title="$t('services.admin.title')"
        customClass="flex items-center justify-center text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit px-5 py-3 rounded-full shadow-lg"
        @move="scrollToAnchor('admin')" />

      <div class=" mt-5 space-y-20">
        <ServiceItem
          v-for="content, idx in translatedShopItems"
          :key="idx"
          v-bind="content"
          :is-reverse="idx % 2 === 1"
          @move-to-anchor="scrollToAnchor">
          <p v-if="content.isSupportText" class="ml-2 text-sm font-bold">
            {{ $t('services.admin.card5.supportText') }}
            <NuxtLink
              href="#customer_3"
              class="cursor-pointer text-blue-500 md:hover:underline"
              @click="scrollToAnchor('customer_3')">{{ $t('services.admin.card5.supportLink') }}</NuxtLink>
          </p>
        </ServiceItem>
      </div>
    </div>

    <!-- お客様側でのイメージ -->
    <div id="customer" class="mt-20">
      <AnchorLabel
        class="relative w-fit mx-auto group"
        anchor="customer"
        :title="$t('services.customer.title')"
        customClass="flex items-center justify-center text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit px-5 py-3 rounded-full shadow-lg"
        @move="scrollToAnchor('customer')" />

      <div class="mt-5 space-y-20">
        <ServiceItem
          v-for="content, idx in translatedCustomerItems"
          :key="idx"
          v-bind="content"
          :is-reverse="idx % 2 === 1"
          @move-to-anchor="scrollToAnchor" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { serviceShopItems, serviceCustomerItems } from '~/composables/datas/Service';

const { t } = useI18n();

const translatedShopItems = computed(() => {
  return serviceShopItems.contents.map(item => ({
    ...item,
    title: t(item.title),
    description: t(item.description)
  }));
});

const translatedCustomerItems = computed(() => {
  return serviceCustomerItems.contents.map(item => ({
    ...item,
    title: t(item.title),
    description: t(item.description)
  }));
});


/**
 * TODO: 
 * 1. smoothとoffsetが効かないので、後で修正
 * 2. Hydration class mismatch on <NuxtLink>のエラーが出るので、後で修正
 * */
const { scrollToAnchor, scrollToTop } = useAnchorScroll({
  toTop: {
    scrollOptions: {
      behavior: 'smooth',
      offsetTop: 10,
    }
  }
})

</script>