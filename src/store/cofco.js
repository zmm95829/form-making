import { login } from "@/api/cofco";
export default {
  state: {
    token: "",
    username: "oatest01",
    password: "111111"
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    LoginCofcoByUsername(context) {
      return login(context.state.username, context.state.password).then(
        res => {
          const token = res.data.result;
          context.commit("SET_TOKEN", token);
        });
    }
  }
}
