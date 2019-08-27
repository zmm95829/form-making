<template>
  <el-dialog :visible.sync="myVisible" :title="title" :append-to-body="true" :close-on-click-modal="false" :center="true" top="2vh" width="1200px">
    <div style="height:720px; overflow-y:auto">
    <slot/>
    </div>
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
