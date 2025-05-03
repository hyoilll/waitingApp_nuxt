<template>
  <Icon
    name="mdi:trash-can-outline"
    :class="customClass ?? 'text-red-500 cursor-pointer'"
    :size="customSize ?? '1.3em'"
    @click="$emit('delete')" />
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
  customSize?: string
}>()

defineEmits<{
  delete: []
}>()
</script>