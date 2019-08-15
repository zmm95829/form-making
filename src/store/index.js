import Vue from "vue";
import Vuex from "vuex";
import cofco from "./cofco";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    cofco
  },
  getters: {
    cofco_token: store => store.cofco.token
  }
});

export default store;
