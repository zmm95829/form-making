
import store from "@/store";
/**
 * 获取token
 */
export function getToken() {
  const token = store.state.cofco.token;
  // console.log(token);
  // console.log(store.getters.cofco_token); //TODO:获取不到？？？getters得到一个空数组
  if (!token) {
    return store.dispatch("LoginCofcoByUsername");
  } else {
    return Promise.resolve();
  }
}
