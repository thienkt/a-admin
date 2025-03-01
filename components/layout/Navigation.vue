<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useColors } from 'vuestic-ui'
import { storeToRefs } from 'pinia'
import VaIconMenuCollapsed from '@/components/icons/VaIconMenuCollapsed.vue'
import { useGlobalStore } from '@/stores/global'

const { isSidebarMinimized } = storeToRefs(useGlobalStore())

const _router = useRouter()
const _route = useRoute()

type BreadcrumbNavigationItem = {
  label: string
  to: string
  hasChildren: boolean
}

const items = ref<Array<{ title: string; to: string; icon?: string }>>([
  // ... existing code ...
])

const { getColor } = useColors()

const collapseIconColor = computed(() => getColor('secondary'))

const handleBreadcrumbClick = (item: BreadcrumbNavigationItem) => {
  if (!item.hasChildren) {
    // router.push(item.to)
  }
}
</script>

<template>
  <div class="flex gap-2">
    <VaIconMenuCollapsed
      class="cursor-pointer"
      :class="{ 'x-flip': !isSidebarMinimized }"
      :color="collapseIconColor"
      @click="isSidebarMinimized = !isSidebarMinimized"
    />

    <nav class="flex items-center">
      <VaBreadcrumbs>
        <VaBreadcrumbsItem label="Home" :to="{ name: 'dashboard' }" />
        <VaBreadcrumbsItem
          v-for="item in items"
          :key="item.label"
          :label="item.label"
          @click="handleBreadcrumbClick(item)"
        />
      </VaBreadcrumbs>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.x-flip {
  transform: scaleX(-100%);
}
</style>
