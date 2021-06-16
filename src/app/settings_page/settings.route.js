export default {
  path: '/settings',
  name: 'settings',
  meta: {
    header: 'Настройки',
  },
  component: () => import('./SettingsPage.vue'),
};
