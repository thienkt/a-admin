<script setup lang="ts">
const email = ref('');
const displayName = ref('');
const emailNotifications = ref(true);
const pushNotifications = ref(true);
</script>

<template>
  <div class="settings-page">
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    <div class="grid gap-6">
      <VaCard>
        <VaCardTitle>Account Settings</VaCardTitle>
        <VaCardContent>
          <div class="space-y-4">
            <VaInput v-model="email" label="Email" type="email" />
            <VaInput v-model="displayName" label="Display Name" />
            <VaButton color="primary"> Save Changes </VaButton>
          </div>
        </VaCardContent>
      </VaCard>

      <VaCard>
        <VaCardTitle>Notifications</VaCardTitle>
        <VaCardContent>
          <div class="space-y-4">
            <VaCheckbox
              v-model="emailNotifications"
              label="Email Notifications"
            />
            <VaCheckbox
              v-model="pushNotifications"
              label="Push Notifications"
            />
          </div>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
</template>
