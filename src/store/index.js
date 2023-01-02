import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("setToken") || ""
  },
  getters: {
    token: state => state.token
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("setToken", token);
    }
  }
});
