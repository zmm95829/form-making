<template>
  <div class="form-view">
    <el-form
      :label-position="formConfig.labelPosition"
      :label-width="formConfig.labelWidth+'px'"
      :size="formConfig.size"
      :label-suffix="formConfig.labelSuffix"
    >
      <draggable
        v-model="data.list"
        @add="handleMoveAdd(data.list, $event)"
        v-bind="{group:'form', ghostClass: 'placeholder', animation: 200, handle: '.item-drag'}"
      >
      <slot/>
      </draggable>
    </el-form>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import { merge, cloneDeep } from "lodash";
export default {
  name: "",
  props: {
    formConfig: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    }
  },
  components: {
    Draggable
  },
  data: function() {
    return {
    }
  },
  methods: {
handleMoveAdd: function(arr, val) {
  console.log("sdfsdfsdfsd")
      const newIndex = val.newIndex;
      // 为拖拽到容器的元素添加唯一id     
      const id = Date.parse(new Date());
      arr[newIndex] = merge(cloneDeep(arr[newIndex]), {
        id,
        model: arr[newIndex].type + "_key_" + id
      });
      this.selectItem = arr[newIndex];
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
</style>