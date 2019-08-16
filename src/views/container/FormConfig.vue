<template>
  <div class="form-config-container">
    <el-tabs v-model="activeName">
    <el-tab-pane label="字段属性" name="first">
      <div class="form-config-first">
      <el-form v-if="showItemConfig" label-position="top" style="padding: 10px">
        <el-form-item label="标签名称">
          <el-input
            v-model="select.label"
          />
        </el-form-item>
        <el-form-item label="绑定字段" v-if="Object.keys(select).indexOf('model')>=0">
          <el-input v-model="select.model"></el-input>
        </el-form-item>
        <el-form-item label="占位内容" v-if="Object.keys(select.options).indexOf('placeholder')>=0">
          <el-input v-model="select.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="'默认值'+(select.type==='checkbox'?'(英文逗号隔开)':'')" v-if="Object.keys(select.options).indexOf('defaultValue')>=0">
          <el-input v-model="select.options.defaultValue"></el-input>
        </el-form-item>
        
        <template v-if="select.type === 'radio' || select.type === 'checkbox'">
           <el-form-item>
            <el-checkbox v-model="select.options.inline">是否行内显示</el-checkbox>
           </el-form-item>
          <el-form-item>
            <el-checkbox v-model="select.options.remote">数据来源于数据库{{ select.options.remote ? "(请输入字典项常量)" : "(请编辑数据源)" }}</el-checkbox>
            <el-input
              v-model="select.options.remoteConstant"
              :title="select.options.remoteConstant"
              :disabled="!select.options.remote"
            />
          </el-form-item>
          <el-form-item v-if="select.options.remote" label="数据绑定key">
            <el-input
              v-model="select.options.remoteProps.value"
              :title="select.options.remoteProps.value"
            />
          </el-form-item>
          <el-form-item v-if="select.options.remote" label="数据显示label">
            <el-input
              v-model="select.options.remoteProps.label"
              :title="select.options.remoteProps.label"
            />
          </el-form-item>
          <el-form-item label="数据源" v-show="!select.options.remote">
            <el-table :data="select.options.options" border style="width: 100%">
              <el-table-column prop="label" label="选项名称" width="130px">
                <template slot-scope="{row}">
                  <el-input v-model="row.label"/>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="选项值" width="130px">
                <template slot-scope="{row}">
                  <el-input v-model="row.value"/>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
           <div style="margin-left: 22px;" v-show="!select.options.remote">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>
    </el-form>
    </div>
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
      <el-form-item>
        <el-checkbox v-model="formConfig.hasFlow">表单走流程</el-checkbox>
      </el-form-item>
      <el-form-item label="表单流程常量" v-if="formConfig.hasFlow">
        <el-input v-model="formConfig.flowKey"/>
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
  },
  methods: {
    handleAddOption: function() {
      this.select.options.options.push({
        value: "",
        label: ""
      });
    },
    handleRemoveOptions: function(index) {
      this.select.options.options.splice(index, 1);
    }
  }
}
</script>
<style scoped>
.form-config-first {
  position: fixed;
  right: 0;
  bottom: 81px;
  height: calc(100% - 240px);
  width: 290px;
  overflow: auto;
}
</style>
