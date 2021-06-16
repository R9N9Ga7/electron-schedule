export default {
  path: '/department',
  name: 'department',
  meta: {
    header: 'Кафедры',
  },
  component: () => import('./DepartmentPage.vue'),
};
