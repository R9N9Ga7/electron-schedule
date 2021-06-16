import getSemesters from '../shared/services/get_semesters.service';

export default {
  namespaced: true,
  state: {
    semesters: [],
  },
  mutations: {
    setSemesters(state, arr) {
      state.semesters = arr;
    },
  },
  actions: {
    async recieveSemesters({ commit }) {
      const data = await getSemesters();

      commit('setSemesters', data.message);
    },
  },
};
