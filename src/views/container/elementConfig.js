const remoteOptions = [
  {
    label: "数据库数据1",
    value: "值1"
  },
  {
    label: "数据库数据2",
    value: "值2"
  }
];
const remoteProps = {
  label: "itemValue",
  value: "id"
};
const itemClass = "ctbms-form__el-form-item";
export const basicElement = [{
  type: "input",
  label: "单行文本",
  icon: "icon-input",
  model: "",
  class: itemClass,
  required: false,
  options: {
    width: "100%",
    defaultValue: "",
    required: false,
    dataType: "string",
    placeholder: "请输入内容",
    disabled: false
  }
},
{
  type: "textarea",
  label: "多行文本",
  icon: "icon-diy-com-textarea",
  model: "",
  class: itemClass + " ctbms-form__el-form-item--full-line",
  required: false,
  options: {
    width: "100%",
    defaultValue: "",
    required: false,
    disabled: false,
    placeholder: "请输入内容",
    minRows: 3
  }
},
{
  type: "radio",
  label: "单选框组",
  icon: "icon-radio-active",
  model: "",
  class: itemClass,
  required: false,
  options: {
    inline: true,
    defaultValue: "值1",
    options: [
      {
        value: "值1",
        label: "选项1"
      },
      {
        value: "值2",
        label: "选项2"
      },
      {
        value: "值3",
        label: "选项3"
      }
    ],
    width: "",
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    disabled: false
  }
},
{
  type: "checkbox",
  label: "多选框组",
  icon: "icon-check-box",
  model: "",
  class: itemClass,
  required: false,
  options: {
    inline: false,
    defaultValue: "值1",
    options: [
      {
        label: "选项1",
        value: "值1"
      },
      {
        label: "选项2",
        value: "值2"
      },
      {
        label: "选项3",
        value: "值3"
      }
    ],
    width: "",
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    disabled: false
  }
},
{
  type: "select",
  label: "下拉选择框",
  icon: "icon-select",
  model: "",
  class: itemClass,
  required: false,
  options: {
    defaultValue: "值1",
    placeholder: "请选择",
    options: [
      {
        label: "选项1",
        value: "值1"
      },
      {
        label: "选项2",
        value: "值2"
      },
      {
        label: "选项3",
        value: "值3"
      }
    ],
    width: "",
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    disabled: false
  }
},
{
  type: "date",
  label: "日期选择器",
  icon: "icon-date",
  class: itemClass,
  model: "",
  required: false,
  options: {
    // defaultValue: "",
    readonly: false,
    disabled: false,
    editable: true,
    clearable: true,
    placeholder: "请选择",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    type: "date",
    format: "yyyy-MM-dd",
    timestamp: false,
    width: ""
  }
}];
