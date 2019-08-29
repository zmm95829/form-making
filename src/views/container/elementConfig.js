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
  icon: "icon-text",
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
  icon: "icon-textarea",
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
  type: "button",
  label: "按钮",
  icon: "",
  model: "",
  class: itemClass,
  subclass: "ctbms-form__el-button--search",
  options: {
    icon: "el-icon-search",
    type: "primary"
  }
},
{
  type: "radio",
  label: "单选框组",
  icon: "icon-radio",
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
export const layoutElement = [
  {
    type: "grid",
    label: "栅格布局",
    icon: "icon-grid",
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: "start",
      align: "top"
    }
  },
  {
    type: "form",
    label: "表单",
    class: "ctbms-form",
    options: {
      labelPosition: "top",
      size: "small",
      labelWidth: "80",
      labelSuffix: ""
    },
    list: []
  },
  {
    type: "collapse",
    label: "折叠面板",
    model: "",
    options: {
      defaultValue: "1",
      class: "ctbms-form-wrap__el-form__collapse--title",
      accordion: true // 是否手风琴模式
    },
    items: [{
      top: {
        list: [],
        tip: "更多查询项"
      },
      title: "查询选项",
      list: [{
        type: "form",
        label: "表单",
        class: "ctbms-form",
        options: {
          labelPosition: "top",
          size: "small",
          labelWidth: "80",
          labelSuffix: ""
        },
        list: []
      }],
      name: "1"
    }]
  }
];
export const customElement = [
  {
    type: "dialog",
    label: "弹窗",
    icon: "icon-dialog",
    class: itemClass,
    subClass: "ctbms-form__el-input--open-dialog",
    required: false,
    options: {
      placeholder: "",
      defaultValue: ""
    }
  },
  {
    type: "span_readonly",
    label: "只读文本",
    icon: "icon-text",
    model: "",
    class: itemClass,
    subClass: "el-form-item__readonly-value",
    required: false,
    options: {
      width: "100%",
      defaultValue: "",
      required: false
    }
  },
  {
    type: "placeholder",
    label: "占位",
    class: itemClass,
    icon: "icon-text"
  }
]
