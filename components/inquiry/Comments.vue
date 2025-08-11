<template>
  <div>
    <ul v-if="comments.length" class="space-y-5">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="p-4 rounded-lg"
        :class="isCreator(comment.user.email) ? 'bg-indigo-50' : 'bg-white border'">
        <div class="flex flex-col items-start md:flex-row md:justify-between md:items-center mb-2 gap-2 md:gap-0">
          <div class="flex flex-col md:flex-row md:items-center gap-2">
            <span class="font-bold text-gray-800 break-all">{{ comment.user.email }}</span>
            <span v-if="isLogin && isCreator(comment.user.email)" class="text-xs w-fit px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full whitespace-nowrap">作成者</span>
            <!-- TODO: 管理者ラベルも追加 -->
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-500 self-end md:self-auto">
            <template v-if="isLogin && isCreator(comment.user.email)">
              <button class="text-green-500 hover:text-green-600" @click="editComment(comment.id, comment.content)">
                <Icon name="mdi:pencil" />
              </button>
              <button class="text-red-500 hover:text-red-600" @click="$emit('delete', comment.id)">
                <Icon name="mdi:delete" />
              </button>
            </template>
            <span>{{ convertToJSTDate(comment.updated_at) }}</span>
          </div>
        </div>
        <p class="text-gray-700 whitespace-pre-wrap">{{ comment.content }}</p>　
      </li>
    </ul>
    <div v-else class="text-center py-8">
      <p class="text-gray-500">コメントはまだありません。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InquiryComment } from '~/composables/types/Inquiry';

const { comments } = defineProps<{
  comments: InquiryComment[]
}>()

const emit = defineEmits<{
  edit: [{ id: number, content: string }]
  delete: [number]
}>()

const { user, isLogin } = useUserStore()

const isCreator = (email: string) => user.email === email

const editComment = (id: number, content: string) => {
  const payload = { id, content }
  emit('edit', payload)
}
</script>