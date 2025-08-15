<template>
  <div class="bg-white rounded-lg shadow-xl overflow-hidden">
    <div class="p-6">
      <!-- ヘッダー：戻るボタン、編集、ページネーション -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b gap-4 md:gap-0">
        <button
          type="button"
          class="inline-flex whitespace-nowrap items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="$emit('return')">
          <Icon name="mdi:arrow-left" />
          {{ $t('button.back') }}
        </button>

        <div class="flex w-full justify-between md:justify-end md:items-center md:gap-4">
          <!-- 編集ボタン -->
          <div v-if="user.email === inquiries[selectedIdx].email">
            <button
              v-if="!isEdit"
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              @click="isEdit = true">
              <Icon name="mdi:pencil" />
              {{ $t('button.edit') }}
            </button>
            <div v-else class="flex gap-2">
              <button form="updateForm" class="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 md:hover:bg-green-700">
                <Icon name="mdi:check" />
                {{ $t('button.submit') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                @click="isEdit = false">
                {{ $t('button.cancel') }}
              </button>
            </div>
          </div>
          <!-- ページネーション -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="p-2 rounded-full text-gray-500 md:hover:bg-gray-100 disabled:opacity-50"
              :disabled="!enableLeftBtn"
              @click="moveLeft">
              <Icon name="mdi:chevron-left" size="1.5em" />
            </button>
            <button
              type="button"
              class="p-2 rounded-full text-gray-500 md:hover:bg-gray-100 disabled:opacity-50"
              :disabled="!enableRightBtn"
              @click="moveRight">
              <Icon name="mdi:chevron-right" size="1.5em" />
            </button>
          </div>
        </div>
      </div>

      <!-- 詳細内容 -->
      <component :is="isEdit ? 'form' : 'div'" id="updateForm" class="space-y-6" @submit.prevent="updateInquiry($event.target)">
        <h1 v-if="!isEdit" class="text-2xl md:text-3xl font-bold text-gray-900">{{ inquiries[selectedIdx].title }}</h1>
        <input v-else type="text" name="title" :value="inquiries[selectedIdx].title" class="w-full text-2xl md:text-3xl font-bold p-2 border-b-2 focus:outline-none focus:border-indigo-500" required />

        <div class="flex flex-col items-start md:flex-row md:items-center gap-2 md:gap-6 text-sm text-gray-500">
          <span>
            <Icon name="mdi:account-circle" class="mr-1 translate-y-0.5" />{{ inquiries[selectedIdx].email }}
          </span>
          <span>
            <Icon name="mdi:clock-outline" class="mr-1 translate-y-0.5" />{{ convertToJSTDate(inquiries[selectedIdx].updated_at) }}
          </span>
        </div>

        <p v-if="!isEdit" class="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{{ inquiries[selectedIdx].content }}</p>
        <textarea v-else name="content" :value="inquiries[selectedIdx].content" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="8" required></textarea>
      </component>
    </div>

    <!-- コメントセクション -->
    <div class="bg-gray-50 p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-800">{{ $t('inquiry.comments.title') }}</h2>
      <form v-if="isLogin" class="mb-6" @submit.prevent="isEditFlag ? edit() : add()">
        <textarea
          v-model="newComment"
          :placeholder="$t('inquiry.comments.addPlaceholder')"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          rows="4"
          required />
        <div class="flex justify-end items-center gap-2 mt-2">
          <button v-if="isEditFlag" type="button" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 border" @click="cancelUpdateComment">{{ $t('button.cancel') }}</button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white"
            :class="isEditFlag ? 'bg-red-600 md:hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'">
            {{ isEditFlag ? $t('button.edit') : $t('button.submit') }}
          </button>
        </div>
      </form>

      <InquiryComments :comments="inquiries[selectedIdx].comments" @edit="editComment" @delete="deleteComment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InquiryInfo, InquiryUpdateForm, NewCommentPayload } from '~/composables/types/Inquiry';

const { t } = useI18n()

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
  if (!confirm(t('inquiry.comments.deleteConfirm'))) {
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