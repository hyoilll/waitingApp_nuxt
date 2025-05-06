<template>
  <div>
    <section class="flex gap-3 items-center">
      <h1 class="font-bold text-xl">Inquiry</h1>
      <button v-if="isLogin" type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md" @click="openAddDialog">新規作成</button>
    </section>

    <section class="w-[90%] mx-auto py-10">
      <template v-if="isShowList">
        <input
          v-model="searchInquiry"
          type="text"
          placeholder="Search inquiries..."
          class="w-full px-4 py-2 border rounded-md outline-none" />

        <InquiryDisplayList
          :shown-inquiries
          @open="openDetail" />
      </template>
      <InquiryDetail v-if="!isShowList" :inquiries="shownInquiries" :idx="selectedIdx" @return="returnPage" @add="add" />
    </section>

    <AddDialog #="{ resolve, reject }">
      <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
        <InquiryAddDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
      </Modal>
    </AddDialog>
  </div>
</template>

<script setup lang="ts">
import { addComment, addInquiry, getInquryList } from '~/composables/apis/Inquiry'
import type { InquiryInfo, NewCommentPayload, NewInquiryPayload } from '~/composables/types/Inquiry'

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

const isShowList = ref(true)

const selectedIdx = ref(0)
const openDetail = (idx: number) => {
  selectedIdx.value = idx
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)
}

const returnPage = () => {
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)
}
</script>