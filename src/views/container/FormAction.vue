<template>
  <div>
    <!-- <el-button type="text" size="medium" icon="el-icon-upload2">导入JSON</el-button> -->
    <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
    <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
    <!-- <el-button type="text" size="medium" icon="el-icon-tickets">生成JSON</el-button> -->
    <el-button type="text" size="medium" icon="el-icon-document">生成项目代码</el-button>
    <el-button type="text" size="medium" icon="el-icon-document" @click="generateHtmlCode">生成html代码</el-button>
    <my-dialog title="生成html代码" :visible.sync="page.getHtmlCodeVisible">
      <ace v-model="getHtmlCode"></ace>
    </my-dialog>
    <my-dialog title="预览" :visible.sync="page.getPreviewVisible">
      <template v-if="page.getPreviewVisible">
        <preview-form :data="data" :form-config="formConfig" />
      </template>
    </my-dialog>
  </div>
</template>
<script>
import MyDialog from "./MyDialog.vue";
import PreviewForm from "./PreviewForm.vue";
import generateHtmlCode from "./generateHtmlCode.js";
export default {
  name: "FormAction",
  components: {
    MyDialog,
    PreviewForm
  },
  props: ["data", "formConfig"],
  data: function() {
    return {
      page: {
        getHtmlCodeVisible: false,
        getPreviewVisible: false
      }
    }
  },
  computed: {
    getHtmlCode: function() {
      if (this.page.getHtmlCodeVisible) {
        return generateHtmlCode(this.data, this.formConfig);
      } else {
        return ""
      }
    }
  },
  methods: {
    /**
    * 清空item
    */
    handleEmpty: function() {
      this.data.list = [];
      this.$emit("update:select", {});
    },
    /**
     * 生成html测试代码
     */
    generateHtmlCode: function() {
      this.page.getHtmlCodeVisible = true;
    },
    /**
     * 预览
     */
    handlePreview: function() {
      this.page.getPreviewVisible = true;
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus"></style>
