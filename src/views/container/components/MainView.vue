<template>
  <section>
    <form-container v-if="system_project.page==='form'" :formConfig="formConfig" :data="data" @add-item="handleSelectItem">
      <template v-for="(item, index) in data.list">
            <template v-if="item.type==='grid'">
              <el-row
                :gutter="item.options.gutter"
                :key="String(item.id)"
                :class="{'item-container': true, 'grid-active': system_select.id === item.id, 'grid-row': true}"
                type="flex"
                :justify="item.options.justify"
                :align="item.options.align"
                @click.native.stop="handleSelectItem(data.list[index])"
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
                        :index="itemIndex"
                        :data="col.list"
                      />
                    </transition-group>
                  </draggable>
                </el-col>
                <div v-if="system_select.id === item.id" class="item-view-action">
                  <i class="iconfont icon-clone" title="复制" @click="handleClone(data.list, index)"></i>
                  <i class="iconfont icon-delete" title="删除" @click="handleDelete(data.list, index)"></i>
                </div>
                <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
                  <i class="iconfont icon-drag item-drag"></i>
                </div>
              </el-row>
            </template>
            <template v-else-if="item.type==='form'">
              <div :key="String(item.id)" class="form-item-container" @click="handleSelectItem(data.list[index])">
                <el-form
                  :label-position="formConfig.labelPosition"
                  :label-width="formConfig.labelWidth+'px'"
                  :size="formConfig.size"
                  :label-suffix="formConfig.labelSuffix"
                  :class="{'form-active': system_select.id === item.id}"
                  >
                  <draggable
                    v-model="item.list"
                    @add="handleMoveAdd(item.list, $event)"
                    v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
                  >
                    <transition-group name="fade" tag="div" style="min-height: 260px;">
                    <form-view-item
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
                  <i class="iconfont icon-clone" title="复制" @click="handleClone(data.list, index)"></i>
                  <i class="iconfont icon-delete" title="删除" @click="handleDelete(data.list, index)"></i>
                </div>
                <div v-if="system_select.id === item.id" class="item-view-drag" style="left: 0;top: 0;">
                  <i class="iconfont icon-drag item-drag"></i>
                </div>
              </div>
            </template>
            <template v-else>
              <form-view-item
                :key="String(item.id)"
                :item="item"
                :index="index"
                :data="data.list"
              />
            </template>
      </template>
    </form-container>
    <div v-if="data.list && data.list.length === 0" class="form-empty">从左侧拖拽来添加元素</div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { merge, cloneDeep } from "lodash";
import Draggable from "vuedraggable";
import FormViewItem from "./FormViewItem.vue";
import FormContainer from "./FormContainer.vue";
export default {
  name: "MainView",
  components: {
    Draggable,
    FormViewItem,
    FormContainer
  },
  props: ["formConfig", "data"],
  data: function() {
    return {
      selectItem: this.select
    }
  },
  computed: {
    ...mapGetters(["system_project", "system_select"])
  },
  methods: {
    handleMoveAdd: function(arr, val) {
      const newIndex = val.newIndex;
      // 为拖拽到容器的元素添加唯一id     
      const id = Date.parse(new Date());
      arr[newIndex] = merge(cloneDeep(arr[newIndex]), {
        id,
        model: arr[newIndex].type + "_key_" + id
      });
        this.$store.commit("SET_SELECT", arr[newIndex]);
    },
     handleSelectItem: function(currentItem) {
        this.$store.commit("SET_SELECT", currentItem);
    },
    handleDelete: function(arr, index) {
      arr.splice(index, 1);
      if (index !== 0) {
        this.$store.commit("SET_SELECT", arr[index - 1]);
      } else if (arr.length > 0) {
        this.$store.commit("SET_SELECT", arr[index]);
      } else {
        this.$store.commit("SET_SELECT", {});
      }
    },
    handleClone: function(arr, index) {
      const id = Date.parse(new Date());
      arr.splice(index + 1, 0,
        merge(cloneDeep(arr[index]), {
          id,
          model: arr[index].type + "_key_" + id
        }));
        this.$store.commit("SET_SELECT", arr[index + 1]);
    },
    handleGridColAdd: function(event, item, index) {
      console.log(item)
      const newIndex = event.newIndex;
      const id = Date.parse(new Date());
      item.columns[index].list[newIndex] = merge(cloneDeep(item.columns[index].list[newIndex]), {
        id,
        model: item.columns[index].list[newIndex].type + "_key_" + id
      });
        this.$store.commit("SET_SELECT", item.columns[index].list[newIndex]);
    },
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import "~@/style/selectedItem/item.styl";
@import "~@/style/selectedItem/container.styl";
</style>