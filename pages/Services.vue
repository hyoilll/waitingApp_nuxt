<template>
  <div class="w-[70%] mx-auto py-10">
    <DefineContentTemplate v-slot="{ image, description, isReverse }">
      <div class="flex h-[300px] p-2 gap-5" :class="isReverse ? 'flex-row-reverse' : ''">
        <!-- TODO: あとでimageに差し替え -->
        <img :src="useAsset(image)" alt="Wating" class="w-[50%] h-full rounded-2xl shadow-lg" />
        <div class="w-[55%] p-3">
          <span class="font-bold text-4xl">title</span>
          <p class="text-xl">{{ description }}</p>
        </div>
      </div>
    </DefineContentTemplate>

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

      <div class="mt-10 space-y-20">
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
const selectedIdx = ref(0)

const serviceItems = [
  {
    id: 1,
    title: 'Service 1',
    contents: [
      {
        image: 'wating',
        description: 'Description for Service 1',
      },
      {
        image: 'wating',
        description: 'Another description for Service 1Another description for Service 1',
      },
    ]
  },
  // {
  //   id: 2,
  //   title: 'Service 2',
  //   contents: [
  //     {
  //       image: 'wating',
  //       description: 'Description for Service 2',
  //     },
  //     {
  //       image: 'wating',
  //       description: 'Another description for Service 2',
  //     },
  //   ]
  // },
  // {
  //   id: 3,
  //   title: 'Service 3',
  //   contents: [
  //     {
  //       image: 'wating',
  //       description: 'Description for Service 3',
  //     },
  //     {
  //       image: 'wating',
  //       description: 'Another description for Service 3',
  //     },
  //   ]
  // },
  // {
  //   id: 4,
  //   title: 'Service 4',
  //   contents: [
  //     {
  //       image: 'wating',
  //       description: 'Description for Service 4',
  //     },
  //     {
  //       image: 'wating',
  //       description: 'Another description for Service 4',
  //     },
  //   ]
  // },
]

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate<{ image: string, description: string, isReverse?: boolean }>()

</script>