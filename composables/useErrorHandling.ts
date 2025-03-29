/**
 * Error handling composable for managing application errors
 */
export const useErrorHandling = () => {
  const { $throwError, $showError } = useNuxtApp();

  /**
   * Throw an error that will be caught by Nuxt's error page
   */
  const throwPageError = (statusCode: number, message: string) => {
    if ($throwError) {
      $throwError(statusCode, message);
    } else {
      throw createError({
        statusCode,
        message,
        fatal: true,
      });
    }
  };

  /**
   * Show an error toast without navigating to the error page
   */
  const showToastError = (message: string) => {
    if ($showError) {
      $showError(message);
    } else {
      console.error(message);
    }
  };

  /**
   * Handle API errors with appropriate actions
   */
  type ApiError = {
    message?: string;
    statusCode?: number;
  };

  const handleApiError = (
    error: ApiError,
    options = { showToast: true, throwError: false },
  ) => {
    console.error('API Error:', error);

    const message = (error as ApiError)?.message || 'An unknown error occurred';
    const statusCode = error?.statusCode || 500;

    if (options.showToast) {
      showToastError(message);
    }

    if (options.throwError) {
      throwPageError(statusCode, message);
    }

    return {
      message,
      statusCode,
    };
  };

  return {
    throwPageError,
    showToastError,
    handleApiError,
  };
};
