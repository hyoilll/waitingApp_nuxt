<template>
  <SeperateLine />

  <ul>
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex flex-col gap-2 border-b-2 border-gray-300 py-4">
      <div class="flex justify-between">
        <span class="font-bold text-lg">{{ comment.email }}</span>
        <span class="text-sm text-gray-500">{{ $dayjs(comment.created_at).format(DATE_FORMAT) }}</span>
      </div>
      <p>{{ comment.content }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
const comments = ref([
  {
    id: 1,
    email: 'test1@test.com',
    content: 'This is a comment.',
    created_at: '2023-10-01T12:00:00Z',
  },
  {
    id: 2,
    email: 'test2@test.com',
    content: 'Another comment here.',
    created_at: '2023-10-02T12:00:00Z',
  },
  {
    id: 3,
    email: 'test3@test.com',
    content: 'This is a comment.',
    created_at: '2023-10-03T12:00:00Z',
  },
  {
    id: 4,
    email: 'test4@test.com',
    content: 'Another comment here.',
    created_at: '2023-10-04T12:00:00Z',
  },

])
</script>