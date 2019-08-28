<template>
  <div>
    <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
    <el-button type="text" size="medium" icon="el-icon-upload2" @click="handleImport">导入JSON</el-button>
    <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
    <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleExport">生成JSON</el-button>
    <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateProjectCode">生成项目代码</el-button>
    <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateHtmlCode">生成html代码</el-button>
    <my-dialog title="生成html代码" :visible.sync="page.getHtmlCodeVisible">
      <ace v-model="getHtmlCode"></ace>
    </my-dialog>
    <my-dialog title="生成项目代码" :visible.sync="page.getProjectCodeVisible">
      <ace v-model="getProjectCode"></ace>
    </my-dialog>
    <my-dialog title="JSON" :visible.sync="page.setJsonCodeVisible">
      <!-- <pre>{{getJsonCode}}</pre> -->
      <!-- <ace v-model="getJsonCode" :read-only="false" type="json"></ace> -->
      <div style="display: flex;flex-direction: row;">
      <el-input v-model="importData" :autosize="{minRows: 3}" type="textarea" style="width: 50%;"></el-input>
        <div>
      <p style="position: absolute;top: 50px;">预览</p>
      <vue-json-pretty
        :data="jsonOfImportData"
        :highlightMouseoverNode="true"
        :highlightSelectedNode="true"
        :selectOnClickNode="true"
        selectableType="single"
        v-model="page.jsonData">
      </vue-json-pretty>
        </div>
      </div>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleSelectOk">确 定</el-button>
      </span>
    </my-dialog>
    <my-dialog title="JSON" :visible.sync="page.getJsonCodeVisible">
          <vue-json-pretty
            :data="data"
            :highlightMouseoverNode="true"
            :highlightSelectedNode="true"
            :selectOnClickNode="true"
            selectableType="single"
            v-model="page.jsonData">
          </vue-json-pretty>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCopyJson">复制</el-button>
      </span>
    </my-dialog>
    <my-dialog title="预览" :visible.sync="page.getPreviewVisible">
      <template v-if="page.getPreviewVisible" >
        <preview-form :data="data" :form-config="formConfig" />
      </template>
    </my-dialog>
  </div>
</template>
<script>
import { MyDialog } from "@/components/index.js";
import PreviewForm from "./PreviewForm.vue";
import generateHtmlCode from "./generateHtmlCode.js";
import generateProjectCode from "./generateProjectCode.js";
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: "FormAction",
  components: {
    MyDialog,
    PreviewForm,
    VueJsonPretty
  },
  props: ["data", "formConfig"],
  data: function() {
    return {
      page: {
        getHtmlCodeVisible: false,
        getProjectCodeVisible: false,
        getPreviewVisible: false,
        getJsonCodeVisible: false,
        setJsonCodeVisible: false,
        jsonData: ""
      },
      importData: ""
    }
  },
  computed: {
    getHtmlCode: function() {
      if (this.page.getHtmlCodeVisible) {
        return generateHtmlCode(this.data, this.formConfig);
      } else {
        return ""
      }
    },
    getProjectCode: function() {
      if (this.page.getProjectCodeVisible) {
        console.log("this.formConfig")
        console.log(this.formConfig)
        return generateProjectCode(this.data, this.formConfig);
      } else {
        return ""
      }
    },
    getJsonCode: function() {
      if(this.page.getJsonCodeVisible) {
        return this.data;
      } else {
        return "";
      }
    },
    jsonOfImportData: function() {
      if (!this.importData) {
        return {};
      }
      return JSON.parse(this.importData);
    }
  },
  methods: {
    /**
    * 清空item
    */
    handleEmpty: function() {
      this.data.list = [];
      this.$store.commit("SET_SELECT", {});
    },
    /**
     * 生成html测试代码
     */
    handleGenerateHtmlCode: function() {
      this.page.getHtmlCodeVisible = true;
    },
    /**
     * 生成项目代码
     */
    handleGenerateProjectCode: function() {
      this.page.getProjectCodeVisible = true;
    },
    /**
     * 预览
     */
    handlePreview: function() {
      this.page.getPreviewVisible = true;
    },
    /**
     * 导入JSON
     */
    handleImport: function() {
      this.page.setJsonCodeVisible = true;
    },
    /**
     * 导出JSON
     */
    handleExport: function() {
      this.page.getJsonCodeVisible = true;
    },
    handleCopyJson: function() {
    },
    /**
     * 导入JSON确定
     */
    handleSelectOk: function() {
      if (this.importData) {
        this.data.list = JSON.parse(this.importData).list;
        this.page.setJsonCodeVisible = false;
      }
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus"></style>
