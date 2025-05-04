<template>
  <section class="flex gap-3 items-center">
    <h1 class="font-bold text-xl">Inquiry</h1>
    <!-- TODO: login済みだけ作成できるように -->
    <button v-if="isLogin" type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md" @click="openAddDialog">新規作成</button>
  </section>

  <section class="w-[90%] mx-auto py-10 relative">
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

    <InquiryDetail v-if="!isShowList" :shown-inquiries :idx="selectedIdx" @return="returnPage" />
  </section>

  <AddDialog #="{ resolve, reject }">
    <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
      <InquiryAddDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
    </Modal>
  </AddDialog>
</template>

<script setup lang="ts">
import { addInquiry, getInquryList } from '~/composables/apis/Inquiry'
import type { InquiryInfo, NewInquiryPayload } from '~/composables/types/Inquiry'

const searchInquiry = ref('')
const debounced = refDebounced(searchInquiry, 500)
const inquirys = ref<InquiryInfo[]>([])
const shownInquiries = computed(() => inquirys.value.filter((inquiry) => inquiry.title.includes(debounced.value)))

const { isLogin } = useUserStore()

const AddDialog = createTemplatePromise<NewInquiryPayload>()
const openAddDialog = async () => {
  const newInquiry = await AddDialog.start()
  const resp = await addInquiry(newInquiry)

  if (resp?.error) {
    console.error(resp.error)
    return
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

const selectedIdx = ref(0)
const openDetail = (idx: number) => {
  selectedIdx.value = idx
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })

  // transition.finished.then(() => console.log('Transition finished'))
}

const returnPage = () => {
  const transition = document.startViewTransition(() => isShowList.value = !isShowList.value)

  // transition.finished.then(() => console.log('Transition finished'))
}
</script>

<style scoped>
/* TODO: view transitionを使ってアニメーション追加すること */
</style>