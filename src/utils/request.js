import axios from "axios";
import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: "http://114.115.235.188:8001/services/ctbms/api", // api 的 base_url
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = store.state.cofco.token;
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  // when fulfilled, do not touch response
  undefined,
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  // rejected, display error message if not handled
  error => {
    // console.log(error); // for debug
    // const baseURL = error.config.baseURL;
    // const url = error.config.url;
    // const moduleApi = url.replace(baseURL, "");
    // console.log(error.response.status);
    // if (error.response.status === 403 || error.response.status === 401) {
    //   MessageBox({
    //     message: "登录失效，或者您没有权限，请重新登录",
    //     type: "error",
    //     title: "错误",
    //     showClose: true,
    //     confirmButtonText: "重新登录"
    //   }).then(() => {
    //     store.dispatch("LogOut").then(() => {
    //       if (store.getters.origin === "sso") {
    //         window.location.replace(process.env.COFCO_PORTAL);
    //       } else {
    //         location.href = "/#/login?redirect=" + window.location.hash.replace("#", "");
    //       }
    //     });
    //   }).catch(e => {
    //     console.log(e);
    //     console.log("stay in the page");
    //   });
    // } else {
    //   if ((error.response !== undefined ? (error.response.data !== undefined ? (error.response.data.errorInfo ? error.response.data.errorInfo.message : error.response.data.errorMessage) : "") : "") === "error.gateway.filter") {
    //     MessageBox({
    //       message: "用户令牌验证失败，请重新登录",
    //       type: "error",
    //       title: "错误",
    //       showClose: true,
    //       confirmButtonText: "重新登录"
    //     }).then(() => {
    //       store.dispatch("LogOut").then(() => {
    //         if (store.getters.origin === "sso") {
    //           window.location.replace(process.env.COFCO_PORTAL);
    //         } else {
    //           location.href = "/#/login?redirect=" + window.location.hash.replace("#", "");
    //         }
    //       });
    //     });
    //   } else {
    //     MessageBox({
    //       message: "模块【" + getModuleName(moduleApi) + "】错误，错误信息：" + (error ? (error.message +
    //               "【" + (error.response !== undefined ? (error.response.data !== undefined ? (error.response.data.errorInfo ? error.response.data.errorInfo.message : error.response.data.errorMessage) : "") : "") +
    //               "】") : ""),
    //       type: "error",
    //       title: "错误"
    //     }).then(() => {
    //       console.log("====");
    //     });
    //   }
    // }
    return Promise.reject(error);
  }
);

export default service;
