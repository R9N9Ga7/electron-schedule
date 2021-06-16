import { getScheduleCheck } from '../layouts/components/notification.service';

export default {
  namespaced: true,
  state: {
    groups: [],
    notification: [],
    settings: {
      window: 1,
      max_five: 0,
      min_two: 0,
      schedule_require: 0,
    },
    groupsForErrors: [],
  },
  mutations: {
    setGroups(state, groups) {
      state.groups = groups;
    },
    setGroupsForErrors(state, arr) {
      state.groupsForErrors = arr;
    },
    setNofitications(state, arr) {
      state.notification = arr;
    },
    toggleSettingsWindow(state) {
      if (state.settings.window == 0) {
        state.settings.window = 1;
      } else {
        state.settings.window = 0;
      }
      localStorage.setItem('window', state.settings.window);
    },
    toggleSettingsMaxFive(state) {
      if (state.settings.max_five == 0) {
        state.settings.max_five = 1;
      } else {
        state.settings.max_five = 0;
      }
      localStorage.setItem('max_five', state.settings.max_five);
    },
    toggleSettingsMinTwo(state) {
      if (state.settings.min_two == 0) {
        state.settings.min_two = 1;
      } else {
        state.settings.min_two = 0;
      }
      localStorage.setItem('min_two', state.settings.min_two);
    },
    toggleSettingsScheduleRequire(state) {
      if (state.settings.schedule_require == 0) {
        state.settings.schedule_require = 1;
      } else {
        state.settings.schedule_require = 0;
      }
      localStorage.setItem('schedule_require', state.settings.schedule_require);
    },
    setSettingsWindow(state, value) {
      state.settings.window = value;
    },
    setSettingsMaxFive(state, value) {
      state.settings.max_five = value;
    },
    setSettingsMinTwo(state, value) {
      state.settings.min_two = value;
    },
    setSettingsScheduleRequire(state, value) {
      state.settings.schedule_require = value;
    },
  },
  actions: {
    async recieveScheduleCheck({ commit, state }) {
      const payload = state.settings;
      payload.groups_id = state.groups;
      const data = await getScheduleCheck(payload);
      commit('setNofitications', data.message);
    },
    async recieveScheduleCheckAll({ state }) {
      const payload = state.settings;
      payload.groups_id = [...state.groupsForErrors].map((el) => el.ID);
      const data = await getScheduleCheck(payload);
      return data.message;
    },
  },
};
