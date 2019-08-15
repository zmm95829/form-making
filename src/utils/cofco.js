
import store from "@/store";

/**
 * 获取token
 */
export function getToken() {
  const token = store.getters.cofco_token;
  console.log(store);
  console.log(store.getters);
  console.log(store.getters.cofco_token);
  if (!token) {
    return store.dispatch("LoginCofcoByUsername");
  } else {
    return Promise.resolve();
  }
}
