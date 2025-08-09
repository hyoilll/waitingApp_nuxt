<template>
  <nav v-if="totalPages > 1" aria-label="Pagination">
    <ul class="flex items-center justify-center gap-2">
      <!-- Previous Button -->
      <li>
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-left" />
        </button>
      </li>

      <!-- Page Numbers -->
      <li v-for="page in pages" :key="page.name">
        <button
          v-if="page.name !== '...'"
          :disabled="page.isDisabled"
          @click="changePage(+page.name)"
          :class="{
            'bg-indigo-600 text-white': +page.name === currentPage,
            'bg-white text-gray-700 hover:bg-gray-50': +page.name !== currentPage
          }"
          class="px-4 py-2 rounded-md font-medium border">
          {{ page.name }}
        </button>
        <span v-else class="px-4 py-2 text-gray-500">...</span>
      </li>

      <!-- Next Button -->
      <li>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-right" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { currentPage, totalPages, maxVisibleButtons = 7, } = defineProps<{
  currentPage: number
  totalPages: number
  /**
   * @default 7
   */
  maxVisibleButtons?: number
}>()

const emit = defineEmits<{
  changePage: [number]
}>();

//TODO: rangeを修正する必要がある。"..."を持ってるのがちょっと嫌だね
const pages = computed(() => {
  const range = [];

  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      range.push({ name: i.toString(), isDisabled: i === currentPage });
    }
    return range;
  }

  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  range.push({ name: '1', isDisabled: currentPage === 1 });

  if (startPage > 2) {
    range.push({ name: '...', isDisabled: true });
  }

  for (let i = startPage; i <= endPage; i++) {
    range.push({ name: i.toString(), isDisabled: i === currentPage });
  }

  if (endPage < totalPages - 1) {
    range.push({ name: '...', isDisabled: true });
  }

  range.push({ name: totalPages, isDisabled: currentPage === totalPages });

  return range;
});

const changePage = (page: number) => {
  if (page < 1 || page > totalPages || page === currentPage) {
    return
  }

  emit('changePage', page);
};
</script>
