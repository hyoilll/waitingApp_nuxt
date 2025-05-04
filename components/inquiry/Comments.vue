<template>
  <SeperateLine />

  <form v-if="isLogin" class="mb-4" @submit.prevent="add">
    <textarea
      v-model="newComment"
      placeholder="Add a comment..."
      class="w-full p-2 border border-gray-300 rounded outline-none"
      rows="5" />
    <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
      Submit
    </button>
  </form>

  <ul v-if="comments.length">
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex flex-col gap-2 border-b-2 border-gray-300 py-4">
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <span class="font-bold text-lg">{{ comment.user.email }}</span>
          <span v-if="isCreator(comment.user.email)" class="text-xs px-2 py-1 bg-green-400 text-white rounded-full">作成者</span>
          <!-- TODO: 管理者ラベルも追加 -->
        </div>
        <div class="flex gap-2 items-center">
          <!-- TODO: 自分が作成したコメントの場合編集と削除が可能 -->
          <IconEdit @edit="console.log('edit')" />
          <IconDelete @delete="console.log('delete')" />
          <span class="text-sm text-gray-500">{{ $dayjs(comment.created_at).format(DATE_FORMAT) }}</span>
        </div>
      </div>
      <p>{{ comment.content }}</p>
    </li>
  </ul>
  <span v-else>
    コメントはありません。
  </span>
</template>

<script setup lang="ts">
import { addComment, getComments } from '~/composables/apis/Inquiry';
import type { InquiryComment, NewCommentPayload } from '~/composables/types/Inquiry';

const { id } = defineProps<{
  id: number
}>()

const { isLogin, user } = useUserStore()

const comments = ref<InquiryComment[]>([])
const isCreator = (email: string) => user.email === email

const newComment = ref('')
const add = async () => {
  const payload: NewCommentPayload = {
    content: newComment.value,
    inquiry_id: id,
    user_id: user.id
  }

  const resp = await addComment(id, payload)
  if (resp.error) {
    console.error(resp.error)
    return
  }

  comments.value = resp.data as InquiryComment[]
  newComment.value = ''
}

const resp = await getComments(id)
if (resp.error.value) {
  console.error(resp.error)
}
comments.value = resp.data.value?.data as InquiryComment[]

</script>