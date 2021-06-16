import { getSchedule } from '../services/schedule.service.js';
import sortingScheduleForTable from '../utils/sorting_schedule_for_table.js';

export default {
  namespaced: true,
  state: {
    schedule: [],
    scheduleCopy: [],
  },
  getters: {
    getScheduleOnGroup: (state) => (filter) => state.schedule.filter(el => el.group === filter),
    getSortedSchedule: () => (data) => sortingScheduleForTable(data),
  },
  mutations: {
    setSchedule(state, data) {
      state.schedule = data;
    },
    setScheduleCopy(state, data) {
      state.scheduleCopy = data;
    },
  },
  actions: {
    async recieveSchedule({ commit }) {
      const data = await getSchedule();
      commit('setSchedule', data);
      commit('setScheduleCopy', JSON.parse(JSON.stringify(data)));
    },
  },
};
