import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Flux
//view ->  action -> mutation -> state -> getter -> view

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, { user }) {
      commit("setUser", user);
    },
  },
});
