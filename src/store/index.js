import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    session: {
      logged: false,
      token: "",
    },
  },
  getters: {
    logged: (state) => state.session.logged,
    token: (state) => state.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
});
