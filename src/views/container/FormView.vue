<template>
  <div class="form-view-container">
    <!-- <div class="form-action">
      <el-button type="text" size="medium" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
      <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
      <el-button type="text" size="medium" icon="el-icon-document">生成项目代码</el-button>
      <el-button type="text" size="medium" icon="el-icon-document" @click="generateHtmlCode">生成html代码</el-button>
    </div>-->
    <div class="form-view">
      <el-form
        :label-position="formConfig.labelPosition"
        :label-width="formConfig.labelWidth+'px'"
        :size="formConfig.size"
        :label-suffix="formConfig.labelSuffix"
      >
        <draggable
          v-model="data.list"
          @end="handleMoveEnd"
          @add="handleMoveAdd"
          :move="handleMove"
          v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
        >
          <template v-for="(item, index) in data.list">
            <form-view-item
              :item="item"
              :key="item.id"
              :select.sync="selectItem"
              :index="index"
              :data="data.list"
            />
          </template>
        </draggable>
      </el-form>
      <div v-if="data.list && data.list.length === 0" class="form-empty">从左侧拖拽来添加元素</div>
    </div>
  </div>
</template>
<script>
import { merge, cloneDeep } from "lodash";
import Draggable from "vuedraggable";
import FormViewItem from "./FormViewItem.vue";
export default {
  name: "FormView",
  components: {
    Draggable,
    FormViewItem
  },
  props: ["formConfig", "select", "data"],
  data: function() {
    return {
      selectItem: this.select
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
      const newIndex = val.newIndex
      // 为拖拽到容器的元素添加唯一id
      const id = Date.parse(new Date());
      this.data.list[newIndex] = merge(cloneDeep(this.data.list[newIndex]), {
        id,
        model: this.data.list[newIndex].type + "_key_" + id
      });
      this.selectItem = this.data.list[newIndex];
    },
    handleMoveStart: function(val) {
    },
    handleMoveEnd: function() {
    },
    handleMove: function() {
    }
  }
};
</script>
<style>
.form-view {
  padding: 2px;
  border: 1px dashed #999999;
  min-height: 500px;
  background-color: #ffffff;
}
.form-view-container {
  background-color: #fafafa;
  position: relative;
}
.placeholder,
.placeholder::after {
  background: #f56c6c;
  border: 2px solid #f56c6c;
  outline-width: 0;
  height: 3px;
  width: 100%;
  margin-top: -3px;
  margin-left: 0px;
  box-sizing: border-box;
  font-size: 0;
  content: "";
  overflow: hidden;
  padding: 0;
}
</style>
