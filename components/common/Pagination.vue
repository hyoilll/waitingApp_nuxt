<template>
  <nav v-if="totalPages > 1" aria-label="Pagination">
    <ul class="flex items-center justify-center gap-2">
      <!-- Go to First Button -->
      <li>
        <button
          :disabled="currentPage === 1"
          @click="changePage(1)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white md:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-double-left" />
        </button>
      </li>
      <!-- Previous Button -->
      <li>
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white md:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-left" />
        </button>
      </li>

      <!-- Page Numbers -->
      <li v-for="page in pages" :key="page.page">
        <button
          v-if="page.isVisible"
          :disabled="page.isDisabled"
          @click="changePage(page.page)"
          :class="{
            'bg-indigo-600 text-white': page.page === currentPage,
            'bg-white text-gray-700 md:hover:bg-gray-50': page.page !== currentPage
          }"
          class="px-4 py-2 rounded-md font-medium border">
          {{ page.page }}
        </button>
        <span v-else class="px-4 py-2 text-gray-500">...</span>
      </li>

      <!-- Next Button -->
      <li>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white md:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-right" />
        </button>
      </li>
      <!-- Go to Last Button -->
      <li>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(totalPages)"
          class="px-3 py-2 rounded-md text-gray-600 bg-white md:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border">
          <Icon name="mdi:chevron-double-right" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface PageItem {
  page: number;
  isDisabled: boolean;
  isVisible: boolean;
}

const { currentPage, totalPages, maxVisibleButtons = 7 } = defineProps<{
  currentPage: number
  totalPages: number
  /**
   * 表示されるページネーションの最大数
   * @default 7
   */
  maxVisibleButtons?: number
}>()

const emit = defineEmits<{
  changePage: [number]
}>();

const pages = computed<PageItem[]>(() => {
  const range: PageItem[] = [];

  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      range.push({ page: i, isDisabled: i === currentPage, isVisible: true });
    }
    return range;
  }

  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  // First page
  range.push({ page: 1, isDisabled: currentPage === 1, isVisible: true });

  // Ellipsis at the start
  if (startPage > 2) {
    range.push({ page: -1, isDisabled: true, isVisible: false }); // placeholder page -1 for ellipsis
  }

  // Visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    range.push({ page: i, isDisabled: i === currentPage, isVisible: true });
  }

  // Ellipsis at the end
  if (endPage < totalPages - 1) {
    range.push({ page: -2, isDisabled: true, isVisible: false }); // placeholder page -2 for ellipsis
  }

  // Last page
  range.push({ page: totalPages, isDisabled: currentPage === totalPages, isVisible: true });

  return range;
});

const changePage = (page: number) => {
  if (page < 1 || page > totalPages || page === currentPage) {
    return
  }

  emit('changePage', page);
};
</script>
