<script lang="ts" setup>
import { computed } from 'vue';
import { VaCard, VaCardContent } from 'vuestic-ui';

const props = defineProps<{
  title: string;
  value: string | number;
  changeText: string;
  up: boolean;
  iconBackground: string;
  iconColor: string;
}>();

const changeClass = computed(() => ({
  'text-success': props.up,
  'text-red-600': !props.up,
}));
</script>

<template>
  <VaCard>
    <VaCardContent>
      <section>
        <header class="flex items-center justify-between">
          <div class="text-lg font-semibold grow">{{ value }}</div>
          <div
            class="p-1 rounded"
            :style="{
              backgroundColor: iconBackground,
              color: iconColor,
            }"
          >
            <slot name="icon" />
          </div>
        </header>
        <div>
          <p class="mb-2">{{ title }}</p>
          <p class="text-xs text-secondary">
            <span v-if="changeText" :class="changeClass">
              <template v-if="up">↑</template>
              <template v-else>↓</template>
              {{ changeText }}
            </span>
          </p>
        </div>
      </section>
    </VaCardContent>
  </VaCard>
</template>
