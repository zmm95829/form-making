<template>
  <section>
    <form-container
      v-if="system_project.page==='form'"
      :formConfig="formConfig"
      :data="data"
      @add-item="handleSelectItem"
    >
      <my-item
        :key="String(item.id) + String(index)"
        v-for="(item, index) in data.list"
        :item="item"
        :data="data.list"
        :index="index"
      />
    </form-container>
    <div v-else class="placeholder-container">
      <draggable
        key="root"
        v-model="data.list"
        v-bind="{group:'form', ghostClass: 'placeholder',animation: 200, handle: '.item-drag'}"
        @add="handleMoveAdd(data.list, $event)"
      >
        <transition-group
          name="fade"
          tag="div"
          class="container-transition-group"
          style="min-height: 50px;"
        >
          <my-item
            :key="String(item.id) + String(index)"
            v-for="(item, index) in data.list"
            :item="item"
            :data="data.list"
            :index="index"
          />
        </transition-group>
      </draggable>
    </div>
    <div v-if="data.list && data.list.length === 0" class="form-empty">从左侧拖拽来添加元素</div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import Draggable from "vuedraggable";
import FormViewItem from "./FormViewItem.vue";
import FormContainer from "./FormContainer.vue";
import MyItem from "./Item";
import { handleMoveAdd, handleClone, handleDelete, handleSelectItem } from "./helper.js";
export default {
  name: "MainView",
  components: {
    Draggable,
    FormViewItem,
    FormContainer,
    MyItem
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
      if ((arr[newIndex].page.needForm || (arr[newIndex].page.type && arr[newIndex].page.type.indexOf("basic") !== -1)) && arr[newIndex].elItem && arr[newIndex].elItem.exist) {
        arr.splice(newIndex, 1);
        this.$alert("请先拖拽表单", "提示", { type: "warning" });
        handleSelectItem(this.data.list[0]);
      } else {
        handleMoveAdd(arr, val);
      }
    },
    handleSelectItem: function(currentItem) {
      handleSelectItem(currentItem);
    },
    handleDelete: function(arr, index) {
      handleDelete(arr, index);
    },
    handleClone: function(arr, index) {
      handleClone(arr, index);
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '~@/style/selectedItem/item.styl';
@import '~@/style/selectedItem/container.styl';
@import '~@/style/draggable.styl';
</style>
