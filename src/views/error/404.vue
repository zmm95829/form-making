<template>
  <div>
    <p>该页面不存在，请检查路由！</p>
    <router-link :to="{path: '/home'}">返回首页</router-link>
  </div>
</template>
<script>
export default {
  name: "ErrorPage",
  data: function() {
    return {

    }
  }
};
</script>
<style scoped>
</style>