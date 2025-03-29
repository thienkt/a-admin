// plugins/error-handler.ts
export default defineNuxtPlugin(() => {
  /**
   * Utility to create and throw application errors
   */
  const throwError = (statusCode: number, message: string) => {
    throw createError({
      statusCode,
      message,
      fatal: true,
    });
  };

  /**
   * Show error with toast notification
   */
  const showError = (message: string) => {
    try {
      const toast = useToast();
      if (toast && toast.init) {
        toast.init({
          message,
          color: 'danger',
        });
      }
    } catch (err) {
      console.error('Error showing toast:', err);
    }
  };

  return {
    provide: {
      throwError,
      showError,
    },
  };
});
