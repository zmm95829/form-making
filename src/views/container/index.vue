<template>
<el-container class="container-layout">
  <el-header>Header</el-header>
  <el-main class="layout-center">
    <el-container>
      <el-aside width="262px" class="layout-left">
        <FormElement />
      </el-aside>
      <el-main class="layout-main">
        <el-container style="width: 100%; height: 100%;">
          <el-header height="40px" style="display: flex; justify-content: space-between;">
            <el-button type="text" @click="handleProjectChange">修改项目</el-button>
            <form-action
              :data="data.formElements"
              :form-config="data.formConfig"
              @select-empty="handleEmpty"
            />
          </el-header>
          <el-main style="padding: 4px;">
            <FormView
              :form-config="data.formConfig"
              :data="data.formElements"
              :select.sync="data.selectItem"
            />
          </el-main>
        </el-container>
      </el-main>
      <el-aside width="300px" class="layout-right">
        <FormConfig :form-config="data.formConfig" :select="data.selectItem" />
      </el-aside>
    </el-container>
  </el-main>
  <el-footer>footer</el-footer>
</el-container>
</template>
<script>
import {mapGetters} from "vuex";
import FormElement from "./FormElement";
import FormAction from "./FormAction";
import FormView from "./components/MainView";
import FormConfig from "./FormConfig.vue";
import formConfig from "./formConfig.js";
import { MyDialog, ProjectConfig } from "@/components/index.js";
export default {
  name: "Container",
  components: {
    FormElement,
    FormView,
    FormConfig,
    FormAction,
    MyDialog,
    ProjectConfig
  },
  data: function() {
    return {
      data: {
        formElements: {
          list: []
        },
        formConfig,
        selectItem: {},
      },
        visible: false
    }
  },
  computed: {
    ...mapGetters(["system_project"])
  },
  methods: {
    handleEmpty: function() {
      this.selectItem = {};
    },
    handleProjectChange: function() {
      this.visible = true;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.system_project.name !== to.params.name || vm.system_project.page !== to.params.page) {
        vm.$router.replace({
          name: "页面不存在"
        });
      }
    })
  }
};
</script>

<style scoped lang="stylus">
  @import "~@/style/layout.styl";
</style>