<template>
  <DefineFormTemplate v-slot="{ id, label, type }">
    <div class="flex flex-col gap-1">
      <div class="flex gap-1">
        <label :for="id">{{ label }}</label>
        <span class="text-red-500">*</span>
      </div>

      <component
        :is="type ? 'input' : 'textarea'"
        :id
        :name="id"
        class="px-3 py-1 border rounded-md outline-none"
        v-bind="{ type: type || undefined, rows: !type ? 10 : undefined }"
        required />
    </div>
  </DefineFormTemplate>

  <form @submit.prevent="handleSubmit($event.target as HTMLFormElement)" class="w-full">
    <h1 class="font-bold text-xl text-center mb-5">新規作成</h1>

    <section class="flex flex-col gap-3 mb-5">
      <ReuseFormTemplate id="email" label="メールアドレス" type="email" />
      <ReuseFormTemplate id="title" label="タイトル" type="text" />
      <ReuseFormTemplate id="content" label="内容" />
    </section>

    <div class="flex justify-center gap-3">
      <button type="button" class="w-fit px-4 py-2 bg-gray-300 rounded-md" @click="$emit('close')">キャンセル</button>
      <button type="submit" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md">送信</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { NewInquiryPayload } from '~/composables/types/Inquiry';

const emit = defineEmits<{
  add: [NewInquiryPayload]
  close: []
}>()

const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate<{ id: string, label: string, type?: string }>()

const handleSubmit = (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const payload: NewInquiryPayload = {
    email: data.email as string,
    title: data.title as string,
    content: data.content as string,
  }

  emit('add', payload)
}
</script>