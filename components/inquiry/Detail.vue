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

      <form v-if="isLogin" class="mb-4" @submit.prevent="isEditFlag ? edit() : add()">
        <textarea
          v-model="newComment"
          placeholder="Add a comment..."
          class="w-full p-2 border border-gray-300 rounded outline-none"
          rows="5"
          required />
        <div class="flex gap-2">
          <button v-if="isEditFlag" class="mt-2 px-4 py-2 bg-gray-500 text-white rounded" @click="cancelUpdateComment">Cancel</button>
          <button
            class="mt-2 px-4 py-2 text-white rounded"
            :class="isEditFlag ? 'bg-red-600' : 'bg-blue-600'">
            {{ isEditFlag ? 'Update' : 'Submit' }}
          </button>
        </div>
      </form>

      <InquiryComments :comments="inquiries[selectedIdx].comments" @edit="editComment" @delete="deleteComment" />
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
  edit: [NewCommentPayload, number, number]
  delete: [number, number, string]
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

const makePayload = () => {
  return {
    content: newComment.value,
    user_id: user.id
  }
}

const add = () => {
  emit('add', makePayload(), selectedIdx.value)
  newComment.value = ''
}

const isEditFlag = ref(false)
const commentId = ref(0)
const editComment = ({ id, content }: { id: number, content: string }) => {
  newComment.value = content
  commentId.value = id
  isEditFlag.value = true

  // Scroll to the top of the textarea
  const textArea = document.querySelector('textarea')
  if (textArea) {
    // TODO: なぜかスクロールがtextAreaより下だと、smoothが効かない
    textArea.scrollIntoView({ behavior: 'smooth', block: 'center' })
    textArea.focus()
  }
}

const edit = () => {
  emit('edit', makePayload(), selectedIdx.value, commentId.value)
  newComment.value = ''
  isEditFlag.value = false
}

const cancelUpdateComment = () => {
  newComment.value = ''
  commentId.value = 0
  isEditFlag.value = false
}

const deleteComment = (commentId: number) => {
  if (!confirm('本当に削除しますか？')) {
    return
  }

  emit('delete', selectedIdx.value, commentId, user.id)
}
</script>