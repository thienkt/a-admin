<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { signOut } from 'firebase/auth'
import { useModal, useToast } from 'vuestic-ui'
import { useCurrentUser } from 'vuefire'
import LogoIcon from '~/assets/images/logo.svg'

const auth = useFirebaseAuth()!

defineProps({
  isMobile: { type: Boolean, default: false },
})

const GlobalStore = useGlobalStore()

const { isSidebarMinimized } = storeToRefs(GlobalStore)

const user = useCurrentUser()
const { confirm } = useModal()
const { init } = useToast()

const onLogout = async () => {
  const agreed = await confirm({
    title: 'Logout',
    message: `Are you sure you want to logout?`,
    okText: 'Logout',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    logout()
  }
}

function logout() {
  signOut(auth)
    .then(() => {
      init({ message: 'Sign out successfully', color: 'success' })
    })
    .catch((_error) => {
      init({ message: 'Sign out failed', color: 'error' })
    })
}
</script>

<template>
  <VaNavbar class="app-layout-navbar py-2 px-0">
    <template #left>
      <div class="left">
        <Transition v-if="isMobile" name="icon-fade" mode="out-in">
          <VaIcon
            color="primary"
            :name="isSidebarMinimized ? 'menu' : 'close'"
            size="24px"
            style="margin-top: 3px"
            @click="isSidebarMinimized = !isSidebarMinimized"
          />
        </Transition>
        <RouterLink to="/" aria-label="Visit home page">
          <LogoIcon class="h-8 w-auto text-primary" />
        </RouterLink>
      </div>
    </template>
    <template #right>
      <div v-if="user" class="flex justify-end items-center">
        <VaAvatar :size="32" color="warning">
          <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" >
          <img
            v-else
            src="https://avatars.githubusercontent.com/u/125617854?s=200&v=4"
            alt="avatar"
          >
        </VaAvatar>
        <span class="leading-normal align-middle min-w-max ml-2 mr-1 text-lg">{{
          user.email
        }}</span>
        <VaButton preset="secondary" color="textPrimary" @click="onLogout">
          <VaIcon name="logout" size="large" />
        </VaButton>
      </div>
    </template>
  </VaNavbar>
</template>

<style lang="css" scoped>
.va-navbar {
  z-index: 2;
  color: var(--va-primary);
}

@media screen and (max-width: 950px) {
  .va-navbar .left {
    width: 100%;
  }

  .va-navbar .app-navbar__actions {
    display: flex;
    justify-content: space-between;
  }
}

.left {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.left > * {
  margin-right: 1rem;
}

.left > *:last-child {
  margin-right: 0;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: transform 0.5s ease;
}

.icon-fade-enter,
.icon-fade-leave-to {
  transform: scale(0.5);
}
</style>
