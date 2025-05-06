<template>
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
import type { InquiryComment } from '~/composables/types/Inquiry';

const { comments } = defineProps<{
  comments: InquiryComment[]
}>()

const { user } = useUserStore()

const isCreator = (email: string) => user.email === email
</script>