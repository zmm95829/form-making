<template>
  <div>
    <template v-if="['form', 'grid', 'collapse', 'list_table'].includes(item.type)">
      <layout-element :item="item" :data="data" :index="index"></layout-element>
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
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import "~@/style/draggable.styl";
</style>