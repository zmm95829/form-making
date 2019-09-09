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
            <el-button type="text" @click="handleProjectChange">修改项目&nbsp;{{system_project.name +"/"+system_project.page}}</el-button>
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
            />
          </el-main>
        </el-container>
      </el-main>
      <el-aside width="300px" class="layout-right">
        <FormConfig :form-config="data.formConfig" />
      </el-aside>
    </el-container>
  </el-main>
  <el-footer>footer</el-footer>
  <my-dialog :visible.sync="changeProject.visible">
    <project-config @click="handleClose"/>
     <span ></span>
  </my-dialog>
</el-container>
</template>
<script>
import {mapGetters} from "vuex";
import FormElement from "./FormElement";
import FormAction from "./FormAction";
import FormView from "./components/MainView";
import FormConfig from "./FormConfig.vue";
import formConfig from "./config/formConfig.js";
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
        selectItem: {}
      },
      changeProject: {
        visible: false
      }
    }
  },
  computed: {
    ...mapGetters(["system_project"])
  },
  mounted: function() {
    this.$store.commit("SET_DATA", this.data.formElements);
  },
  methods: {
    handleEmpty: function() {
      this.selectItem = {};
    },
    handleProjectChange: function() {
      this.changeProject.visible = true;
    },
    /**
     * 修改好项目后关闭弹窗
     */
    handleClose: function() {
      this.changeProject.visible = false;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.system_project.name !== to.params.name) {
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
