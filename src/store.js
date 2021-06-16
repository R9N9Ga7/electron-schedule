import Vue from 'vue';
import Vuex from 'vuex';

import authorization from './views/auth_page/store/auth.store';
import schedule from './app/schedule_page/schedule.store';
import settings from './app/settings_page/settings.store';
import extended from './app/extended_page/extended.store';
import nofitications from './store/nofitications.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorization,
    schedule,
    settings,
    extended,
    nofitications,
  },
});
