export default {
  path: '/faculty',
  name: 'faculty',
  meta: {
    header: 'Факультеты',
  },
  component: () => import('./FacultyPage.vue'),
};
