<template>
  <dialog
    :id
    ref="dialogRef"
    @mousedown="handleOutSideClick($event)"
    class="min-w-[100px] min-h-[100px] w-[50%] rounded-md shadow-lg p-4">
    <section class="h-full flex items-center justify-center">
      <slot />
    </section>
  </dialog>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  close: []
}>()

const dialogRef = useTemplateRef('dialogRef')

const handleOutSideClick = (event: MouseEvent) => {
  if (!dialogRef.value) {
    return
  }

  const rect = dialogRef.value.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

  const target = event.target as HTMLElement | null;
  if (!isInDialog && target?.id === id) {
    emit('close')
    dialogRef.value.close()
  }
}

onMounted(() => {
  dialogRef.value?.showModal()
})
</script>

<style lang="css" scoped>
/* TODO: 表示・非表示時にtransitionを入れる。 */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}

/* dialog {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
</style>