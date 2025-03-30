<script setup lang="ts">
const email = ref('');
const displayName = ref('');
const emailNotifications = ref(true);
const pushNotifications = ref(true);
</script>

<template>
  <h1
    class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
  >
    Settings
  </h1>
  <section class="flex flex-col gap-4">
    <VaCard class="w-full">
      <VaCardTitle class="flex items-start justify-between">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Account Settings
        </h2>
      </VaCardTitle>
      <VaCardContent>
        <div class="space-y-4">
          <VaInput v-model="email" label="Email" type="email" />
          <VaInput v-model="displayName" label="Display Name" />
          <VaButton color="primary"> Save Changes </VaButton>
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard class="w-full">
      <VaCardTitle class="flex items-start justify-between">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Notifications
        </h2>
      </VaCardTitle>
      <VaCardContent>
        <div class="space-y-4">
          <VaCheckbox
            v-model="emailNotifications"
            label="Email Notifications"
          />
          <VaCheckbox v-model="pushNotifications" label="Push Notifications" />
          <div class="mt-4">
            <VaButton color="primary"> Save Preferences </VaButton>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </section>
</template>
