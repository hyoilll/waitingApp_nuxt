<template>
  <div>
    <DefineContentTemplate v-slot="{ image, description, isReverse }">
      <div class="flex h-[300px] bg-yellow-300" :class="isReverse ? 'flex-row-reverse' : ''">
        <div class="w-[45%] h-full bg-red-500"></div>
        <p class="w-[55%] p-3">{{ description }}</p>
      </div>
    </DefineContentTemplate>

    <h1 class="font-bold text-xl">Service</h1>

    <section class="w-[90%] mx-auto py-10">
      <ul class="flex border rounded-md bg-white w-fit mx-auto cursor-pointer">
        <li
          v-for="item, idx in serviceItems"
          :key="item.id"
          class="p-2"
          :class="[
            idx ? 'border-l' : '',
            selectedIdx === idx ? 'bg-blue-500 text-white' : '',
            idx === 0 ? 'rounded-l-md' : '',
            idx === serviceItems.length - 1 ? 'rounded-r-md' : ''
          ]"
          @click="selectedIdx = idx">
          <span class="font-bold">{{ item.title }}</span>
        </li>
      </ul>

      <div class="mt-5 space-y-3">
        <ReuseContentTemplate
          v-for="content, idx in serviceItems[selectedIdx].contents"
          :key="idx"
          :image="content.image"
          :description="content.description"
          :is-reverse="idx % 2 === 1" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { serviceItems } from '~/composables/datas/Service';

const selectedIdx = ref(0)

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate<{ image: string, description: string, isReverse?: boolean }>()

</script>