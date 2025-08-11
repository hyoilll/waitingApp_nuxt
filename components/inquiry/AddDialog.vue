<template>
  <form @submit.prevent="handleSubmit($event.target as HTMLFormElement)" class="w-full bg-white rounded-lg mx-auto">
    <h1 class="text-2xl font-bold text-center mb-6 text-gray-900">新規作成</h1>

    <section class="space-y-5 mb-8 w-full">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
        <p class="px-3 py-2 bg-gray-100 rounded-md text-gray-600">{{ user.email }}</p>
      </div>
      <div>
        <label for="title" class="label-required block text-sm font-medium text-gray-700 mb-1">タイトル</label>
        <input id="title" name="title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label for="content" class="label-required block text-sm font-medium text-gray-700 mb-1">内容</label>
        <textarea id="content" name="content" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="6"></textarea>
      </div>
    </section>

    <div class="flex justify-center gap-3">
      <button type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" @click="$emit('close')">キャンセル</button>
      <button type="submit" class="px-4 py-2 text-white bg-indigo-600 rounded-md md:hover:bg-indigo-700">送信</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { NewInquiryPayload } from '~/composables/types/Inquiry';

const emit = defineEmits<{
  add: [NewInquiryPayload]
  close: []
}>()

const { user } = useUserStore()

const handleSubmit = (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const payload: NewInquiryPayload = {
    email: user.email,
    title: data.title as string,
    content: data.content as string,
    user_id: user.id
  }

  emit('add', payload)
}
</script>

<style scoped>
.label-required::after {
  content: '*';
  color: #ef4444;
  margin-left: 4px;
  /* text-red-500 */
}
</style>