<template>
  <section class="flex gap-3 items-center">
    <h1 class="font-bold text-xl">Inquiry</h1>
    <button type="button" class="w-fit px-4 py-2 text-white bg-blue-600 rounded-md">新規作成</button>
  </section>

  <section class="w-[90%] mx-auto pt-10">
    <input
      v-model="searchInquiry"
      type="text"
      placeholder="Search inquiries..."
      class="w-full px-4 py-2 border rounded-md outline-none" />
  </section>

  <section class="w-[90%] mx-auto py-10">
    <ul>
      <li
        v-for="inquiry in shownInquirys"
        :key="inquiry.id"
        class="p-4 hover:bg-gray-300 rounded-md cursor-pointer">
        <div>
          <h2 class="font-bold text-lg">{{ inquiry.title }}</h2>
          <p class="text-sm text-gray-500">Status: {{ inquiry.status }}</p>
          <p class="text-sm text-gray-500">Created at: {{ inquiry.createdAt }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const searchInquiry = ref('')
const debounced = refDebounced(searchInquiry, 500)
const shownInquirys = computed(() => inquirys.value.filter((inquiry) => inquiry.title.includes(debounced.value)))
const inquirys = ref([
  {
    id: 1,
    title: 'Inquiry about product A',
    status: 'open',
    createdAt: '2023-10-01',
  },
  {
    id: 2,
    title: 'Inquiry about product B',
    status: 'closed',
    createdAt: '2023-10-02',
  },
  {
    id: 3,
    title: 'Inquiry about product A',
    status: 'open',
    createdAt: '2023-10-01',
  },
  {
    id: 4,
    title: 'Inquiry about product B',
    status: 'closed',
    createdAt: '2023-10-02',
  }, {
    id: 5,
    title: 'Inquiry about product A',
    status: 'open',
    createdAt: '2023-10-01',
  },
  {
    id: 6,
    title: 'Inquiry about product B',
    status: 'closed',
    createdAt: '2023-10-02',
  },

])
</script>