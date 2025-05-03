<template>
  <Icon
    name="mdi:pencil"
    :class="customClass ?? 'text-green-500 cursor-pointer'"
    :size="customSize ?? '1.3em'"
    @click="$emit('edit')" />
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
  customSize?: string
}>()

defineEmits<{
  edit: []
}>()
</script>