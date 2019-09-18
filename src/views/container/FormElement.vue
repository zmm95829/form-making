<template>
<section style="display: flex; flex-direction: row; flex-wrap: wrap">
  <el-button size="mini"><i class="el-icon-setting"/>设置</el-button>
  <div class="form-element-list">
    <draggable
      element="ul"
      v-model="basicElement"
      :sort="false"
      :group="{name:'form', pull:'clone', put:false}"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      @update="handleMoveUpdate"
    >
      <li v-for="item in basicElement" :key="item.id" class="form-element-item itemdrag">
        <a @dblclick="handleElementDblclick">
          <el-row>
            <el-col :span="8"><i :class="['icon', 'iconfont', item.icon]"/></el-col>
            <el-col :span="16" style="text-align:left">{{item.label}}</el-col>
          </el-row>
        </a>
      </li>
    </draggable>
  </div>
  <div class="form-element-list">
    <draggable
      element="ul"
      v-model="layoutElement"
      :sort="false"
      :group="{name:'form', pull:'clone', put:false}"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      @update="handleMoveUpdate"
    >
      <li v-for="item in layoutElement" :key="item.id" class="form-element-item itemdrag">
        <a>
          <el-row>
            <el-col :span="8"><i :class="['icon', 'iconfont', item.icon]"/></el-col>
            <el-col :span="16" style="text-align:left">{{item.label}}</el-col>
          </el-row>
        </a>
      </li>
    </draggable>
  </div>
  <div class="form-element-list">
    <draggable
      element="ul"
      v-model="customElement"
      :sort="false"
      :group="{name:'form', pull:'clone', put:false}"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      @update="handleMoveUpdate"
    >
      <li v-for="item in customElement" :key="item.id" class="form-element-item itemdrag">
        <a>
          <el-row>
            <el-col :span="8"><i :class="['icon', 'iconfont', item.icon]"/></el-col>
            <el-col :span="16" style="text-align:left">{{item.label}}</el-col>
          </el-row>
        </a>
      </li>
    </draggable>
  </div>
</section>
</template>
<script>
import Draggable from "vuedraggable"
import { basicElement, layoutElement, customElement } from "./config/elementConfig";
import { cloneDeep } from "lodash";
export default {
  name: "FormElement",
  components: {
    Draggable
  },
  data: function() {
    return {
      basicElement: cloneDeep(basicElement),
      layoutElement: JSON.parse(JSON.stringify(layoutElement)),
      customElement: JSON.parse(JSON.stringify(customElement))
    }
  },
  methods: {
    handleMoveEnd: function(a, b, c) {
    },
    handleMoveStart: function(a, b, c) {
    },
    handleMoveUpdate() {
    },
    handleElementDblclick: function() {
      alert("adfas")
    }
  }
};
</script>
<style>
.form-element-list ul {
  margin: 0;
  padding: 16px;
  list-style-type: none;
}
.form-element-item {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;*/
  align-items: center;
  line-height: 26px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1%;
  color: #333;
  border: 1px solid #f4f6fc;
}
.form-element-item a {
  display: block;
  width: 105px;
  cursor: move;
  background: #f4f6fc;
  border: 1px solid #f4f6fc;
  text-align: center;
}
.form-element-item a:hover {
  border: 1px dashed blue;
}
.form-element-item a .icon {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 14px;
  display: inline-block;
}
</style>
