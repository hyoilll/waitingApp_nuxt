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
        @click="$router.push({ name: 'inquiry' })">
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
        <ReuseDetailTemplate title="タイトル" :data="inquiry.title" />
        <ReuseDetailTemplate title="メールアドレス" :data="inquiry.email" />
        <ReuseDetailTemplate title="作成日" :data="$dayjs(inquiry.created_at).format(DATE_FORMAT)" />
        <ReuseDetailTemplate title="内容" :col="true" :data="inquiry.content" />
      </div>
    </div>

    <InquiryComments :comments />
  </div>
</template>

<script setup lang="ts">
import { getDetailInquiry } from '~/composables/apis/Inquiry';
import type { InquiryComment, InquiryInfo } from '~/composables/types/Inquiry';

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  }
})

const inquiry: InquiryInfo = reactive({
  id: 0,
  title: '',
  email: '',
  content: '',
  created_at: '',
  user_id: ''
})
// const enableLeftBtn = ref(false)
// const enableRightBtn = ref(false)
const comments = ref<InquiryComment[]>([])

const route = useRoute()
const id = +route.params.id

const resp = await getDetailInquiry(id)
if (resp.error.value) {
  console.error(resp.error)
}

console.log(resp.data.value)

// const enableLeftBtn = targetIdx > 0
// const enableRightBtn = targetIdx < (data as InquiryResponse[]).length - 1

// Object.assign(inquiry, resp.data.value?.inquiry)
// enableLeftBtn.value = resp.data.value?.enableLeftBtn
// enableRightBtn.value = resp.data.value?.enableRightBtn
// comments.value = resp.data.value?.comments ?? []
// const inquiryIds = resp.data.value?.inquiryIds ?? []

const { push } = useRouter()
const moveLeft = () => {
  const targetId = enableLeftBtn.value ? inquiryIds[inquiryIds.indexOf(id) - 1] : undefined
  if (!targetId) {
    return
  }

  push({ name: 'inquiry-id', params: { id: targetId } })
}

const moveRight = () => {
  const targetId = enableRightBtn.value ? inquiryIds[inquiryIds.indexOf(id) + 1] : undefined
  if (!targetId) {
    return
  }

  push({ name: 'inquiry-id', params: { id: targetId } })
}


const [DefineDetailTemplate, ReuseDetailTemplate] = createReusableTemplate<{ title: string, data: string, col?: boolean }>()
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.15s;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate(100px, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(100px, 0);
}
</style>