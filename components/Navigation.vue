<template>
  <nav class="bg-blue-600 text-white p-4 shadow-md">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-2xl font-bold">CV Review</NuxtLink>
          <div class="hidden md:flex space-x-4">
            <NuxtLink to="/" class="hover:text-blue-200">Home</NuxtLink>
            <NuxtLink to="/dashboard" class="hover:text-blue-200">Dashboard</NuxtLink>
            <NuxtLink to="/review" class="hover:text-blue-200">Review</NuxtLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Sign In</button>
          <button class="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu (hidden by default) -->
      <div class="md:hidden mt-4 hidden">
        <div class="flex flex-col space-y-2">
          <NuxtLink to="/" class="hover:text-blue-200">Home</NuxtLink>
          <NuxtLink to="/dashboard" class="hover:text-blue-200">Dashboard</NuxtLink>
          <NuxtLink to="/review" class="hover:text-blue-200">Review</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// We can add mobile menu toggle logic here later
</script> 