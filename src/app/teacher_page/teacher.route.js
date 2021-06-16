export default {
  path: '/teacher',
  name: 'teacher',
  meta: {
    header: 'Преподаватели',
  },
  component: () => import('./TeacherPage.vue'),
};
