<template>
  <el-dialog :visible.sync="myVisible" :title="title" :append-to-body="true" width="900px">
    <slot/>
    <span slot="footer" class="dialog-footer">
      <slot name="footer" />
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  name: "MyDialog",
  data: function() {
    return {
      myVisible: false
    }
  },
  watch: {
    visible: {
      handler: function() {
        this.myVisible = this.visible;
      },
      deep: true
    },
    myVisible: function() {
      this.$emit("update:visible", this.myVisible);
    }
  }
};
</script>
<style>
</style>