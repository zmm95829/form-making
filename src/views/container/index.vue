<template>
  <div class="Container">
    <header class="header"></header>
    <nav class="nav"></nav>
    <footer class="footer"></footer>
    <aside class="aside-left">
      <FormElement />
    </aside>
    <aside class="aside-right">
      <FormConfig :form-config="data.formConfig" :select="data.selectItem" />
    </aside>
    <section class="section">
      <el-container style="width: 100%; height: 100%;">
        <el-header height="40px">
          <form-action :data="data.formElements" :form-config="data.formConfig" />
        </el-header>
        <el-main>
          <FormView
            :form-config="data.formConfig"
            :data="data.formElements"
            :select.sync="data.selectItem"
          />
        </el-main>
      </el-container>
    </section>
  </div>
</template>
<script>
import FormElement from "./FormElement";
import FormAction from "./FormAction";
import FormView from "./FormView.vue";
import FormConfig from "./FormConfig.vue";
import formConfig from "./formConfig.js";
export default {
  name: "Container",
  components: {
    FormElement,
    FormView,
    FormConfig,
    FormAction
  },
  data: function() {
    return {
      data: {
        formElements: {
          list: []
        },
        formConfig,
        selectItem: {}
      }
    }
  }
};
</script>
<style>
.header {
  /* background-color: yellow; */
  border-bottom: 1px solid orange;
  width: 100%;
  height: 120px;
}
.nav {
  background-color: red;
}
.footer {
  border-top: 1px solid orange;
  /* background-color: orange; */
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 80px;
}
.aside-left {
  border-right: 1px solid blue;
  /* background-color: blue; */
  position: fixed;
  left: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 260px;
}
.aside-right {
  border-left: 1px solid blue;
  /* background-color: blue; */
  position: fixed;
  right: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 300px;
  overflow: auto;
}
.section {
  /* background-color: green; */
  border: 1px solid green;
  width: calc(100% - 562px);
  height: calc(100% - 202px);
  position: fixed;
  top: 120px;
  left: 260px;
  overflow-y: auto;
}
.el-header {
  padding: 3px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
.el-main {
  padding: 10px;
}
</style>
