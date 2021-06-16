import Vue from 'vue';
import VueRouter from 'vue-router';

import schedule from './app/schedule_page/schedule.route';
import settings from './app/settings_page/settings.route';
import extended from './app/extended_page/extended.route';
import teacher from './app/teacher_page/teacher.route';
import group from './app/group_page/group.route';
import auditory from './app/auditory_page/auditory.route';
import faculty from './app/faculty_page/faculty.route';
import department from './app/department_page/department.route';
import discipline from './app/discipline_page/discipline.route';
import errors from './app/errors_page/discipline.route';

Vue.use(VueRouter);

const routes = [
  schedule,
  settings,
  extended,
  teacher,
  group,
  auditory,
  faculty,
  department,
  discipline,
  errors,
  {
    path: '/auth',
    name: 'auth',
    meta: {
      layout: 'empty',
    },
    component: () => import('./views/auth_page/AuthPage.vue'),
  },
  {
    path: '/data',
    name: 'data',
    meta: {
      header: 'Данные',
    },
    component: () => import('./views/data_page/DataPage.vue'),
  },
  {
    path: '/chairs',
    name: 'chairs',
    meta: {
      header: 'Кафедры',
    },
    component: () => import('./views/chairs_page/ChairsPage.vue'),
  },
  {
    path: '/disciplines',
    name: 'disciplines',
    meta: {
      header: 'Дисциплины',
    },
    component: () => import('./views/disciplines_page/DisciplinesPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

function auth(to, from, next) {
  if (to.path !== '/auth' && !localStorage.getItem('scheduleToken')) {
    next('/auth');
  } else if (to.path === '/auth' && localStorage.getItem('scheduleToken')) {
    next('/');
  } else {
    next();
  }
}

router.beforeEach(auth);


export default router;
