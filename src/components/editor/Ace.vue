
<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>

<script>
import ace from "ace-builds"
import "ace-builds/webpack-resolver" // 在 webpack 环境中使用必须要导入
import "ace-builds/src-noconflict/theme-monokai" // 默认设置的主题
import "ace-builds/src-noconflict/mode-javascript" // 默认设置的语言模式

export default {
  props: {
    value: String,
    type: {
      type: String,
      default: "html"
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      aceEditor: null,
      themePath: "ace/theme/tomorrow", // 不导入 webpack-resolver，该模块路径会报错
      modePath: `ace/mode/${this.type}` // 同上
    }
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 38, // 最大行数，超过会自动出现滚动条
      minLines: 30, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      fontSize: 14, // 编辑器内字体大小
      theme: this.themePath, // 默认设置的主题
      mode: this.modePath, // 默认设置的语言模式
      tabSize: 2, // 制表符设置为 2 个空格大小
      readOnly: this.readOnly,
      showPrintMargin: false,
      showGutter: false // 是否显示左侧
      // fadeFoldWidgets: true, // 鼠标放到左侧才显示折叠
      // showFoldWidgets: true, // 是否显示折叠
      // showLineNumbers: true // 是否显示行数
    });
    // this.aceEditor.setOptions({
    //   enableBasicAutocompletion: false,
    //   enableSnippets: false,
    //   enableLiveAutocompletion: false// 设置自动提示
    // });
    // // 设置打印线是否显示
    // this.aceEditor.setShowPrintMargin(false);
    // // 设置是否只读
    // this.aceEditor.setReadOnly(true);
    // 设置要显示的数据
    this.aceEditor.setValue(this.value);
  },
  watch: {
    value: function() {
      this.aceEditor.setValue(this.value);
    }
  }
}
</script>
