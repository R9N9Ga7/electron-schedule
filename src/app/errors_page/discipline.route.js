export default {
  path: '/errors',
  name: 'errors',
  meta: {
    header: 'Ошибки',
  },
  component: () => import('./ErrorsPage.vue'),
};
