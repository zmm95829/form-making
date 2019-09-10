<template>
  <div class="form-config-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="字段属性" name="first">
        <div class="form-config-first">
          <el-form v-if="showItemConfig" label-position="top" style="padding: 10px">
            <el-form-item label="标签名称">
              <el-input v-model="system_select.label" />
            </el-form-item>
            <el-form-item v-if="Object.keys(system_select).indexOf('generateCode') > 0">
              <el-checkbox v-model="system_select.generateCode">生成代码</el-checkbox>
            </el-form-item>

            <el-form-item v-if="Object.keys(system_select).indexOf('required')>=0">
              <el-checkbox v-model="system_select.required">必填</el-checkbox>
            </el-form-item>
            <el-form-item v-if="Object.keys(system_select.options).indexOf('disabled')>=0">
              <el-checkbox v-model="system_select.options.disabled">只读</el-checkbox>
            </el-form-item>
            <el-form-item
              label="查询表单路径"
              v-if="Object.keys(system_select.options).indexOf('property')>=0"
            >
              <el-select v-model="system_select.options.property" filterable @change="handlePropertyChange">
                <el-option v-for="(item, index) in listTableSuggestArray" :key="index" :value="item">{{ item }}</el-option>
              </el-select>
              <el-input v-model="system_select.options.property" @change="handlePropertyChange"></el-input>
              <el-select v-model="system_select.options.operator" @change="dateTypeChange">
                <el-option value="?EQ">精确匹配</el-option>
                <el-option value="?LK">模糊匹配</el-option>
                <el-option value="?STR">以...开头</el-option>
                <el-option value="?IN">在...之间</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="绑定字段" v-if="Object.keys(system_select).indexOf('model')>=0">
              <el-input v-model="system_select.model"></el-input>
            </el-form-item>
            <el-form-item
              label="占位内容"
              v-if="Object.keys(system_select.options).indexOf('placeholder')>=0 && system_select.type!=='date'"
            >
              <el-input v-model="system_select.options.placeholder"></el-input>
            </el-form-item>
            <el-form-item
              :label="'默认值'+(system_select.type==='checkbox'?'(英文逗号隔开)':'')"
              v-if="Object.keys(system_select.options).indexOf('defaultValue')>=0"
            >
              <el-input v-model="system_select.options.defaultValue"></el-input>
            </el-form-item>
            <template
              v-if="system_select.type === 'radio' || system_select.type === 'checkbox' || system_select.type === 'select'"
            >
              <el-form-item v-if="Object.keys(system_select.options).indexOf('inline')!==-1">
                <el-checkbox v-model="system_select.options.inline">是否行内显示</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="system_select.options.remote"
                >数据来源于数据库{{ system_select.options.remote ? "(请输入字典项常量)" : "(请编辑数据源)" }}</el-checkbox>
                <el-input
                  v-model="system_select.options.remoteConstant"
                  :title="system_select.options.remoteConstant"
                  :disabled="!system_select.options.remote"
                />
              </el-form-item>
              <el-form-item v-if="system_select.options.remote" label="数据绑定key">
                <el-input
                  v-model="system_select.options.remoteProps.value"
                  :title="system_select.options.remoteProps.value"
                />
              </el-form-item>
              <el-form-item v-if="system_select.options.remote" label="数据显示label">
                <el-input
                  v-model="system_select.options.remoteProps.label"
                  :title="system_select.options.remoteProps.label"
                />
              </el-form-item>
              <el-form-item label="数据源" v-show="!system_select.options.remote">
                <el-table :data="system_select.options.options" border>
                  <el-table-column prop="label" label="选项名称" width="100px">
                    <template slot-scope="{row}">
                      <el-input v-model="row.label" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="选项值" width="100px">
                    <template slot-scope="{row}">
                      <el-input v-model="row.value" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="50px">
                    <template slot-scope="{$index}">
                      <el-button type="text" @click="handleRemoveOptions($index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <div style="margin-left: 22px;" v-show="!system_select.options.remote">
                <el-button type="text" @click="handleAddOption">添加选项</el-button>
              </div>
            </template>
            <template
              v-if="['date', 'week', 'month', 'year', 'daterange', 'monthrange'].includes(system_select.options.type)"
            >
              <el-form-item label="控件类型">
                <el-select v-model="system_select.options.type" @change="dateTypeChange">
                  <el-option value="date">日期</el-option>
                  <el-option value="week">周</el-option>
                  <el-option value="month">月</el-option>
                  <el-option value="year">年</el-option>
                  <el-option value="daterange">日期范围</el-option>
                  <el-option value="monthrange">月份范围</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="格式">
                <el-input v-model="system_select.options.format"></el-input>
              </el-form-item>
              <el-form-item
                label="占位内容"
                v-if="['date', 'week', 'month', 'year'].includes(system_select.options.type)"
              >
                <el-input v-model="system_select.options.placeholder"></el-input>
              </el-form-item>
              <el-form-item
                label="占位内容"
                v-if="['daterange', 'monthrange'].includes(system_select.options.type)"
              >
                <el-input
                  v-model="system_select.options.startPlaceholder"
                  style="width:46%; float:left;"
                ></el-input>-
                <el-input v-model="system_select.options.endPlaceholder" style="width:46%;"></el-input>
              </el-form-item>
            </template>
            <template v-if="system_select.type === 'grid'">
              <el-form-item label="列占位" style="float:left;">
                <el-button type="text" @click="handleColAddClick">添加列</el-button>
                <br />
                <template v-for="(col, index) in system_select.columns">
                  <el-input-number
                    v-model="col.span"
                    :key="index + 'input'"
                    :step="1"
                    :min="1"
                    :max="24"
                  ></el-input-number>
                  <el-button
                    v-if="index !== 0"
                    :key="index + 'delete'"
                    type="text"
                    @click="handleColDeleteClick(index)"
                  >删除</el-button>
                </template>
              </el-form-item>
              <el-form-item label="水平排列方式">
                <el-select v-model="system_select.options.justify">
                  <el-option value="start">start</el-option>
                  <el-option value="end">end</el-option>
                  <el-option value="center">center</el-option>
                  <el-option value="space-around">space-around</el-option>
                  <el-option value="space-between">space-between</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="垂直排列方式">
                <el-select v-model="system_select.options.align">
                  <el-option value="top">top</el-option>
                  <el-option value="middle">middle</el-option>
                  <el-option value="bottom">bottom</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="栅格间隔">
                <el-input-number v-model="system_select.options.gutter" :step="1" :min="0"></el-input-number>
              </el-form-item>
            </template>
            <template v-if="system_select.type === 'form'">
              <el-form-item label="标签对齐方式">
                <el-radio-group v-model="system_select.options.labelPosition">
                  <el-radio-button label="left">左对齐</el-radio-button>
                  <el-radio-button label="right">右对齐</el-radio-button>
                  <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="表单字段宽度">
                <el-input-number
                  v-model="system_select.options.labelWidth"
                  :min="0"
                  :max="200"
                  :step="10"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="组件尺寸">
                <el-radio-group v-model="system_select.options.size">
                  <el-radio-button label="medium">medium</el-radio-button>
                  <el-radio-button label="small">small</el-radio-button>
                  <el-radio-button label="mini">mini</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="后缀">
                <el-input v-model="system_select.options.labelSuffix" />
              </el-form-item>
            </template>
            <template v-if="system_select.type === 'list_table'">
              <el-form-item label="跳转的表单名称">
                <el-input v-model="system_select.formName"></el-input>
              </el-form-item>
              <el-form-item label="固定列标题">
                <el-input v-model="system_select.fixedLabel"></el-input>
              </el-form-item>
              <el-form-item label="固定列props">
                <el-select v-model="system_select.fixedProps">
                  <el-option v-for="(item, index) in system_select.columnOptions" :key="index" :value="item.props">{{ item.label }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-more" size="mini" type="primary" @click="hanldeListTableOpen(true)">设置列</el-button>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-more" size="mini" type="primary" @click="hanldeListTableOpen(false)">设置查询字段</el-button>
              </el-form-item>
              <my-dialog :title="dialogTitle" :visible.sync="visible">
                <!-- 设置列信息 -->
                <template v-if="dialogType">
                  <el-button size="mini" type="primary" @click="hanldeListTableAdd">新增</el-button>
                  <el-table :data="system_select.columnOptions" >
                    <el-table-column label="label">
                      <template slot-scope="{row}">
                        <el-input v-model="row.label"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="props">
                      <template slot-scope="{row}">
                        <el-select v-model="row.props">
                          <el-option v-for="(item, index) in listTableSuggestArray" :key="index" :value="item">{{item}}</el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="width">
                      <template slot-scope="{row}">
                        <el-input v-model="row.width"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="{$index}">
                        <el-button type="text" @click="hanldeListTableDelete($index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <template v-else>
                  <div style="display: flex;flex-direction: row;">
                    <el-input v-model="system_select.page.swaggerJson" :autosize="{minRows: 3}" type="textarea" style="width: 50%;"></el-input>
                    <vue-json-pretty
                      v-model="system_select.columns"
                      :data="JSON.parse(system_select.page.swaggerJson || '{}')"
                      :highlightMouseoverNode="true"
                      :deep="1"
                      :showSelectController="true"
                      selectableType="multiple"
                      :pathSelectable="columnsSelectable"
                    />
                  </div>
                </template>
              </my-dialog>
            </template>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="system_project.page.indexOf('form')!==-1" label="表单属性" name="second">
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
            <el-input v-model="formConfig.flowKey" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="formConfig.labelSuffix" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { MyDialog } from "@/components/index.js";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty"
export default {
  props: ["formConfig"],
  components: {
    MyDialog,
    VueJsonPretty
  },
  data() {
    return {
      activeName: "first",
      visible: false,
      dialogTitle: ""
    }
  },
  computed: {
    ...mapGetters(["system_project", "system_select", "system_data"]),
    /**
     * 是否显示表单项属性编辑项
     */
    showItemConfig: function() {
      return this.system_select && this.system_select.options;
    },
    /**
     * 弹窗显示设置列信息（true）设置要查的字段（false）
     */
    dialogType: function() {
      return this.dialogTitle === "设置列信息";
    },
    listTableSuggestArray: function() {
      let re = [];
      if (this.system_select.type === "list_table") {
        re = this.system_select;
      } else {
        re = this.system_data.list.filter(v => v.type === "list_table");
        re = re && re[0];
      }
      re = (re && re.columns.map(v => v.substr(5))) || [];
      return re;
    }
  },
  methods: {
    handleAddOption: function() {
      this.system_select.options.options.push({
        value: "",
        label: ""
      });
    },
    handleRemoveOptions: function(index) {
      this.system_select.options.options.splice(index, 1);
    },
    dateTypeChange: function() {
      switch (this.system_select.options.type) {
        case "date":
          this.system_select.options.format = "yyyy-MM-dd"
          break;
        case "week":
          this.system_select.options.format = "yyyy年第WW周"
          break;
        case "month":
          this.system_select.options.format = "yyyy-MM"
          break;
        case "year":
          this.system_select.options.format = "yyyy"
          break;
        case "daterange":
          this.system_select.options.format = "yyyy-MM-dd HH:mm:ss"
          break;
        case "monthrange":
          this.system_select.options.format = "yyyy-MM"
          break;
        default: break;
      }
    },
    handleColAddClick: function() {
      this.system_select.columns.push({
        span: 1,
        list: []
      });
    },
    handleColDeleteClick: function(index) {
      this.system_select.columns.splice(index, 1);
    },
    hanldeListTableOpen: function(setCol) {
      this.visible = true;
      this.dialogTitle = setCol ? "设置列信息" : "设置查询字段";
    },
    hanldeListTableAdd: function() {
      this.system_select.columnOptions.push({
        label: "",
        props: "",
        width: "100px"
      });
    },
    hanldeListTableDelete: function(index) {
      this.system_select.columnOptions.splice(index, 1);
    },
    /**
     * 完整路径填写完成后，自动填充model
     */
    handlePropertyChange: function() {
      this.system_select.model = this.system_select.options.property.split(".")[0] || this.system_select.model;
    },
    columnsSelectable(itemPath, itemData) {
      if (typeof itemData === "object") {
        return false
      } else {
        return true;
      }
    }
  }
}
</script>
<style scoped>
.form-config-first {
  position: fixed;
  right: 0;
  bottom: 81px;
  height: calc(100% - 180px);
  width: 290px;
  overflow: auto;
}
</style>
