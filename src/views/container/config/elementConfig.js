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
// 0级：el-form-item的属性
// page：仅系统中会用到的属性
// ...position：元素从根节点开始的路径
// ...type：元素的大分类
// ...needForm：该元素是否需要在form中
// options：el-form-item里面的元素如input等的属性
export const basicElement = [{
  type: "input",
  label: "单行文本",
  icon: "icon-text",
  model: "",
  class: itemClass,
  required: false,
  page: {
    position: "",
    type: "basic"
  },
  options: {
    width: "100%",
    defaultValue: "",
    required: false,
    dataType: "string",
    placeholder: "请输入内容",
    disabled: false,
    operator: "", // 查询条件下查询操作符
    property: "" // 查询条件下完整路径
  }
},
{
  type: "textarea",
  label: "多行文本",
  icon: "icon-textarea",
  model: "",
  class: itemClass + " ctbms-form__el-form-item--full-line",
  required: false,
  page: {
    position: "",
    type: "basic"
  },
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
  page: {
    position: "",
    type: "basic"
  },
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
  page: {
    position: "",
    type: "basic"
  },
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
  page: {
    position: "",
    type: "basic"
  },
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
  page: {
    position: "",
    type: "basic"
  },
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
    disabled: false,
    property: "" // 查询条件下完整路径
  }
},
{
  type: "date",
  label: "日期选择器",
  icon: "icon-date",
  class: itemClass,
  model: "",
  required: false,
  page: {
    position: "",
    type: "basic"
  },
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
    width: "",
    property: "" // 查询条件下完整路径
  }
}];
export const layoutElement = [
  {
    type: "grid",
    label: "栅格布局",
    icon: "icon-grid",
    page: {
      position: ""
    },
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
    generateCode: true,
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
    page: {
      position: ""
    },
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
    page: {
      position: ""
    },
    model: "",
    options: {
      defaultValue: "0",
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
    page: {
      position: "",
      needForm: true
    },
    options: {
      placeholder: "",
      defaultValue: "",
      property: "" // 查询条件下完整路径
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
    page: {
      position: "",
      needForm: true
    },
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
    page: {
      position: "",
      needForm: true
    },
    icon: "icon-text"
  },
  {
    type: "list_table",
    module: "cofco",
    icon: "",
    label: "表格组件",
    columnOptions: [],
    formName: "",
    fixedLabel: "xx编号",
    fixedProps: "",
    operateWidth: "130px",
    columns: [],
    options: [],
    page: {
      position: "",
      swaggerJson: ""
    }
  }
]
