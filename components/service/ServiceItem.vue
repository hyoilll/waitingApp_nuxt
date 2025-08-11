<template>
  <div class="flex h-[300px] p-2 gap-5" :class="isReverse ? 'flex-row-reverse' : ''">
    <img :src="useAsset(image, type)" alt="Waiting" class="shadow-xl p-1 bg-indigo-500 brightness-125" />
    <div class="w-[55%] p-3">
      <AnchorLabel
        class="relative group"
        :anchor
        :title
        @move="$emit('moveToAnchor', $event)" />

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