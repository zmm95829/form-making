<template>
  <div class="form-view-container">
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
            <template v-if="item.type==='grid'">
              <el-row
                :gutter="item.options.gutter"
                :key="item.id"
                :class="{'item-container': true, 'grid-active': select.id === item.id, 'grid-row': true}"
                type="flex"
                :justify="item.options.justify"
                :align="item.options.align"
                @click.native.stop="handleSelectItem(index)"
              >
                <el-col
                  v-for="(col, colIndex) in item.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                  class="grid-col"
                >
                  <draggable
                    v-model="col.list"
                    v-bind="{group:'form', ghostClass: 'placeholder',animation: 200, handle: '.item-drag'}"
                    @add="handleGridColAdd($event, item, colIndex)"
                  >
                    <transition-group name="fade" tag="div" style="min-height: 50px;">
                      <form-view-item
                        :key="String(colItem.id) + String(itemIndex)"
                        v-for="(colItem, itemIndex) in col.list"
                        :item="colItem"
                        :select.sync="selectItem"
                        :index="itemIndex"
                        :data="col.list"
                      />
                    </transition-group>
                  </draggable>
                </el-col>
                <div v-if="select.id === item.id" class="item-view-action">
                  <i class="iconfont icon-icon_clone" title="复制" @click="handleClone(index)"></i>
                  <i class="iconfont icon-trash" title="删除" @click="handleDelete(index)"></i>
                </div>
                <div v-if="select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
                  <i class="iconfont icon-drag item-drag"></i>
                </div>
              </el-row>
            </template>
            <template v-else>
              <form-view-item
                :item="item"
                :key="item.id"
                :select.sync="selectItem"
                :index="index"
                :data="data.list"
              />
            </template>
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
    select: {
      handler: function() {
        this.selectItem = this.select;
      },
      deep: true
    },
    selectItem: {
      handler: function() {
        if (this.selectItem.id !== this.select.id) {
          this.$emit("update:select", this.selectItem);
        }
      },
      deep: true
    }
  },
  methods: {
    handleMoveAdd: function(val) {
      const newIndex = val.newIndex
      // 为拖拽到容器的元素添加唯一id
      console.log("sssssssssssss")
      // switch (this.data.list[newIndex].type) {
      //   case "grid":
      //     this.data.list[newIndex] = merge(cloneDeep(this.data.list[newIndex]), {
      //       id,
      //       label: ""
      //     });
      //     break;
      //     default: break;
      // }
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
    },
    handleSelectItem: function(index) {
      this.selectItem = this.data.list[index];
    },
    handleDelete: function(index) {
      this.data.list.splice(index, 1);
      if (index !== 0) {
        this.$emit("update:select", this.data.list[index - 1]);
      } else if (this.data.list.length > 0) {
        this.$emit("update:select", this.data.list[index]);
      } else {
        this.$emit("update:select", {});
      }
    },
    handleClone: function(index) {
      const id = Date.parse(new Date());
      this.data.list.splice(index + 1, 0,
        merge(cloneDeep(this.data.list[index]), {
          id,
          model: this.data.list[index].type + "_key_" + id
        }));
      this.$emit("update:select", this.data.list[index + 1]);
    },
    handleGridColAdd: function(event, item, index) {
      console.log(item)
      const newIndex = event.newIndex;
      const id = Date.parse(new Date());
      item.columns[index].list[newIndex] = merge(cloneDeep(item.columns[index].list[newIndex]), {
        id,
        model: item.columns[index].list[newIndex].type + "_key_" + id
      });
      this.$emit("update:select", item.columns[index].list[newIndex]);
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
.grid-row {
  padding: 4px;
}
.grid-col {
  min-height: 50px;
  background-color: #fff;
  border: 1px dashed #c2c2c3;
  position: relative;
  padding: 1.5px;
}
/* .grid-col:hover{
  background-color: #f3f6fc;
  border: 1px solid #ddd7bb;
} */
.grid-active {
  outline: 2px solid #e6a23c;
  outline-offset: -1px;
}
</style>
