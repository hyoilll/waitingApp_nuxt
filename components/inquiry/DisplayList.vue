<template>
  <div class="space-y-4">
    <div
      v-for="inquiry, idx in shownInquiries"
      :key="inquiry.id"
      class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      @click="$emit('open', idx)">
      <h2 class="font-bold text-xl text-gray-800 mb-2">{{ inquiry.title }}</h2>
      <div class="text-sm text-gray-500 flex items-center gap-4">
        <span>
          <Icon name="mdi:account-circle" class="mr-1 translate-y-0.5" />
          {{ inquiry.email }}
          <span v-if="user.email === inquiry.email" class="ml-2 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">作成者</span>
        </span>
        <span>
          <Icon name="mdi:comment-text-outline" class="mr-1 translate-y-0.5" />
          {{ inquiry.comments.length }} コメント
        </span>
        <span>
          <Icon name="mdi:clock-outline" class="mr-1 translate-y-0.5" />
          {{ convertToJSTDate(inquiry.updated_at) }}
        </span>
      </div>
    </div>
    <div v-if="!shownInquiries.length" class="text-center py-12">
      <p class="text-gray-500 text-lg">該当する問い合わせはありません。</p>
    </div>
  </div>
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