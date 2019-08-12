<template>
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
        <a>
          <span>{{item.label}}</span>
        </a>
      </li>
    </draggable>
  </div>
</template>
<script>
import Draggable from "vuedraggable"
import { basicElement } from "./elementConfig.js";
import { cloneDeep } from "lodash";
export default {
  name: "FormElement",
  components: {
    Draggable
  },
  data: function() {
    return {
      basicElement: cloneDeep(basicElement)
    }
  },
  methods: {
    handleMoveEnd: function(a, b, c) {
    },
    handleMoveStart: function(a, b, c) {
    },
    handleMoveUpdate() {
      console.log("handleMoveUpdate");
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
</style>
