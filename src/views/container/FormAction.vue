<template>
  <div>
    <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
    <el-button type="text" size="medium" icon="el-icon-files" @click="handleImportTempalte">获取模板</el-button>
    <el-button type="text" size="medium" icon="el-icon-upload2" @click="handleImport">导入JSON</el-button>
    <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
    <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleExport">生成JSON</el-button>
    <el-button
      type="text"
      size="medium"
      icon="el-icon-document"
      @click="handleGenerateProjectCode"
    >生成项目代码</el-button>
    <el-button
      type="text"
      size="medium"
      icon="el-icon-document"
      @click="handleGenerateHtmlCode"
    >生成html代码</el-button>
    <my-dialog title="生成html代码" :visible.sync="page.getHtmlCodeVisible">
      <ace v-model="getHtmlCode"></ace>
    </my-dialog>
    <my-dialog title="生成项目代码" :visible.sync="page.getProjectCodeVisible">
      <el-button size="mini" type="primary" @click="handleCopy(getProjectCode, 'getProjectCodeVisible')">复制</el-button>
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
            v-model="page.jsonData"
          ></vue-json-pretty>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handlePasteJson">粘贴</el-button>
        <el-button type="mini" @click="handleFormat">JSON格式化</el-button>
        <el-button type="primary" size="mini" @click="handleSelectOk">确 定</el-button>
      </span>
    </my-dialog>
    <my-dialog title="JSON" :visible.sync="page.getJsonCodeVisible">
      <vue-json-pretty
        :data="data"
        :highlightMouseoverNode="true"
        :highlightSelectedNode="true"
        :selectOnClickNode="true"
        :showDoubleQuotes="false"
        selectableType="single"
        v-model="page.jsonData"
      ></vue-json-pretty>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCopy(data, 'getJsonCodeVisible')">复制</el-button>
      </span>
    </my-dialog>
    <input id="copyInput" style="opacity: 0;position: absolute;" />
    <my-dialog title="预览" :visible.sync="page.getPreviewVisible">
      <template v-if="page.getPreviewVisible">
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
import VueJsonPretty from "vue-json-pretty"
import { mapGetters } from "vuex";
import {jsonFormat} from "@/utils/helper";
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
        jsonData: "",
        showJsonFormat: false
      },
      importData: ""
    }
  },
  computed: {
    ...mapGetters(["system_project"]),
    getHtmlCode: function() {
      if (this.page.getHtmlCodeVisible) {
        return generateHtmlCode(this.data, this.formConfig);
      } else {
        return ""
      }
    },
    getProjectCode: function() {
      if (this.page.getProjectCodeVisible) {
        return generateProjectCode(this.data, this.formConfig);
      } else {
        return ""
      }
    },
    getJsonCode: function() {
      if (this.page.getJsonCodeVisible) {
        return this.data;
      } else {
        return "";
      }
    },
    jsonOfImportData: function() {
      if (!this.importData) {
        return {};
      }
      console.log(this.importData.replace(/\s/g, ""))
      return JSON.parse(this.importData.replace(/\s/g, ""));
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
      this.importData = "";
      this.page.getJsonCodeVisible = true;
    },
    handlePasteJson: function() {
      try {
        navigator.clipboard.readText()
          .then(text => {
            this.importData = text;
            this.$message({
              type: "success",
              showClose: "true",
              message: "粘贴成功"
            });
          })
          .catch(err => {
            this.$message({
              type: "error",
              showClose: "true",
              message: "粘贴失败:" + err
            });
          });
      } catch (e) {
        this.$message({
          type: "error",
          showClose: "true",
          message: "粘贴失败,该浏览器不支持，ctrl+v或右键粘贴：" + e
        });
      };
    },
    handleCopy: function(data, tempVisible) {
      const input = document.getElementById("copyInput");
      input.value = typeof data === "string" ? data : JSON.stringify(data);
      input.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        type: "success",
        showClose: "true",
        message: "复制成功"
      });
      this.page[tempVisible] = false
    },
    /**
     * 导入JSON确定
     */
    handleSelectOk: function() {
      if (this.importData) {
        this.data.list = JSON.parse(this.importData).list;
        this.page.setJsonCodeVisible = false;
      }
    },
    handleImportTempalte: function() {
      import(`./config/${this.system_project.name}/${this.system_project.page}.js`)
        .then(v => {
          Object.assign(this.data, JSON.parse(JSON.stringify(v.data)))
        })
        .catch(v => {
          this.$alert("获取模板失败，请检查模板是否存在", "提示", { type: "error" });
          console.error("获取模板失败:" + v)
        })
    },
    handleFormat() {
      this.importData = jsonFormat(this.importData);
      console.log(this.importData)
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus"></style>
