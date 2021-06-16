import getSchedule from './services/get_schedule.service';

export default {
  namespaced: true,
  state: {
    discipline: '',
    schedules: [],
    key: 0,
  },
  mutations: {
    setDiscipline(state, payload) {
      state.discipline = payload;
    },
    setSchedules(state, arr) {
      state.schedules = arr;
    },
    incrementKey(state) {
      state.key += 1;
    },
  },
  actions: {
    async recieveSchedule({ commit, state, dispatch }, groups_id) {
      commit('nofitications/setGroups', groups_id, { root: true });
      dispatch('nofitications/recieveScheduleCheck', null, {root: true});
      const payload = {
        groups_id,
      };
      if (state.discipline) {
        payload.discipline_id = state.discipline.ID;
      }
      const schedules = await getSchedule(payload);
      commit('setSchedules', schedules.message.schedules);
      commit('incrementKey');
    },
  },
};
