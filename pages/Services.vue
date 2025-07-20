<template>
  <div class="w-[80%] mx-auto py-10">
    <section class="w-[90%] mx-auto py-10">
      <div>
        <h1 class="text-4xl font-bold border-b-2 w-fit pb-1">Qパス</h1>
        <p class="text-gray-600">呼び出しも管理もワンタッチ。順番待ちの新体験。</p>
      </div>


      <div class="mt-10 space-y-20">
        <ServiceItem
          v-for="content, idx in serviceShopItems.contents"
          :key="idx"
          v-bind="content"
          :is-reverse="idx % 2 === 1"
          @move-to-anchor="scrollToAnchor">
          <p v-if="content.isSupportText" class="ml-2 text-sm font-bold">
            ※ 「呼出」押下後のお客様の画面は
            <NuxtLink
              href="#"
              class="cursor-pointer text-blue-500 hover:underline"
              @click="scrollToAnchor('')">ここ</NuxtLink>
          </p>
        </ServiceItem>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { serviceShopItems } from '~/composables/datas/Service';

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