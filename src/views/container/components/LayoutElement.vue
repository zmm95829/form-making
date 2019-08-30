<template>
  <div :class="{'view-container': true, 'container-active': system_select.id === item.id}" @click.stop="handleSelectItem(item)">
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
      <div
        :key="String(item.id)"
        class="item-container form-item-container"
        @click.stop="handleSelectItem(data[index])"
      >
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
    <template v-else-if="item.type==='collapse'">
      <div
        :key="String(item.id)"
        :class="{'item-container': true, 'collapse-item-container': true, 'collapse-active': system_select.id === item.id }"
        @click.stop="handleSelectItem(data[index])"
      >
        <el-collapse v-model="showModel" :class="item.options.class">
          <el-collapse-item
            v-for="subItem in item.items"
            :key="subItem.id"
            :title="subItem.title"
            name="1"
          >
            <template slot="title" v-show="showModel===subItem.name">
              <div style="width:100%;height:100%;background-color:#f4f6fc">
               <draggable
                  v-model="subItem.top.list"
                  @add="handleMoveAdd(subItem.top.list, $event)"
                  v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
                >
                  <transition-group name="fade" tag="div" style="min-height: 260px;">
                    <my-item
                      v-for="(subSubItem, subIndex) in subItem.top.list"
                      :item="subSubItem"
                      :key="String(subSubItem.id)"
                      :index="subIndex"
                      :data="subItem.top.list"
                    />
                  </transition-group>
               </draggable>
               </div>
            </template>
            <draggable
              v-model="subItem.list"
              @add="handleMoveAdd(subItem.list, $event)"
              v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
            >
              <transition-group name="fade" tag="div" style="min-height: 260px;">
                <my-item
                  v-for="(subSubItem, subIndex) in subItem.list"
                  :item="subSubItem"
                  :key="String(subSubItem.id)"
                  :index="subIndex"
                  :data="subItem.list"
                />
              </transition-group>
            </draggable>
          </el-collapse-item>
        </el-collapse>
        <div v-if="system_select.id === item.id" class="item-view-action">
          <i class="iconfont icon-clone" title="复制" @click="handleClone(data, index)"></i>
          <i class="iconfont icon-delete" title="删除" @click="handleDelete(data, index)"></i>
        </div>
        <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
          <i class="iconfont icon-drag item-drag"></i>
        </div>
      </div>
    </template>
    <template v-else-if="item.type==='list_table'">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="(col, index) in item.columnOptions" :key="index" :prop="col.props" :label="col.label"/>
      </el-table>
      <div v-if="system_select.id === item.id" class="item-view-action">
          <i class="iconfont icon-clone" title="复制" @click="handleClone(data, index)"></i>
          <i class="iconfont icon-delete" title="删除" @click="handleDelete(data, index)"></i>
        </div>
        <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
          <i class="iconfont icon-drag item-drag"></i>
        </div>
    </template>
  </div>
</template>
<script>
import FormViewItem from "./FormViewItem";
import Draggable from "vuedraggable";
import { mapGetters } from "vuex";
import { handleGridColAdd, handleMoveAdd, handleDelete, handleClone } from "./helper.js";
// 异步加载，同步加载循环嵌套会报错Unknown custom element
const MyItem = () => import("./Item.vue");

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
      showModel: "",
      tableData: []
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
@import '~@/style/draggable.styl';
@import '~@/style/selectedItem/item.styl';
@import '~@/style/selectedItem/container.styl';
.collapse-item-container
  padding 5px
.collapse-item-container >>> .el-collapse-item__header
  height auto
</style>
