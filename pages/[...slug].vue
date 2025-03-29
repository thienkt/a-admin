<script setup lang="ts">
definePageMeta({
  layout: 'error',
});

// Set page title
useHead({
  title: 'Page Not Found',
});
</script>

<template>
  <div class="not-found-page">
    <div class="flex flex-col items-center justify-center py-16">
      <div class="text-center">
        <h1 class="text-7xl font-bold text-primary mb-4">404</h1>
        <div class="text-xl mb-8">Oops! Page not found</div>
        <p class="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <VaButton color="primary" to="/dashboard" replace>
          <VaIcon name="home" class="mr-2" />
          Back to Dashboard
        </VaButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
