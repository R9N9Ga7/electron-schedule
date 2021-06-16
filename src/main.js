import Vue from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.scss';
import App from './App.vue';
import router from './router';
import store from './store';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import './app/shared/styles/index.scss';

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
