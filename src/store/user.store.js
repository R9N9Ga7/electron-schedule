export default {
  namespaced: true,
  state: {
    user: {
      auth: true,
    },
  },
  getters: {
    auth: state => state.user.auth,
  },
};
