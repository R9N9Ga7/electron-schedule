export default {
  path: '/extended',
  name: 'extended',
  meta: {
    header: 'Множественный режим',
  },
  component: () => import('./ExtendedPage.vue'),
};
