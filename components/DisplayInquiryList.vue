<template>
  <ul v-if="shownInquiries.length">
    <li
      v-for="inquiry, idx in shownInquiries"
      :key="inquiry.id"
      class="p-4 hover:bg-gray-300 rounded-md cursor-pointer"
      @click="$emit('open', idx)">
      <div>
        <h2 class="font-bold text-lg">{{ inquiry.title }}</h2>
        <p class="text-sm text-gray-500">Created at: {{ inquiry.created_at }}</p>
      </div>
    </li>
  </ul>
  <span v-else>
    該当する問い合わせはありません。
  </span>
</template>

<script setup lang="ts">
import type { InquiryInfo } from '~/composables/types/Inquiry';

defineProps<{
  shownInquiries: InquiryInfo[]
}>()

defineEmits<{
  open: [number]
}>()
</script>