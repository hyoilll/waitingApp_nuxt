<template>
  <div class="w-[80%] mx-auto py-10">
    <DefineContentTemplate v-slot="{ image, anchor, title, description, type, isReverse }">
      <div class="flex h-[300px] p-2 gap-5" :class="isReverse ? 'flex-row-reverse' : ''">
        <!-- TODO: あとでimageに差し替え -->
        <img :src="useAsset(image, type)" alt="Waiting" class="shadow-xl p-1 bg-blue-400 brightness-125" />
        <div class="w-[55%] p-3">
          <div class="relative group">
            <NuxtLink
              :href="`#${anchor}`"
              class="absolute text-gray-400 -left-5 top-2 group-hover:visible invisible cursor-pointer"
              @click="scrollToAnchor(anchor)">
              <Icon
                name="mdi:anchor"
                size="1.5em" />
            </NuxtLink>
            <span :id="anchor" class="ml-1 font-bold text-4xl group-hover:cursor-pointer">{{ title }}</span>
          </div>
          <p class="text-xl ml-4 mt-4 text-gray-500 whitespace-pre-wrap">{{ description }}</p>
        </div>
      </div>
    </DefineContentTemplate>

    <section class="w-[90%] mx-auto py-10">
      <div>
        <h1 class="text-4xl font-bold border-b-2 w-fit pb-1">Qパス</h1>
        <p class="text-gray-600">呼び出しも管理もワンタッチ。順番待ちの新体験。</p>
      </div>


      <div class="mt-10 space-y-20">
        <ReuseContentTemplate
          v-for="content, idx in serviceShopItems.contents"
          :key="idx"
          v-bind="content"
          :is-reverse="idx % 2 === 1" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { serviceShopItems } from '~/composables/datas/Service';

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate<{
  image: string
  anchor: string
  title: string
  description: string
  type?: string
  isReverse?: boolean
}>()

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