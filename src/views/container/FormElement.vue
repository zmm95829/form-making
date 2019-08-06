<template>
  <div class="element-list">
    <draggable
      element="ul"
      v-model="basicElement"
      :sort="false"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      :move="handleMove"
    >
      <li v-for="item in basicElement" :key="item.id" class="element-item">
        <a>
          <span>{{item.name}}</span>
        </a>
      </li>
    </draggable>
  </div>
</template>
<script>
import Draggable from "vuedraggable"
import { basicElement } from "./elementConfig.js";
export default {
  name: "FormElement",
  components: {
    Draggable
  },
  data: function() {
    return {
      basicElement
    }
  },
  methods: {
    handleMoveEnd: function(a, b, c) {
      console.log("handleMoveEnd");
      console.log(a);
    },
    handleMoveStart: function(a, b, c) {
      console.log("handleMoveStart");
      console.log(a);
    },
    handleMove: function(a, b, c) {
      console.log("handleMove");
      console.log(a);
      console.log(b);
      console.log(c);
    }
  }
};
</script>
<style>
.element-list ul {
  margin: 0;
  padding: 16px;
  list-style-type: none;
}
.element-item {
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
.element-item a {
  display: block;
  width: 105px;
  cursor: move;
  background: #f4f6fc;
  border: 1px solid #f4f6fc;
  text-align: center;
}
.element-item a:hover {
  border: 1px dashed blue;
}
</style>
