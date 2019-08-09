<template>
  <div class="form-view-container">
    <div class="form-view">
    <el-form :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth+'px'" :size="formConfig.size" :label-suffix="formConfig.labelSuffix">
      <draggable v-model="data.list" @end="handleMoveEnd" @add="handleMoveAdd" :move="handleMove" v-bind="{group:{ name:'form', handle:'.item-drag'}}">
        <template v-for="(item, index) in data.list" >
         <form-view-item :item="item" :key="item.id" :select.sync="selectItem" :index="index" :data="data.list"/>
        </template>
    </draggable>
    </el-form>
    <div v-if="data.list.length === 0" class="form-empty">从左侧拖拽来添加元素</div>
  </div>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import FormViewItem from "./FormViewItem.vue";
export default {
  name: "FormView",
  components: {
    Draggable,
    FormViewItem
  },
  props: ["formConfig", "select"],
  data: function() {
    return {
      data: {
        list: []
      },
      selectItem: this.select
    }
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
    handleMoveAdd: function(val) {
      console.log("add-formview");
      const newIndex = val.newIndex
      console.log(newIndex);
    },
    handleMoveStart: function(val) {
      console.log("start-formview");
      
      // 为拖拽到容器的元素添加唯一id
      const id = Date.parse(new Date());
      this.$set(this.data[newIndex], "id", id);
      //   key,
      //   // 绑定键值
      //   model: this.data.list[newIndex].type + '_' + key,
      //   rules: []
      // })

      // if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
      //   this.$set(this.data.list, newIndex, {
      //     ...this.data.list[newIndex],
      //     options: {
      //       ...this.data.list[newIndex].options,
      //       options: this.data.list[newIndex].options.options.map(item => ({
      //         ...item
      //       }))
      //     }
      //   })
      // }

      // if (this.data.list[newIndex].type === 'grid') {
      //   this.$set(this.data.list, newIndex, {
      //     ...this.data.list[newIndex],
      //     columns: this.data.list[newIndex].columns.map(item => ({...item}))
      //   })
      // }

      // this.selectWidget = this.data.list[newIndex]
      // console.log(val);
      // console.log(this)
    },
    handleMoveEnd: function() {
      // console.log("end-formview");
    },
    handleMove: function() {
      // console.log("move-formview");
    }
  }
};
</script>
<style>
.form-view {
  margin: 10px;
  padding: 2px;
  border: 1px dashed #999999;
  min-height: 500px;
  background-color: #ffffff;
}
.form-view-container {
  background-color: #fafafa;
}
</style>
