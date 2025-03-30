<script setup lang="ts">
import { useCurrentUser } from 'vuefire';

const user = useCurrentUser();
const fullName = ref('');
const bio = ref('');
</script>

<template>
  <h1
    class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
  >
    Profile
  </h1>
  <section class="flex flex-col gap-4">
    <VaCard class="w-full">
      <VaCardTitle class="flex items-start justify-between">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Personal Information
        </h2>
      </VaCardTitle>
      <VaCardContent>
        <div class="flex items-center space-x-6 mb-6">
          <VaAvatar size="large">
            <img
              v-if="user?.photoURL"
              :src="user.photoURL"
              alt="Profile picture"
            >
            <img
              v-else
              src="https://avatars.githubusercontent.com/u/125617854?s=200&v=4"
              alt="Default avatar"
            >
          </VaAvatar>
          <div>
            <h2 class="text-xl font-semibold">
              {{ user?.displayName || 'User' }}
            </h2>
            <p class="text-gray-600">{{ user?.email }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <VaInput v-model="fullName" label="Full Name" />
          <VaInput v-model="bio" label="Bio" type="textarea" />
          <VaButton color="primary"> Update Profile </VaButton>
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard class="w-full">
      <VaCardTitle class="flex items-start justify-between">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Account Statistics
        </h2>
      </VaCardTitle>
      <VaCardContent>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold">12</div>
            <div class="text-gray-600">Projects</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold">48</div>
            <div class="text-gray-600">Tasks</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold">89%</div>
            <div class="text-gray-600">Completion Rate</div>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </section>
</template>
