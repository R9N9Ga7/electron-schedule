import { postAuth } from '../services/auth.service.js';

export default {
  namespaced: true,
  state: {
    loginError: false,
    passwordError: false,
  },
  mutations: {
    toggleLoginError(state) {
      state.loginError = !state.loginError;
    },
    togglePasswordError(state) {
      state.passwordError = !state.passwordError;
    },
  },
  actions: {
    // TODO
    async auth({ commit }, body) {
      await postAuth(body);
    },
  },
};
