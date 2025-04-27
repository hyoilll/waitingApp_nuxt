<template>
  <section class="flex gap-3 items-center">
    <h1 class="font-bold text-xl">Inquiry</h1>
    <!-- TODO: login済みだけ作成できるように -->
    <button type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md" @click="openAddDialog">新規作成</button>
  </section>

  <section class="w-[90%] mx-auto pt-10">
    <input
      v-model="searchInquiry"
      type="text"
      placeholder="Search inquiries..."
      class="w-full px-4 py-2 border rounded-md outline-none" />
  </section>

  <section class="w-[90%] mx-auto py-10">
    <ul v-if="shownInquirys.length">
      <li
        v-for="inquiry, idx in shownInquirys"
        :key="inquiry.id"
        class="p-4 hover:bg-gray-300 rounded-md cursor-pointer"
        @click="openDetailDialog(idx)">
        <div>
          <h2 class="font-bold text-lg">{{ inquiry.title }}</h2>
          <p class="text-sm text-gray-500">Created at: {{ inquiry.created_at }}</p>
        </div>
      </li>
    </ul>
    <span v-else>
      該当する問い合わせはありません。
    </span>
  </section>

  <InquiryAddDialog #="{ resolve, reject }">
    <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
      <AddInquiryDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
    </Modal>
  </InquiryAddDialog>

  <InquiryDetailDialog #="{ args: [inquirys, idx], reject }">
    <Modal id="detailInquiry" @close="reject(CLOSE_MODAL)">
      <DetailInquiryDialog :inquirys :idx />
    </Modal>
  </InquiryDetailDialog>
</template>

<script setup lang="ts">
import { getInquryList } from '~/composables/apis/Inquiry'
import type { InquiryInfo, NewInquiryPayload } from '~/composables/types/Inquiry'

const searchInquiry = ref('')
const debounced = refDebounced(searchInquiry, 500)
const inquirys = ref<InquiryInfo[]>([])
const shownInquirys = computed(() => inquirys.value.filter((inquiry) => inquiry.title.includes(debounced.value)))

const InquiryAddDialog = createTemplatePromise<NewInquiryPayload>()
const openAddDialog = async () => {
  const newInquiry = await InquiryAddDialog.start()
  console.log(newInquiry)
}

const InquiryDetailDialog = createTemplatePromise<unknown, [InquiryInfo[], number]>()
const openDetailDialog = async (idx: number) => {
  await InquiryDetailDialog.start(shownInquirys.value, idx)
}

const resp = await getInquryList()

if (resp.error.value) {
  console.error(resp.error)
}

inquirys.value = resp.data.value?.data as InquiryInfo[]
</script>