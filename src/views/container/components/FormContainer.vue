<template>
  <div class="form-container placeholder-container">
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
          <slot />
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Draggable from "vuedraggable";
import { handleMoveAdd } from "./helper.js";
export default {
  name: "",
  props: {
    formConfig: {
      type: Object,
      default: () => { }
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
      handleMoveAdd(arr, val);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/style/draggable.styl';
.form-container
  padding-top 5px
</style>
