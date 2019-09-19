<template>
  <div class="form-config-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="字段属性" name="first">
        <div class="form-config-first">
          <el-form v-if="showItemConfig" label-position="top" style="padding: 10px">
            <el-form-item v-if="Object.keys(system_select).indexOf('generateCode') > 0">
              <el-checkbox v-model="system_select.generateCode">生成代码</el-checkbox>
            </el-form-item>
            <!-- -------------------------------cofco项目---------------------------- -->
            <template v-if="system_project.name === 'cofco'">
              <el-form-item
                label="查询表单路径"
                v-if="Object.keys(system_select.self).indexOf('property')>=0"
              >
                <el-select
                  v-model="system_select.self.property"
                  filterable
                  @change="handlePropertyChange"
                >
                  <el-option
                    v-for="(item, index) in swagger"
                    :key="index"
                    :value="item"
                  >{{ item }}</el-option>
                </el-select>
                <el-input v-model="system_select.self.property" @change="handlePropertyChange"></el-input>
                <el-select v-model="system_select.self.operator" @change="dateTypeChange">
                  <el-option value="?EQ">精确匹配</el-option>
                  <el-option value="?LK">模糊匹配</el-option>
                  <el-option value="?STR">以...开头</el-option>
                  <el-option value="?IN">在...之间</el-option>
                </el-select>
              </el-form-item>
            </template>
            <!-- -------------------------------cofco项目---------------------------- -->
            <el-form-item v-if="system_select.self.label" label="名称">
              <el-input
                v-model="system_select.self.label"
              />
            </el-form-item>
            <!-- ----------------------------------------button、link------------------------------- -->
             <el-form-item v-if="Object.keys(system_select.self).includes('icon')" label="图标">
              <el-select v-model="system_select.self.icon" placeholder="请选择" filterable clearable>
                <el-option
                  v-for="(item, index) in elementIcon"
                  :key="index"
                  :label="item"
                  :value="item">
                  <i :class="item"/>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item }}</span>
                </el-option>
            </el-select>
            </el-form-item>
            <!-- ----------------------------------------button、link------------------------------- -->
            <!-- ----------------------------------------link------------------------------- -->
             <el-form-item v-if="Object.keys(system_select.self).includes('elType')" label="类型">
              <el-select v-model="system_select.self.elType" placeholder="请选择" filterable clearable>
                <el-option
                  v-for="(item, index) in elementType"
                  :key="index"
                  :label="item"
                  :value="item">
                  <el-link :type="item">{{ item }}</el-link>
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item v-if="Object.keys(system_select.self).indexOf('underline')!==-1">
              <el-checkbox v-model="system_select.self.underline">是否显示下划线</el-checkbox>
            </el-form-item>
             <el-form-item label="链接网址" v-if="Object.keys(system_select.self).indexOf('href') !== -1">
              <el-input v-model="system_select.self.href"></el-input>
            </el-form-item>
            <!-- ----------------------------------------link------------------------------- -->
            <!-- ----------------------------------------input_number------------------------------- -->
            <template v-if="system_select.type === 'input_number'">
              <el-form-item label="最小值">
                 <el-input-number v-model="system_select.self.min" :max="system_select.self.max ? system_select.self.max : Infinity"></el-input-number>
              </el-form-item>
              <el-form-item label="最大值">
                 <el-input-number v-model="system_select.self.max" :min="system_select.self.min ? system_select.self.min : -Infinity"></el-input-number>
              </el-form-item>
              <el-form-item label="计数器步长">
                <el-input v-model.number="system_select.self.step"></el-input>
              </el-form-item>
              <el-form-item label="数值精度">
                <el-input v-model.number="system_select.self.precision"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="system_select.self['step-strictly']">是否只能输入step的倍数</el-checkbox>
              </el-form-item>
            </template>
            <!-- ----------------------------------------input_number------------------------------- -->
            <!-- ----------------------------------------switch------------------------------- -->
            <template v-if="system_select.type === 'switch'">
              <el-form-item label="宽度">
                 <el-input-number v-model="system_select.self.width"/>
              </el-form-item>
              <el-form-item label="打开时的文字描述">
                 <el-input v-model="system_select.self['active-text']"/>
              </el-form-item>
              <el-form-item label="关闭时的文字描述">
                 <el-input v-model="system_select.self['inactive-text']"/>
              </el-form-item>
              <el-form-item label="打开时的值">
                 <el-input v-model="system_select.self['active-value']"/>
              </el-form-item>
              <el-form-item label="关闭时的值">
                 <el-input v-model="system_select.self['inactive-value']"/>
              </el-form-item>
              <el-form-item label="打开时的背景色">
                 <el-color-picker v-model="system_select.self['active-color']"/>
              </el-form-item>
              <el-form-item label="关闭时的背景色">
                 <el-color-picker v-model="system_select.self['inactive-color']"/>
              </el-form-item>
            </template>
            <!-- ----------------------------------------switch------------------------------- -->
            <!-- ----------------------------------------tag------------------------------- -->
            <template v-if="system_select.type === 'tag'">
              <el-form-item label="主题">
                <el-radio-group v-model="system_select.self.effect" size="small">
                  <el-radio-button label="light">light</el-radio-button>
                  <el-radio-button label="dark">dark</el-radio-button>
                  <el-radio-button label="plain">plain</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="system_select.self.closable">是否可以关闭</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="system_select.self.canAddNew">是否可以新增</el-checkbox>
              </el-form-item>
              <el-form-item v-if="system_select.self.canAddNew" label="新增按钮的标题">
                <el-input v-model="system_select.self.canAddNewTitle"/>
              </el-form-item>
              <el-form-item label="tag数据">
                <el-tag
                  :key="index"
                  v-for="(sub, index) in system_select.self.options"
                  closable
                  :size="mini"
                  @close="handleTagClose(index)"
                  >
                  {{ sub }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="tag.inputVisible"
                  v-model="tag.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">新增</el-button>
              </el-form-item>
            </template>
            <!-- ----------------------------------------tag------------------------------- -->
            <el-form-item
              label="占位内容"
              v-if="Object.keys(system_select.self).indexOf('placeholder')>=0 && system_select.type!=='date'"
            >
              <el-input v-model="system_select.self.placeholder"></el-input>
            </el-form-item>
            <el-form-item
              :label="'默认值'+(system_select.type==='checkbox'?'(英文逗号隔开)':'')"
              v-if="Object.keys(system_select.self).indexOf('defaultValue')>=0"
            >
              <el-input v-model="system_select.self.defaultValue"></el-input>
            </el-form-item>
            <template
              v-if="system_select.type === 'radio' || system_select.type === 'checkbox' || system_select.type === 'select'"
            >
              <el-form-item v-if="Object.keys(system_select.self).indexOf('inline')!==-1">
                <el-checkbox v-model="system_select.self.inline">是否行内显示</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="system_select.self.remote"
                >数据来源于数据库{{ system_select.self.remote ? "(请输入字典项常量)" : "(请编辑数据源)" }}</el-checkbox>
                <el-input
                  v-model="system_select.self.remoteConstant"
                  :title="system_select.self.remoteConstant"
                  :disabled="!system_select.self.remote"
                />
              </el-form-item>
              <el-form-item v-if="system_select.self.remote" label="数据绑定key">
                <el-input
                  v-model="system_select.self.remoteProps.value"
                  :title="system_select.self.remoteProps.value"
                />
              </el-form-item>
              <el-form-item v-if="system_select.self.remote" label="数据显示label">
                <el-input
                  v-model="system_select.self.remoteProps.label"
                  :title="system_select.self.remoteProps.label"
                />
              </el-form-item>
              <el-form-item label="数据源" v-show="!system_select.self.remote">
                <el-table :data="system_select.self.options" border>
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
              <div style="margin-left: 22px;" v-show="!system_select.self.remote">
                <el-button type="text" @click="handleAddOption">添加选项</el-button>
              </div>
            </template>
            <template
              v-if="['date', 'week', 'month', 'year', 'daterange', 'monthrange'].includes(system_select.self.type)"
            >
              <el-form-item label="控件类型">
                <el-select v-model="system_select.self.type" @change="dateTypeChange">
                  <el-option value="date">日期</el-option>
                  <el-option value="week">周</el-option>
                  <el-option value="month">月</el-option>
                  <el-option value="year">年</el-option>
                  <el-option value="daterange">日期范围</el-option>
                  <el-option value="monthrange">月份范围</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="格式">
                <el-input v-model="system_select.self.format"></el-input>
              </el-form-item>
              <el-form-item
                label="占位内容"
                v-if="['date', 'week', 'month', 'year'].includes(system_select.self.type)"
              >
                <el-input v-model="system_select.self.placeholder"></el-input>
              </el-form-item>
              <el-form-item
                label="占位内容"
                v-if="['daterange', 'monthrange'].includes(system_select.self.type)"
              >
                <el-input
                  v-model="system_select.self.startPlaceholder"
                  style="width:46%; float:left;"
                ></el-input>-
                <el-input v-model="system_select.self.endPlaceholder" style="width:46%;"></el-input>
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
                <el-select v-model="system_select.self.justify">
                  <el-option value="start">start</el-option>
                  <el-option value="end">end</el-option>
                  <el-option value="center">center</el-option>
                  <el-option value="space-around">space-around</el-option>
                  <el-option value="space-between">space-between</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="垂直排列方式">
                <el-select v-model="system_select.self.align">
                  <el-option value="top">top</el-option>
                  <el-option value="middle">middle</el-option>
                  <el-option value="bottom">bottom</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="栅格间隔">
                <el-input-number v-model="system_select.self.gutter" :step="1" :min="0"></el-input-number>
              </el-form-item>
            </template>
            <el-form-item label="组件尺寸" v-if="Object.keys(system_select.self).includes('size')">
              <el-radio-group v-model="system_select.self.size" size="small">
                <el-radio-button label="medium">medium</el-radio-button>
                <el-radio-button label="small">small</el-radio-button>
                <el-radio-button label="mini">mini</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <template v-if="system_select.type === 'form'">
              <el-form-item label="标签对齐方式">
                <el-radio-group v-model="system_select.self.labelPosition" size="small">
                  <el-radio-button label="left">左对齐</el-radio-button>
                  <el-radio-button label="right">右对齐</el-radio-button>
                  <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="表单字段宽度">
                <el-input-number
                  v-model="system_select.self.labelWidth"
                  :min="0"
                  :max="200"
                  :step="10"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="后缀">
                <el-input v-model="system_select.self.labelSuffix" />
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
                  <el-option
                    v-for="(item, index) in system_select.columnOptions"
                    :key="index"
                    :value="item.props"
                  >{{ item.label }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-more"
                  size="mini"
                  type="primary"
                  @click="hanldeListTableOpen(true)"
                >设置列</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-more"
                  size="mini"
                  type="primary"
                  @click="hanldeListTableOpen(false)"
                >设置查询字段</el-button>
              </el-form-item>
              <my-dialog :title="dialogTitle" :visible.sync="visible">
                <!-- 设置列信息 -->
                <template v-if="dialogType">
                  <el-button size="mini" type="primary" @click="hanldeListTableAdd">新增</el-button>
                  <el-table :data="system_select.columnOptions">
                    <el-table-column label="label">
                      <template slot-scope="{row}">
                        <el-input v-model="row.label"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="props">
                      <template slot-scope="{row}">
                        <el-select v-model="row.props">
                          <el-option
                            v-for="(item, index) in swagger"
                            :key="index"
                            :value="item"
                          >{{item}}</el-option>
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
                  <div>
                    将预设的swaggerArray赋值？
                    <!-- <vue-json-pretty
                      v-model="system_select.columns"
                      :data="JSON.parse(swagger || '{}')"
                      :highlightMouseoverNode="true"
                      :deep="1"
                      :showSelectController="true"
                      selectableType="multiple"
                      :pathSelectable="columnsSelectable"
                    /> -->
                  </div>
                  <el-button @click="system_select.columns = swagger;visible=false;">确定</el-button>
                </template>
              </my-dialog>
            </template>
            <!-- ---------------------------------------------表单子项设置----------------------------------------- -->

            <!-- ---------------------------------------------表单子项设置----------------------------------------- -->
            <!-- ---------------------------------------------组件自身设置----------------------------------------- -->
            <template v-if="system_select.self">
              <el-form-item label="绑定字段">
                <el-select v-model="system_select.self.model" style="width: 100%;" filterable clearable allow-create>
                  <el-option
                    v-for="(item, index) in swagger"
                    :key="index"
                    :value="item"
                  >{{item}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="Object.keys(system_select.self).includes('disabled')">
                <el-checkbox v-model="system_select.self.disabled">只读</el-checkbox>
              </el-form-item>
              <template v-if="system_select.type === 'upload'">
                <el-form-item label="action">
                  <el-input v-model="system_select.self.action" />
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="system_select.self.multiple">支持多选文件</el-checkbox>
                </el-form-item>
                <el-form-item label="上传按钮显示文本">
                  <el-input v-model="system_select.self.slot.btnTitle" />
                </el-form-item>
                <el-form-item label="提示文本">
                  <el-input v-model="system_select.self.slot.tip" />
                </el-form-item>
              </template>
              <el-form-item label="css样式名称">
                <el-input v-model="system_select.self.class" />
              </el-form-item>
              <el-form-item label="css样式">
                <el-input
                  v-model="system_select.self.style"
                  :autosize="{minRows: 3}"
                  type="textarea"
                />
              </el-form-item>
            </template>
            <!-- ---------------------------------------------组件自身设置----------------------------------------- -->
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="system_select.elItem" label="表单项属性" name="second">
        <el-form label-position="top" style="padding: 10px">
          <el-form-item>
            <el-checkbox v-model="elItemExist">是表单项(由el-form-item包裹)</el-checkbox>
          </el-form-item>
          <template v-if="system_select.elItem.exist">
            <el-form-item>
              <el-checkbox v-model="system_select.elItem.required">必填</el-checkbox>
            </el-form-item>
            <el-form-item label="标签名称">
              <el-input v-model="system_select.elItem.label" />
            </el-form-item>
            <el-form-item label="css样式名称">
              <el-input v-model="system_select.elItem.class" />
            </el-form-item>
          </template>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="system_project.page.indexOf('form')!==-1" label="表单属性" name="third">
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
import elementIcon from "@/utils/elementIcon";
import elementType from "@/utils/elementType";
import { validateForm } from "@/utils/helper";
export default {
  props: ["formConfig", "swagger"],
  components: {
    MyDialog,
    VueJsonPretty
  },
  data() {
    return {
      activeName: "first",
      visible: false,
      dialogTitle: "",
      elementIcon,
      elementType,
      tag: {
        inputVisible: false,
        inputValue: ""
      }
    }
  },
  computed: {
    ...mapGetters(["system_project", "system_select", "system_data"]),
    /**
     * 是否显示表单项属性编辑项
     */
    showItemConfig: function() {
      return this.system_select && this.system_select.self;
    },
    /**
     * 弹窗显示设置列信息（true）设置要查的字段（false）
     */
    dialogType: function() {
      return this.dialogTitle === "设置列信息";
    },
    /**
     * 是表单项
     */
    elItemExist: {
      get: function() {
        return this.system_select.elItem.exist;
      },
      set: function(val, a) {
        if (validateForm(this.system_select, this.system_select.page.position, val)) {
          this.system_select.elItem.exist = val;
        } else {
          this.$alert("请先拖拽表单，将该元素推拽到表单才能勾选", "提示", { type: "warning" });
        }
      }
    }
  },
  methods: {
    handleAddOption: function() {
      this.system_select.self.options.push({
        value: "",
        label: ""
      });
    },
    handleRemoveOptions: function(index) {
      this.system_select.self.options.splice(index, 1);
    },
    dateTypeChange: function() {
      switch (this.system_select.self.type) {
        case "date":
          this.system_select.self.format = "yyyy-MM-dd"
          break;
        case "week":
          this.system_select.self.format = "yyyy年第WW周"
          break;
        case "month":
          this.system_select.self.format = "yyyy-MM"
          break;
        case "year":
          this.system_select.self.format = "yyyy"
          break;
        case "daterange":
          this.system_select.self.format = "yyyy-MM-dd HH:mm:ss"
          break;
        case "monthrange":
          this.system_select.self.format = "yyyy-MM"
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
      this.system_select.model = this.system_select.self.property.split(".")[0] || this.system_select.model;
    },
    // ----------------------------tag--------------------------
    handleTagClose(index) {
      this.system_select.self.options.splice(index, 1);
    },
    showInput() {
      this.tag.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.tag.inputValue;
      if (inputValue) {
        this.system_select.self.options.push(inputValue);
      }
      this.tag.inputVisible = false;
      this.tag.inputValue = "";
    }
    // ----------------------------tag--------------------------
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
