<script setup lang="ts"></script>

<template>
  <div class="help-page">
    <h1 class="text-2xl font-bold mb-6">Help & FAQ</h1>
    <div class="grid gap-6">
      <VaCard>
        <VaCardTitle>Frequently Asked Questions</VaCardTitle>
        <VaCardContent>
          <VaAccordion>
            <VaCollapse>
              <template #header>
                <div class="font-semibold">How do I get started?</div>
              </template>
              <div class="p-4">
                Getting started is easy! Simply navigate to the dashboard and
                begin creating your projects. You can add tasks, set deadlines,
                and collaborate with team members.
              </div>
            </VaCollapse>

            <VaCollapse>
              <template #header>
                <div class="font-semibold">How do I invite team members?</div>
              </template>
              <div class="p-4">
                To invite team members, go to your project settings and click on
                the "Invite Members" button. Enter their email addresses and
                they'll receive an invitation to join.
              </div>
            </VaCollapse>

            <VaCollapse>
              <template #header>
                <div class="font-semibold">How do I track progress?</div>
              </template>
              <div class="p-4">
                You can track progress through the dashboard's progress
                indicators, task completion status, and project timelines. The
                dashboard provides a comprehensive overview of all your projects
                and tasks.
              </div>
            </VaCollapse>
          </VaAccordion>
        </VaCardContent>
      </VaCard>

      <VaCard>
        <VaCardTitle>Contact Support</VaCardTitle>
        <VaCardContent>
          <div class="space-y-4">
            <p class="text-gray-600">
              Need additional help? Our support team is here for you.
            </p>
            <VaInput v-model="subject" label="Subject" />
            <VaInput v-model="message" label="Message" type="textarea" />
            <VaButton color="primary"> Send Message </VaButton>
          </div>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
</template>

<script lang="ts">
const subject = ref('')
const message = ref('')
</script>
