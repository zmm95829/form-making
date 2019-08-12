<template>
  <div class="form-view-container">
    <div class="form-action">
      <!-- <el-button type="text" size="medium" icon="el-icon-upload2">导入JSON</el-button> -->
      <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
      <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
      <!-- <el-button type="text" size="medium" icon="el-icon-tickets">生成JSON</el-button> -->
      <el-button type="text" size="medium" icon="el-icon-document">生成项目代码</el-button>
      <el-button type="text" size="medium" icon="el-icon-document" @click="generateHtmlCode">生成html代码</el-button>
    </div>
    <div class="form-view">
    <el-form :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth+'px'" :size="formConfig.size" :label-suffix="formConfig.labelSuffix">
      <draggable v-model="data.list" @end="handleMoveEnd" @add="handleMoveAdd" :move="handleMove" group="form" handle=".item-drag">
        <template v-for="(item, index) in data.list" >
         <form-view-item :item="item" :key="item.id" :select.sync="selectItem" :index="index" :data="data.list"/>
        </template>
    </draggable>
    </el-form>
    <div v-if="data.list.length === 0" class="form-empty">从左侧拖拽来添加元素</div>
  </div>
  <my-dialog title="生成html代码" :visible.sync="page.getHtmlCodeVisible">
    <p v-html="getHtmlCode"></p>
  </my-dialog>
   <my-dialog title="预览" :visible.sync="page.getPreviewVisible">
     <template v-if="page.getPreviewVisible">
  <preview-form :data="data" :form-config="formConfig" :template="generateFormCode(data, formConfig)"/>

     </template>
  </my-dialog>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import FormViewItem from "./FormViewItem.vue";
import MyDialog from "./MyDialog.vue";
import PreviewForm from "./PreviewForm.vue";
import generateHtmlCode from "./generateHtmlCode.js";
import generateFormCode from "./generateFormCode.js";
export default {
  name: "FormView",
  components: {
    Draggable,
    FormViewItem,
    MyDialog,
    PreviewForm
  },
  props: ["formConfig", "select"],
  data: function() {
    return {
      generateFormCode,
      aaa:"<b>hahaahah</b>",
      data: {
        list: []
      },
      selectItem: this.select,
      page: {
        getHtmlCodeVisible: false,
        getPreviewVisible: false
      }
    }
  },
  computed: {
    getHtmlCode: function() {
      if(this.page.getHtmlCodeVisible) {
        console.log(generateHtmlCode(this.data, this.formConfig))
        return generateHtmlCode(this.data, this.formConfig);
      } else {
        return ""
      }
    }
  },
  watch: {
    selectItem: {
      handler: function() {
        this.$emit("update:select", this.selectItem);
      },
      deep: true
    }
  },
  methods: {
    handleMoveAdd: function(val) {
      // console.log("add-formview");
      const newIndex = val.newIndex
      // console.log(newIndex);
      // 为拖拽到容器的元素添加唯一id
      const id = Date.parse(new Date());
      
      this.$set(this.data.list, newIndex, {
        id,
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options
        },
        model: "_key" + id
        });
      this.selectItem = this.data.list[newIndex];
    },
    handleMoveStart: function(val) {
      console.log("start-formview");
      //   key,
      //   // 绑定键值
      //   model: this.data.list[newIndex].type + '_' + key,
      //   rules: []
      // })

      // if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
      //   this.$set(this.data.list, newIndex, {
      //     ...this.data.list[newIndex],
      //     options: {
      //       ...this.data.list[newIndex].options,
      //       options: this.data.list[newIndex].options.options.map(item => ({
      //         ...item
      //       }))
      //     }
      //   })
      // }

      // if (this.data.list[newIndex].type === 'grid') {
      //   this.$set(this.data.list, newIndex, {
      //     ...this.data.list[newIndex],
      //     columns: this.data.list[newIndex].columns.map(item => ({...item}))
      //   })
      // }

      // this.selectWidget = this.data.list[newIndex]
      // console.log(val);
      // console.log(this)
    },
    handleMoveEnd: function() {
      // console.log("end-formview");
    },
    handleMove: function() {
      // console.log("move-formview");
    },
    /**
     * 清空item
     */
    handleEmpty: function() {
      this.data.list = [];
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
<style>
.form-action {
  position: absolute;
  width: calc(100% - 15px);
  top: 0;
  height: 37px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
.form-view {
  position: absolute;
  width: calc(100% - 26px);
  top: 40px;
  margin: 10px;
  padding: 2px;
  border: 1px dashed #999999;
  min-height: 500px;
  background-color: #ffffff;
}
.form-view-container {
  background-color: #fafafa;
  position: relative;
}
</style>
