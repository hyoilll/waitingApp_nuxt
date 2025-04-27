export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // closeModalの場合には何もしない
    if (error === CLOSE_MODAL) {
      return
    }
  }
})
