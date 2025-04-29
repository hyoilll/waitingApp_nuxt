<template>
  <div class="w-full flex flex-col gap-3">
    <DefineDetailTemplate #="{ title, data, col }">
      <div class="flex gap-05" :class="{ 'flex-col': col }">
        <span class="py-1 px-2 bg-blue-300 text-xs text-white rounded-full w-fit">{{ title }}</span>
        <p class="ml-2">{{ data }}</p>
      </div>
    </DefineDetailTemplate>

    <button
      type="button"
      class="w-fit px-2 py-1 bg-gray-300 rounded-md text-sm text-white font-bold"
      @click="$emit('return')">戻る</button>

    <div class="w-full">
      <h1 class="font-bold text-xl text-center mb-5">詳細内容</h1>
      <div class="flex gap-2 absolute top-0 right-0">
        <button
          type="button"
          class="px-2 py-1 bg-gray-400 text-white rounded-full"
          :class="{ 'opacity-30': disableLeftBtn }"
          :disabled="disableLeftBtn"
          @click="moveLeft"> ← </button>
        <button
          type="button"
          class="px-2 py-1 bg-gray-400 text-white rounded-full"
          :class="{ 'opacity-30': disableRightBtn }"
          :disabled="disableRightBtn"
          @click="moveRight"> → </button>
      </div>

      <div class="space-y-4">
        <ReuseDetailTemplate title="タイトル" :data="shownInquiries[selectedId].title" />
        <ReuseDetailTemplate title="メールアドレス" :data="shownInquiries[selectedId].email" />
        <ReuseDetailTemplate title="作成日" :data="$dayjs(shownInquiries[selectedId].created_at).format(DATE_FORMAT)" />
        <ReuseDetailTemplate title="内容" :col="true" :data="shownInquiries[selectedId].content" />
      </div>
    </div>

    <InquiryComments />
  </div>
</template>

<script setup lang="ts">
import type { InquiryInfo } from '~/composables/types/Inquiry';

const { shownInquiries, idx } = defineProps<{
  shownInquiries: InquiryInfo[]
  idx: number
}>()

defineEmits<{
  return: []
}>()

const selectedId = ref(idx)

const disableLeftBtn = computed(() => !selectedId.value)
const moveLeft = () => {
  if (!disableLeftBtn.value) {
    selectedId.value -= 1
  }
}

const disableRightBtn = computed(() => selectedId.value >= shownInquiries.length - 1)
const moveRight = () => {
  if (!disableRightBtn.value) {
    selectedId.value += 1
  }
}

const [DefineDetailTemplate, ReuseDetailTemplate] = createReusableTemplate<{ title: string, data: string, col?: boolean }>()
</script>