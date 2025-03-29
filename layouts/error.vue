<script setup lang="ts">
import LogoIcon from '~/assets/images/logo.svg';
</script>

<template>
  <div class="error-layout">
    <!-- Simplified header -->
    <header class="error-header">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <RouterLink
          to="/"
          class="flex items-center"
          aria-label="Return to home page"
        >
          <LogoIcon class="h-8 w-auto text-primary" />
        </RouterLink>
      </div>
    </header>

    <!-- Main content area -->
    <main class="error-content">
      <div class="container mx-auto px-4">
        <slot />
      </div>
    </main>

    <!-- Simple footer -->
    <footer class="error-footer">
      <div
        class="container mx-auto px-4 py-4 text-center text-gray-500 text-sm"
      >
        &copy; {{ new Date().getFullYear() }} My Assistant.ai - All rights
        reserved
      </div>
    </footer>
  </div>
</template>

<style scoped>
.error-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--va-background-element);
}

.error-header {
  background-color: var(--va-background-primary);
  border-bottom: 1px solid var(--va-background-border);
}

.error-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.error-footer {
  background-color: var(--va-background-secondary);
  border-top: 1px solid var(--va-background-border);
  margin-top: auto;
}
</style>
