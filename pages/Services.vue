<template>
  <section class="w-full lg:w-[70%] mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div>
      <h1 class="text-3xl sm:text-4xl font-bold border-b-2 w-fit pb-1">Qパス</h1>
      <p class="text-gray-600">呼び出しも管理もワンタッチ。順番待ちの新体験。</p>
    </div>

    <!-- 管理者側でのイメージ -->
    <div id="admin" class="mt-10">
      <AnchorLabel
        class="relative w-fit mx-auto group"
        anchor="admin"
        title="管理者"
        customClass="flex items-center justify-center text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit px-5 py-3 rounded-full shadow-lg"
        @move="scrollToAnchor('admin')" />

      <div class=" mt-5 space-y-20">
        <ServiceItem
          v-for="content, idx in serviceShopItems.contents"
          :key="idx"
          v-bind="content"
          :is-reverse="idx % 2 === 1"
          @move-to-anchor="scrollToAnchor">
          <p v-if="content.isSupportText" class="ml-2 text-sm font-bold">
            ※ 「呼出」押下後のお客様の画面は
            <NuxtLink
              href="#customer_3"
              class="cursor-pointer text-blue-500 md:hover:underline"
              @click="scrollToAnchor('customer_3')">ここ</NuxtLink>
          </p>
        </ServiceItem>
      </div>
    </div>

    <!-- お客様側でのイメージ -->
    <div id="customer" class="mt-20">
      <AnchorLabel
        class="relative w-fit mx-auto group"
        anchor="customer"
        title="お客様"
        customClass="flex items-center justify-center text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit px-5 py-3 rounded-full shadow-lg"
        @move="scrollToAnchor('customer')" />

      <div class="mt-5 space-y-20">
        <ServiceItem
          v-for="content, idx in serviceCustomerItems.contents"
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