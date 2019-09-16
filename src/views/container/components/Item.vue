<template>
  <div>
    <template v-if="['form', 'grid', 'collapse', 'list_table'].includes(item.type)">
      <layout-element :item="item" :data="data" :index="index"></layout-element>
    </template>
    <template v-if="item.elItem && item.elItem.exist">
      <el-form-item :label="item.type==='button'?'' : item.elItem.label" 
        :class="{'item-container': true, 'item-active': system_select && item && system_select.id === item.id}"
        style="margin-bottom:2px;"
        @click.native.stop="handleSelectItem">
      <form-view-item
        :item="item"
        :index="index"
        :data="data"
      />
      </el-form-item>
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
      this.$store.commit("SET_SELECT", this.item);
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import "~@/style/draggable.styl";
@import '~@/style/selectedItem/item.styl';
</style>
