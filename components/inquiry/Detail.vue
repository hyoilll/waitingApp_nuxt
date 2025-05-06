<template>
  <div class="w-full flex flex-col gap-3">
    <DefineDetailTemplate #="{ title, data, col }">
      <div class="flex gap-05 flex-wrap" :class="{ 'flex-col': col }">
        <span class="py-1 px-2 bg-blue-300 text-xs text-white rounded-full w-fit">{{ title }}</span>
        <p class="ml-2 whitespace-pre-wrap">{{ data }}</p>
      </div>
    </DefineDetailTemplate>

    <div class="flex justify-between items-center">
      <button
        type="button"
        class="w-fit px-2 py-1 bg-gray-300 rounded-md text-sm text-white font-bold"
        @click="$emit('return')">
        一覧に戻る
      </button>
      <div class="flex gap-2">
        <button
          type="button"
          class="px-2 py-1 bg-gray-400 text-white rounded-full"
          :class="{ 'opacity-30': !enableLeftBtn }"
          :disabled="!enableLeftBtn"
          @click="moveLeft"> ← </button>
        <button
          type="button"
          class="px-2 py-1 bg-gray-400 text-white rounded-full"
          :class="{ 'opacity-30': !enableRightBtn }"
          :disabled="!enableRightBtn"
          @click="moveRight"> → </button>
      </div>
    </div>

    <div class="w-full">
      <h1 class="font-bold text-xl text-center mb-5">詳細内容</h1>

      <div class="space-y-4">
        <ReuseDetailTemplate title="タイトル" :data="inquiries[selectedIdx].title" />
        <ReuseDetailTemplate title="メールアドレス" :data="inquiries[selectedIdx].email" />
        <ReuseDetailTemplate title="作成日" :data="$dayjs(inquiries[selectedIdx].created_at).format(DATE_FORMAT)" />
        <ReuseDetailTemplate title="内容" :col="true" :data="inquiries[selectedIdx].content" />
      </div>
    </div>

    <div>
      <SeperateLine />

      <form v-if="isLogin" class="mb-4" @submit.prevent="add">
        <textarea
          v-model="newComment"
          placeholder="Add a comment..."
          class="w-full p-2 border border-gray-300 rounded outline-none"
          rows="5" />
        <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>

      <InquiryComments :comments="inquiries[selectedIdx].comments" />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { InquiryInfo, NewCommentPayload } from '~/composables/types/Inquiry';

const { inquiries, idx } = defineProps<{
  inquiries: InquiryInfo[]
  idx: number
}>()

const emit = defineEmits<{
  return: []
  add: [NewCommentPayload, number]
}>()

const { isLogin, user } = useUserStore()

const selectedIdx = ref(idx)
const enableLeftBtn = computed(() => selectedIdx.value > 0)
const enableRightBtn = computed(() => selectedIdx.value < inquiries.length - 1)

const moveLeft = () => {
  if (!enableLeftBtn.value) {
    return
  }
  selectedIdx.value -= 1
}

const moveRight = () => {
  if (!enableRightBtn.value) {
    return
  }
  selectedIdx.value += 1
}

const [DefineDetailTemplate, ReuseDetailTemplate] = createReusableTemplate<{ title: string, data: string, col?: boolean }>()

const newComment = ref('')

const add = async () => {
  const payload: NewCommentPayload = {
    content: newComment.value,
    user_id: user.id
  }

  newComment.value = ''
  emit('add', payload, selectedIdx.value)
}

</script>