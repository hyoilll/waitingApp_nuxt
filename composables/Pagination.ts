export function usePagination<T>(items: MaybeRef<T[]>, limit = 10) {
  const currentPage = ref(1)
  const LIMIT = limit
  const totalPages = computed(() => Math.ceil(toValue(items).length / LIMIT))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * LIMIT
    const end = start + LIMIT
    return toValue(items).slice(start, end)
  })

  function goToPage(page: number) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    LIMIT,

    goToPage,
  }
}