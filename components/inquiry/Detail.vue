<template>
  <div class="w-full flex flex-col gap-3">
    <DefineDetailTemplate #="{ title, data, col, edit, name }">
      <div class="flex gap-05 flex-wrap" :class="{ 'flex-col': col }">
        <span class="py-1 px-2 bg-blue-300 text-xs text-white rounded-full w-fit">{{ title }}</span>
        <p v-if="!edit" class="ml-2 whitespace-pre-wrap">{{ data }}</p>
        <component
          v-else
          :is="col ? 'textarea' : 'input'"
          :value="data"
          :name
          class="w-full p-2 border border-gray-300 rounded outline-none mt-2"
          :rows="col ? 7 : 1"
          required />
      </div>
    </DefineDetailTemplate>

    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <button
          type="button"
          class="w-fit px-2 py-1 bg-gray-300 rounded-md text-sm text-white font-bold"
          @click="$emit('return')">
          一覧に戻る
        </button>
        <div v-if="user.email === inquiries[selectedIdx].email">
          <button
            v-if="!isEdit"
            type="button"
            class="w-fit px-2 py-1 rounded-md text-sm text-white font-bold bg-violet-500"
            @click="isEdit = true">
            編集
          </button>
          <div v-else class="flex gap-2">
            <button form="updateForm" class="bg-red-500 w-fit px-2 py-1 rounded-md text-sm text-white font-bold">
              更新
            </button>
            <button
              type="button"
              class="w-fit px-2 py-1 bg-gray-500 rounded-md text-sm text-white font-bold"
              @click="isEdit = false">
              キャンセル
            </button>
          </div>
        </div>
      </div>

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

      <component :is="isEdit ? 'form' : 'div'" id="updateForm" class="space-y-4" @submit.prevent="updateInquiry($event.target)">
        <ReuseDetailTemplate title="タイトル" :data="inquiries[selectedIdx].title" :edit="isEdit" name="title" />
        <ReuseDetailTemplate title="メールアドレス" :data="inquiries[selectedIdx].email" />
        <ReuseDetailTemplate title="作成日" :data="convertToJSTDate(inquiries[selectedIdx].updated_at)" />
        <ReuseDetailTemplate title="内容" :col="true" :data="inquiries[selectedIdx].content" :edit="isEdit" name="content" />
      </component>
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
import type { InquiryInfo, InquiryUpdateForm, NewCommentPayload } from '~/composables/types/Inquiry';

const { inquiries, idx } = defineProps<{
  inquiries: InquiryInfo[]
  idx: number
}>()

const emit = defineEmits<{
  return: []
  updateInquiry: [InquiryUpdateForm, number]
  add: [NewCommentPayload, number]
  edit: [NewCommentPayload, number, number]
  delete: [number, number, string]
}>()

const { isLogin, user } = useUserStore()

const isEdit = ref(false)

const selectedIdx = ref(idx)
const enableLeftBtn = computed(() => selectedIdx.value > 0)
const enableRightBtn = computed(() => selectedIdx.value < inquiries.length - 1)

const moveLeft = () => {
  if (!enableLeftBtn.value) {
    return
  }

  isEdit.value = false
  selectedIdx.value -= 1
}

const moveRight = () => {
  if (!enableRightBtn.value) {
    return
  }

  isEdit.value = false
  selectedIdx.value += 1
}

const [DefineDetailTemplate, ReuseDetailTemplate] = createReusableTemplate<{ title: string, data: string, col?: boolean, edit?: boolean, name?: string }>()

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

const updateInquiry = (formElement: HTMLFormElement) => {
  const formData = new FormData(formElement);
  const updatedData: InquiryUpdateForm = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  emit('updateInquiry', updatedData, selectedIdx.value);
  isEdit.value = false;
}
</script>