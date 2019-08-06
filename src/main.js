import Vue from "vue";
import App from "./App";
import router from "./router/index";

import "element-ui/lib/theme-chalk/index.css";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
