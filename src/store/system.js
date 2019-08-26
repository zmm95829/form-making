export default {
  state: {
    project: {
      name: "cofco",
      page: "form"
    },
    page: "form"
  },
  mutations: {
    SET_PROJECT_PAGE: (state, project, page) => {
      state.project.name = project;
      state.project.page = page;
    }
  },
  actions: {
    setProjectAndPage(context, project, page) {
      context.commit("SET_PROJECT_PAGE", project, page);
    }
  }
}
