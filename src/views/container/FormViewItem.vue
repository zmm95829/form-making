<template>
  <div :class="{'item-container': true, 'active': selectItem && item && selectItem.id === item.id}">
    <el-form-item :label="item.label" class="item-view" @click.native.stop="handleSelectItem">
      <template v-if="item.type === 'input'">
        <el-input
          v-model="item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :disabled="item.options.disabled"
        />
      </template>
      <template v-else-if="item.type === 'textarea'">
        <el-input
          v-model="item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :disabled="item.options.disabled"
          :autosize="{ minRows: item.options.minRows }"
        />
      </template>
    </el-form-item>
    <div v-if="selectItem && item && selectItem.id === item.id" class="item-view-action">
      <i class="iconfont icon-icon_clone"></i>
      <i class="iconfont icon-trash"></i>
    </div>
    <div v-if="selectItem && item && selectItem.id === item.id" class="item-view-drag">
      <i class="iconfont icon-drag item-drag"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormViewItem",
  props: ["data", "select", "item", "index"],
  data: function() {
    return {
      selectItem: this.select
    }
  },
  mounted() {
    console.log("formviewitem-mounted");
    console.log(this.data);
  },
  watch: {
    selectItem: {
      handler: function() {
        this.$emit("update:select", this.selectItem);
      },
      deep: true
    }
  },
  methods: {
    handleSelectItem: function() {
      this.selectItem = this.data[this.index];
    }
  }
};
</script>
<style>
.active:hover.active {
  outline: 2px solid #409eff;
  /* border: 2px solid #409eff; */
}
.item-view-drag {
  position: absolute;
  left: -2px;
  top: -2px;
  height: 28px;
  line-height: 28px;
  z-index: 9;
  background-color: #409eff;
}

.item-view-drag i {
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  cursor: move;
}
.item-container {
  border: 1px dashed #c2c2c3;
  /* outline-offset: 2px; */
  position: relative;
  padding-bottom: 10px;
  background-color: #fafafa;
}
.item-container:hover {
  background-color: #f3f6fc;
  border: 1px solid #7cbcfe;
}
.item-view-action {
  margin-top: 28px;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #409eff;
  width: 40px;
  height: 25px;
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
}
</style>
