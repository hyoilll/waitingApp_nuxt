<template>
  <div class="w-[70%] mx-auto py-10">
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold border-b-2 w-fit pb-1">問い合わせ</h1>
        <button v-if="isLogin" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="openAddDialog">
          <Icon name="mdi:plus" class="-ml-1 mr-2 h-5 w-5" />
          新規作成
        </button>
      </div>

      <p class="text-gray-600">ご意見・ご要望、バグ報告などはこちらへ</p>
    </div>

    <main>
      <template v-if="isShowList">
        <div class="mb-6">
          <input
            v-model="searchInquiry"
            type="text"
            placeholder="Search inquiries..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>

        <InquiryDisplayList
          :shown-inquiries
          @open="openDetail" />
      </template>
      <InquiryDetail v-else :inquiries="shownInquiries" :idx="selectedIdx" @update-inquiry="updateInq" @add="add" @edit="edit" @delete="handleDelete" @return="returnPage" />
    </main>

    <AddDialog #="{ resolve, reject }">
      <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
        <InquiryAddDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
      </Modal>
    </AddDialog>
  </div>
</template>

<script setup lang="ts">
import { addComment, addInquiry, deleteComment, editComment, getInquryList, updateInquiry } from '~/composables/apis/Inquiry'
import type { InquiryInfo, InquiryUpdateForm, NewCommentPayload, NewInquiryPayload } from '~/composables/types/Inquiry'

const searchInquiry = ref('')
const debounced = refDebounced(searchInquiry, 500)
const inquiries = ref<InquiryInfo[]>([])
const shownInquiries = computed(() => inquiries.value.filter((inquiry) => inquiry.title.includes(debounced.value)))

const { isLogin } = useUserStore()

const AddDialog = createTemplatePromise<NewInquiryPayload>()
const openAddDialog = async () => {
  const newInquiry = await AddDialog.start()
  const resp = await addInquiry(newInquiry)

  if (resp?.error) {
    console.error(resp.error)
    return
  }

  inquiries.value = resp?.data as InquiryInfo[]
  if (!isShowList.value) {
    returnPage()
  }
}

const resp = await getInquryList()
if (resp.error.value) {
  console.error(resp.error)
}

inquiries.value = resp.data.value?.data as InquiryInfo[]

const add = async (payload: NewCommentPayload, targetIdx: number) => {
  const resp = await addComment(shownInquiries.value[targetIdx].id, payload)
  if (resp?.error) {
    console.error(resp.error)
    return
  }

  inquiries.value = resp?.data as InquiryInfo[]
}

const edit = async (payload: NewCommentPayload, targetIdx: number, commentId: number) => {
  const resp = await editComment(shownInquiries.value[targetIdx].id, commentId, payload)
  if (resp?.error) {
    console.error(resp.error)
    return
  }

  inquiries.value = resp?.data as InquiryInfo[]
}

const handleDelete = async (targetIdx: number, commentId: number, userId: string) => {
  const resp = await deleteComment(shownInquiries.value[targetIdx].id, commentId, userId)
  if (resp?.error) {
    console.error(resp.error)
    return
  }

  inquiries.value = resp?.data as InquiryInfo[]
}

const isShowList = ref(true)

const selectedIdx = ref(0)
const openDetail = (idx: number) => {
  selectedIdx.value = idx
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)
}

const returnPage = () => {
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)
}

const updateInq = async (updateForm: InquiryUpdateForm, idx: number) => {
  const inquiry = shownInquiries.value[idx]
  const payload = {
    ...updateForm,
    user_id: inquiry.user_id,
  }

  const resp = await updateInquiry(inquiry.id, payload)
  if (resp?.error) {
    console.error(resp.error)
    return
  }

  inquiries.value = resp?.data as InquiryInfo[]
}
</script>