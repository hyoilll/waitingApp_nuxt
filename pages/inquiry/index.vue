<template>
  <div>
    <section class="flex gap-3 items-center">
      <h1 class="font-bold text-xl">Inquiry</h1>
      <button v-if="isLogin" type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md" @click="openAddDialog">新規作成</button>
    </section>

    <section class="w-[90%] mx-auto py-10">
      <input
        v-model="searchInquiry"
        type="text"
        placeholder="Search inquiries..."
        class="w-full px-4 py-2 border rounded-md outline-none" />

      <InquiryDisplayList
        :shown-inquiries
        @open="openDetail" />
    </section>

    <AddDialog #="{ resolve, reject }">
      <Modal id="addInquiry" @close="reject(CLOSE_MODAL)">
        <InquiryAddDialog @add="resolve" @close="reject(CLOSE_MODAL)" />
      </Modal>
    </AddDialog>

    <!-- <InquiryDetail v-if="!isShowList" :shown-inquiries :idx="selectedIdx" @return="returnPage" /> -->
  </div>



</template>

<script setup lang="ts">
import { addInquiry, getInquryList } from '~/composables/apis/Inquiry'
import type { InquiryInfo, NewInquiryPayload } from '~/composables/types/Inquiry'

definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  },
  middleware(to, from) {
    // TODO: アニメーション修正
    // console.log(to)
    // console.log(from)
    // if (!from.path.includes('/inquiry')) {
    //   to.meta.pageTransition = false
    // }
  }
})

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
}

const resp = await getInquryList()
if (resp.error.value) {
  console.error(resp.error)
}

inquirys.value = resp.data.value?.data as InquiryInfo[]

const { push } = useRouter()
const selectedIdx = ref(0)
const openDetail = (idx: number) => {
  selectedIdx.value = idx

  push({ name: 'inquiry-id', params: { id: inquirys.value[idx].id } })
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.15s;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate(-100px, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(-100px, 0);
}
</style>