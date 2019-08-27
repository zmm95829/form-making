<template>
  <div class="form-container">
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
      <transition-group name="fade" tag="div" style="min-height: 50px;">
      <slot/>
      </transition-group>
      </draggable>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["system_project", "system_select"])
  },
  methods: {
handleMoveAdd: function(arr, val) {
     const newIndex = val.newIndex;
      // 为拖拽到容器的元素添加唯一id     
      const id = Date.parse(new Date());
      // 不删除再添加的话不能动态相应id和model，但是删除再添加会闪一下
      arr.splice(newIndex, 1, merge(cloneDeep(arr[newIndex]), {
        id,
        model: arr[newIndex].type + "_key_" + id
      }));
        this.$store.commit("SET_SELECT", arr[newIndex]);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "~@/style/draggable.styl";
</style>