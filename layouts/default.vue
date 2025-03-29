<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate } from 'vue-router';
import { useBreakpoint } from 'vuestic-ui';
import { useGlobalStore } from '@/stores/global';
import { useCurrentUser } from 'vuefire';

import LayoutNavigation from '@/components/layout/Navigation.vue';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const GlobalStore = useGlobalStore();
const breakpoints = useBreakpoint();

const sidebarWidth = ref('16rem');
const sidebarMinimizedWidth = ref('4.5rem');

const isMobile = ref(false);
const isTablet = ref(false);
const { isSidebarMinimized } = storeToRefs(GlobalStore);

const onResize = () => {
  isSidebarMinimized.value = breakpoints.mdDown;
  isMobile.value = breakpoints.smDown;
  isTablet.value = breakpoints.mdDown;
  sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem';
  sidebarWidth.value = isTablet.value ? '100%' : '16rem';
};

const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/');
    } else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect);
    }
  });

  window.addEventListener('resize', onResize);
  onResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

onBeforeRouteUpdate(() => {
  if (breakpoints.mdDown) {
    // Collapse sidebar after route change for Mobile
    isSidebarMinimized.value = true;
  }
});

const isFullScreenSidebar = computed(
  () => isTablet.value && !isSidebarMinimized.value,
);

const onCloseSidebarButtonClick = () => {
  isSidebarMinimized.value = true;
};
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 2 }"
    :left="{
      fixed: true,
      absolute: breakpoints.mdDown,
      order: 1,
      overlay: breakpoints.mdDown && !isSidebarMinimized,
    }"
    @left-overlay-click="isSidebarMinimized = true"
  >
    <template #top>
      <Navbar :is-mobile="isMobile" />
    </template>

    <template #left>
      <Sidebar
        :minimized="isSidebarMinimized"
        :animated="!isMobile"
        :mobile="isMobile"
      />
    </template>

    <template #content>
      <div
        :class="{ minimized: isSidebarMinimized }"
        class="app-layout__sidebar-wrapper"
      >
        <div v-if="isFullScreenSidebar" class="flex justify-end">
          <VaButton
            class="px-4 py-4"
            icon="md_close"
            preset="plain"
            @click="onCloseSidebarButtonClick"
          />
        </div>
      </div>
      <LayoutNavigation v-if="!isMobile" class="p-4" />
      <main class="p-4 pt-0">
        <article>
          <NuxtPage />
        </article>
      </main>
    </template>
  </VaLayout>
</template>

<style lang="css" scoped>
.va-sidebar {
  width: unset !important;
  min-width: unset !important;
}
</style>
