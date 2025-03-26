<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <main class="container mx-auto p-4">
      <NuxtPage />
    </main>
    <footer class="bg-gray-200 p-4 mt-8">
      <div class="container mx-auto text-center text-gray-600">
        CV Review Platform &copy; 2024
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navigation from '~/components/Navigation.vue';
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
</style>
