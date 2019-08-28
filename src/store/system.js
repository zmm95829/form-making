import Vue from "vue"
export default {
  state: {
    project: {
      name: "cofco",
      page: "form"
    },
    select: {}
  },
  mutations: {
    SET_PROJECT_PAGE: (state, project) => {
      Vue.nextTick(() => {
        state.project.name = project.name;
        state.project.page = project.page;
      });
    },
    SET_SELECT: (state, select) => {
      state.select = select;
    }
  },
  actions: {
  }
}
