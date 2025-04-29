<template>
  <section class="flex gap-3 items-center">
    <h1 class="font-bold text-xl">Inquiry</h1>
    <!-- TODO: login済みだけ作成できるように -->
    <button type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md" @click="openAddDialog">新規作成</button>
  </section>

  <section class="w-[90%] mx-auto py-10 relative">
    <TransitionGroup name="slide-left">
      <template v-if="isShowList">
        <input
          v-model="searchInquiry"
          type="text"
          placeholder="Search inquiries..."
          class="w-full px-4 py-2 border rounded-md outline-none" />

        <DisplayInquiryList
          :shown-inquiries
          @open="openDetail" />
      </template>
    </TransitionGroup>
    <TransitionGroup name="slide-right">
      <DetailInquiry v-if="!isShowList" :shown-inquiries :idx="selectedId" class="absolute top-10" @return="isShowList = !isShowList" />
    </TransitionGroup>
  </section>

  <InquiryAddDialog #="{ resolve, reject }">
    <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
      <AddInquiryDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
    </Modal>
  </InquiryAddDialog>
</template>

<script setup lang="ts">
import { addInquiry, getInquryList } from '~/composables/apis/Inquiry'
import type { InquiryInfo, NewInquiryPayload } from '~/composables/types/Inquiry'

const searchInquiry = ref('')
const debounced = refDebounced(searchInquiry, 500)
const inquirys = ref<InquiryInfo[]>([])
const shownInquiries = computed(() => inquirys.value.filter((inquiry) => inquiry.title.includes(debounced.value)))

const InquiryAddDialog = createTemplatePromise<NewInquiryPayload>()
const openAddDialog = async () => {
  const newInquiry = await InquiryAddDialog.start()
  const resp = await addInquiry(newInquiry)

  if (resp?.error) {
    console.error(resp.error)
  }

  inquirys.value = resp?.data as InquiryInfo[]
  isShowList.value = true
}

const resp = await getInquryList()
const isShowList = ref(true)
if (resp.error.value) {
  console.error(resp.error)
}

inquirys.value = resp.data.value?.data as InquiryInfo[]

const selectedId = ref(0)
const openDetail = (idx: number) => {
  isShowList.value = !isShowList
  selectedId.value = idx
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>