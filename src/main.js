import Vue from "vue";
import App from "./App";
import router from "./router/index";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ace from "ace-builds";
import componentsInstall from "./components/install";

Vue.use(Element);
Vue.use(ace);
Vue.use(componentsInstall);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
