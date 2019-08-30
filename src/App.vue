<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // 在页面加载时读取localStorage里的状态信息
    const project = localStorage.getItem("project");
    if (project) {
      this.$store.commit("SET_PROJECT_PAGE", JSON.parse(project));
    }

    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("project", JSON.stringify(this.$store.state.system.project))
    })
  }
};
</script>

<style>
@import "./style/index.css";
@import "./style/iconfont/iconfont.css";
</style>
