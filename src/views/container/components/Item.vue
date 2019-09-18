<template>
  <div>
    <template v-if="['form', 'grid', 'collapse', 'list_table'].includes(item.type)">
      <layout-element :item="item" :data="data" :index="index"></layout-element>
    </template>
    <template v-else-if="item.elItem && item.elItem.exist">
      <div style="position: relative;">
      <el-form-item :label="item.elItem.label"
        :class="{'item-container': true, 'item-active': system_select && item && system_select.id === item.id}"
        style="margin-bottom:2px;"
        @click.native.stop="handleSelectItem">
      <form-view-item
        :item="item"
        :index="index"
        :data="data"
      />
      </el-form-item>
      <div v-if="system_select && item && system_select.id === item.id && item.elItem && item.elItem.exist" :class="{'item-view-drag': true}">
        <i class="iconfont icon-drag item-drag"></i>
      </div>
      </div>
    </template>
    <template v-else>
      <form-view-item
        :item="item"
        :index="index"
        :data="data"
      />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LayoutElement from "./LayoutElement";
import FormViewItem from "./FormViewItem";
import { handleSelectItem } from "./helper";
export default {
  name: "MyItem",
  props: ["item", "data", "index"],
  components: {
    FormViewItem,
    LayoutElement
  },
  data: function() {
    return {

    }
  },
  computed: {
    ...mapGetters(["system_select"])
  },
  methods: {
    handleSelectItem: function() {
      handleSelectItem(this.item);
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import "~@/style/draggable.styl";
@import '~@/style/selectedItem/item.styl';
</style>
