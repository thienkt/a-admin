<script setup lang="ts">
definePageMeta({
  layout: 'error',
});

const props = defineProps({
  error: {
    type: Object,
    default: () => null,
  },
});

const errorCode = computed(() => {
  return props.error?.statusCode || 500;
});

const errorMessage = computed(() => {
  switch (errorCode.value) {
    case 404:
      return 'Page not found';
    case 403:
      return 'Access forbidden';
    case 500:
      return 'Server error';
    default:
      return 'Something went wrong';
  }
});

// Handle returning to the application
const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <div class="error-page">
    <div class="flex flex-col items-center justify-center py-16">
      <div class="text-center">
        <h1 class="text-7xl font-bold text-primary mb-4">{{ errorCode }}</h1>
        <div class="text-xl mb-8">{{ errorMessage }}</div>

        <p v-if="errorCode !== 404" class="text-gray-600 mb-8">
          An error occurred while processing your request.
          <span v-if="error?.message" class="block mt-2 font-mono text-sm">
            {{ error.message }}
          </span>
        </p>

        <p v-else class="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div class="flex gap-4 justify-center">
          <VaButton color="primary" @click="handleError">
            <VaIcon name="home" class="mr-2" />
            Back to Home
          </VaButton>

          <VaButton color="secondary" @click="() => window.history.back()">
            <VaIcon name="arrow_back" class="mr-2" />
            Go Back
          </VaButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
