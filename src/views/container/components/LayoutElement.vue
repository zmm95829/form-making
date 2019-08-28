<template>
  <div>
    <template v-if="item.type==='grid'">
      <el-row
        :gutter="item.options.gutter"
        :key="String(item.id)"
        :class="{'item-container': true,'item-grid-container': true,  'grid-active': system_select.id === item.id, 'grid-row': true}"
        type="flex"
        :justify="item.options.justify"
        :align="item.options.align"
        @click.native.stop="handleSelectItem(data[index])"
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
              <my-item
                :key="String(colItem.id) + String(itemIndex)"
                v-for="(colItem, itemIndex) in col.list"
                :item="colItem"
                :data="col.list"
                :index="itemIndex"
              />
            </transition-group>
          </draggable>
        </el-col>
        <div v-if="system_select.id === item.id" class="item-view-action">
          <i class="iconfont icon-clone" title="复制" @click="handleClone(data, index)"></i>
          <i class="iconfont icon-delete" title="删除" @click="handleDelete(data, index)"></i>
        </div>
        <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
          <i class="iconfont icon-drag item-drag"></i>
        </div>
      </el-row>
    </template>
    <template v-else-if="item.type==='form'">
          <div :key="String(item.id)" class="item-container form-item-container" @click="handleSelectItem(data[index])">
            <el-form
              :label-position="item.options.labelPosition"
              :label-width="item.options.labelWidth+'px'"
              :size="item.options.size"
              :label-suffix="item.options.labelSuffix"
              :class="{'form-active': system_select.id === item.id}"
              >
              <draggable
                v-model="item.list"
                @add="handleMoveAdd(item.list, $event)"
                v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
              >
                <transition-group name="fade" tag="div" style="min-height: 260px;">
                <my-item
                v-for="(subItem, subIndex) in item.list"
                  :item="subItem"
                  :key="String(subItem.id)"
                  :index="subIndex"
                  :data="item.list"
                />
                </transition-group>
              </draggable>
            </el-form>
            <div v-if="system_select.id === item.id" class="item-view-action">
              <i class="iconfont icon-clone" title="复制" @click="handleClone(data, index)"></i>
              <i class="iconfont icon-delete" title="删除" @click="handleDelete(data, index)"></i>
            </div>
            <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
              <i class="iconfont icon-drag item-drag"></i>
            </div>
          </div>
        </template>
  </div>
</template>
<script>
import FormViewItem from "./FormViewItem";
// 异步加载，同步加载循环嵌套会报错Unknown custom element
const MyItem = () => import("./Item.vue");
import Draggable from "vuedraggable";
import { mapGetters } from "vuex";
import { merge, cloneDeep } from "lodash";
import { handleGridColAdd, handleMoveAdd, handleDelete, handleClone } from "./helper.js";

export default {
  name: "LayoutElement",
  props: ["item", "data", "index"],
  components: {
    FormViewItem,
    "my-item": MyItem,
    Draggable
  },
  data: function() {
    return {

    }
  },
  computed: {
    ...mapGetters(["system_select"])
  },
  methods: {
     handleGridColAdd: function(event, item, index) {
      handleGridColAdd(event, item, index, this);
    },
    handleSelectItem: function(currentItem) {
        this.$store.commit("SET_SELECT", currentItem);
    },
    handleMoveAdd: function(arr, val) {
      handleMoveAdd(arr, val);
    },
    handleClone(arr, index) {
      handleClone(arr, index);
    },
    handleDelete(arr, index) {
      handleDelete(arr, index);
    }
  }
};
</script>
<style scoped lang="stylus">
@import "~@/style/draggable.styl";
@import "~@/style/selectedItem/item.styl";
@import "~@/style/selectedItem/container.styl";
</style>