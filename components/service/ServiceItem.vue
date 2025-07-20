<template>
  <div class="flex h-[300px] p-2 gap-5" :class="isReverse ? 'flex-row-reverse' : ''">
    <img :src="useAsset(image, type)" alt="Waiting" class="shadow-xl p-1 bg-blue-400 brightness-125" />
    <div class="w-[55%] p-3">
      <div class="relative group">
        <NuxtLink
          :href="`#${anchor}`"
          class="absolute text-gray-400 -left-5 top-2 group-hover:visible invisible cursor-pointer"
          @click="$emit('moveToAnchor', anchor)">
          <Icon
            name="mdi:anchor"
            size="1.5em" />
        </NuxtLink>
        <span :id="anchor" class="ml-1 font-bold text-4xl group-hover:cursor-pointer">{{ title }}</span>
      </div>

      <div class="ml-4 mt-4">
        <p class="text-xl text-gray-500 whitespace-pre-wrap">{{ description }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  anchor: string
  title: string
  description: string
  type: string
  isReverse: boolean
}>();

defineEmits<{
  moveToAnchor: [anchor: string]
}>();
</script>