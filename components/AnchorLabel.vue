<template>
  <div class="relative group">
    <span
      :id="anchor"
      :class="customClass ?? 'ml-1 font-bold text-4xl cursor-pointer'">{{ title }}</span>
    <NuxtLink
      :href="`#${anchor}`"
      class="absolute text-gray-400 -left-5 top-1/2 -translate-y-1/2 invisible group-hover:visible cursor-pointer flex items-center"
      @click="$emit('move', anchor)">
      <Icon
        name="mdi:link"
        size="1.5em" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  anchor: string
  title: string
  customClass?: string
}>()
defineEmits<{
  move: [string]
}>()
</script>