<script lang="ts" setup>
import { useBreakpoint } from 'vuestic-ui'
import LogoIcon from '~/assets/images/logo.svg'
const breakpoint = useBreakpoint()
</script>

<template>
  <VaLayout v-if="breakpoint.mdUp" class="h-screen">
    <template #left>
      <div
        class="bg-primary h-full flex flex-col items-center justify-center"
        style="width: 35vw"
      >
        <LogoIcon class="h-20 mb-10 text-white" />
      </div>
    </template>
    <template #content>
      <main
        class="h-full flex items-center justify-center mx-auto max-w-[420px]"
      >
        <slot />
      </main>
    </template>
  </VaLayout>

  <VaLayout v-else class="h-screen">
    <template #content>
      <div class="p-4">
        <main
          class="h-full flex flex-row items-center justify-start mx-auto max-w-[420px]"
        >
          <div class="flex flex-col items-start">
            <div class="my-10 flex flex-col items-center justify-center w-full">
              <LogoIcon class="h-16 w-auto text-primary" />
            </div>
            <slot />
          </div>
        </main>
      </div>
    </template>
  </VaLayout>
</template>
