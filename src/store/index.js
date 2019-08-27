import Vue from "vue";
import Vuex from "vuex";
import cofco from "./cofco";
import system from "./system";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    cofco,
    system
  },
  getters: {
    cofco_token: store => store.cofco.token,
    system_project: store => store.system.project,
    system_select: store => store.system.select
  }
});

export default store;
