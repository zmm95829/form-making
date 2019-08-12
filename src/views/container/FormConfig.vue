<template>
  <div class="form-config-container">
    <el-tabs v-model="activeName">
    <el-tab-pane label="字段属性" name="first">
      <el-form v-if="showItemConfig" label-position="top" style="padding: 10px">
        <el-form-item label="标签名称">
          <el-input
            v-model="select.label"
          />
        </el-form-item>
        <el-form-item label="绑定字段" v-if="Object.keys(select.options).indexOf('placeholder')>=0">
          <el-input v-model="select.model"></el-input>
        </el-form-item>
        <el-form-item label="占位内容" v-if="Object.keys(select.options).indexOf('placeholder')>=0">
          <el-input v-model="select.options.placeholder"></el-input>
        </el-form-item>
    </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="second">
      <el-form label-position="top" style="padding: 10px">
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="formConfig.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单字段宽度">
        <el-input-number v-model="formConfig.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="formConfig.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  props: ["formConfig", "select"],
  data() {
    return {
      activeName: "first"
    }
  },
  computed: {
    /**
     * 是否显示表单项属性编辑项
     */
    showItemConfig: function() {
      return this.select && this.select.options;
    }
  }
}
</script>
