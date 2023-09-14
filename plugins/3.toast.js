export default defineNuxtPlugin(nuxtApp => {
  const {$randomId} = useNuxtApp()
  const toastStore = useToastStore()

  /**
   * Alerts the user with an message. Often used to feedback whether an action performed is successful or not.
   * @param {boolean} status - true = successful, false = failed
   * @param {string} message - The message to show.
   * @param {duration} [duration=3000] - How long to show in miliseconds.
   */
  const toast = (status, message, duration = 3000) => {
      toastStore.new({
        id: $randomId(),
        status: status,
        message: message,
        duration: duration
      })
  }

  return {
    provide: {
      toast
    }
  };
});
