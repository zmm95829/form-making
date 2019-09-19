<template>
<section style="display: flex; flex-direction: row; flex-wrap: wrap">
  <div class="form-element-list">
    <p class="p-title p-title-first">基础控件</p>
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
    <p class="p-title">布局控件</p>
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
    <p v-if="customElement.length > 0" class="p-title">特殊控件</p>
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
import { mapGetters } from "vuex";
import Draggable from "vuedraggable"
import { basicElement, layoutElement, customElement } from "./config/common/elementConfig";
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
  computed: {
    ...mapGetters(["system_project"]),
    /**
     * 项目名称
     */
    projectName: function () {
      return this.system_project.name;
    }
  },
  watch: {
    projectName: function(val) {
      import(`./config/${val}/elementConfig`)
        .then(v => {
          this.basicElement = JSON.parse(JSON.stringify(v.basicElement));
          this.layoutElement = JSON.parse(JSON.stringify(v.layoutElement));
          this.customElement = JSON.parse(JSON.stringify(v.customElement));
        })
        .catch(e => {
          alert(e);
        });
    }
  },
  methods: {
    handleMoveEnd: function(a, b, c) {
    },
    handleMoveStart: function(a, b, c) {
    },
    handleMoveUpdate() {
    }
  }
};
</script>
<style>
.form-element-list ul {
  margin: 0;
  padding: 0px 16px;
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
.p-title {
  margin: 5px 0;
  padding-left: 16px;
}
.p-title:not(.p-title-first) {
  margin-top: 20px;
}
</style>
