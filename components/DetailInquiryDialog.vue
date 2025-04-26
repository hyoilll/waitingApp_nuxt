<template>
  <DefineDetailTemplate #="{ title, data, col }">
    <div class="flex gap-05" :class="{ 'flex-col': col }">
      <span class="py-1 px-2 bg-blue-300 text-xs text-white rounded-full w-fit">{{ title }}</span>
      <p class="ml-2">{{ data }}</p>
    </div>
  </DefineDetailTemplate>

  <div class="w-full">
    <h1 class="font-bold text-xl text-center mb-5">詳細内容</h1>

    <div class="space-y-4">
      <ReuseDetailTemplate title="タイトル" :data="inquiry.title" />
      <ReuseDetailTemplate title="メールアドレス" :data="inquiry.email" />
      <ReuseDetailTemplate title="作成日" :data="inquiry.createdAt" />
      <ReuseDetailTemplate title="内容" :data="inquiry.content" :col="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InquiryInfo } from '~/composables/types/Inquiry';

defineProps<{
  inquiry: InquiryInfo
}>()

const [DefineDetailTemplate, ReuseDetailTemplate] = createReusableTemplate<{ title: string, data: string, col?: boolean }>()
</script>