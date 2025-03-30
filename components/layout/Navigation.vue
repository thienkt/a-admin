<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useColors } from 'vuestic-ui';
import { storeToRefs } from 'pinia';
import VaIconMenuCollapsed from '@/components/icons/VaIconMenuCollapsed.vue';
import { useGlobalStore } from '@/stores/global';
import { navigationRoutes } from '@/constants';

const { isSidebarMinimized } = storeToRefs(useGlobalStore());

const router = useRouter();
const route = useRoute();

const { getColor } = useColors();
const collapseIconColor = computed(() => getColor('secondary'));

// Generate breadcrumb items based on current route
const breadcrumbItems = computed(() => {
  const items = [];

  // Find the matching route in navigation routes
  const currentRouteName = route.name?.toString() || '';
  const matchedRoute = navigationRoutes.routes.find(
    (r) => r.name === currentRouteName,
  );

  if (matchedRoute) {
    items.push({
      label: matchedRoute.displayName,
      to: { name: matchedRoute.name },
      hasChildren: !!matchedRoute.children,
    });

    // If there are child routes and one is active, add it
    if (matchedRoute.children) {
      const activeChild = matchedRoute.children.find(
        (child) => route.name === child.name || route.path.endsWith(child.name),
      );

      if (activeChild) {
        items.push({
          label: activeChild.displayName,
          to: { name: activeChild.name },
          hasChildren: false,
        });
      }
    }
  }

  return items;
});

const handleBreadcrumbClick = (item) => {
  if (!item.hasChildren) {
    router.push(item.to);
  }
};
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
          v-for="item in breadcrumbItems"
          :key="item.label"
          :label="item.label"
          :to="item.hasChildren ? null : item.to"
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
