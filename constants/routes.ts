export interface INavigationRoute {
  name: string
  displayName: string
  meta?: { icon: string }
  children?: INavigationRoute[]
}

export const navigationRoutes: {
  root: INavigationRoute
  routes: INavigationRoute[]
} = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      meta: {
        icon: 'dashboard',
      },
    },
    {
      name: 'profile',
      displayName: 'Profile',
      meta: {
        icon: 'person',
      },
    },
    {
      name: 'settings',
      displayName: 'Settings',
      meta: {
        icon: 'settings',
      },
    },
    {
      name: 'help',
      displayName: 'Help & FAQ',
      meta: {
        icon: 'help',
      },
    },
  ],
}
