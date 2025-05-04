<template>
  <ul v-if="shownInquiries.length">
    <li
      v-for="inquiry, idx in shownInquiries"
      :key="inquiry.id"
      class="p-4 hover:bg-gray-300 rounded-md cursor-pointer"
      @click="$emit('open', idx)">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-lg">{{ inquiry.title }}</h2>
        <p class="text-sm text-gray-500 min-w-[143px]">{{ $dayjs(inquiry.created_at).format(DATE_FORMAT) }}</p>
      </div>
      <div class="text-sm text-gray-500 flex items-center gap-2">
        {{ inquiry.email }}
        <span v-if="user.email === inquiry.email" class="text-xs px-2 py-1 bg-green-400 text-white rounded-full">作成者</span>
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

const { user } = useUserStore()
</script>