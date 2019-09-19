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
// 0级：系统要显示的相关属性
// page：系统中会用到但不显示的属性
// ...position：元素从根节点开始的路径
// ...type：元素的大分类
// ...needForm：该元素是否需要在form中
// self: 自己元素的属性
// elItem: el-form-item的属性
export const basicElement = [{
  type: "input",
  label: "单行文本",
  icon: "icon-text",
  elItem: {
    exist: true,
    required: false,
    label: "单行文本",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    placeholder: "请输入内容",
    defaultValue: ""
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  },
  options: {
    operator: "", // 查询条件下查询操作符
    property: "" // 查询条件下完整路径
  }
},
{
  type: "textarea",
  label: "多行文本",
  icon: "icon-textarea",
  elItem: {
    exist: true,
    required: false,
    label: "多行文本",
    class: itemClass + " ctbms-form__el-form-item--full-line"
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    placeholder: "请输入内容",
    defaultValue: "",
    minRows: 3
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "button",
  label: "按钮",
  icon: "",
  elItem: {
    exist: false,
    required: false,
    label: "按钮",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "ctbms-form__el-button--search",
    icon: "el-icon-search",
    type: "primary",
    label: "按钮"
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "radio",
  label: "单选框组",
  icon: "icon-radio",
  elItem: {
    exist: true,
    required: false,
    label: "单选框组",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    defaultValue: "值1",
    inline: true,
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
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "checkbox",
  label: "多选框组",
  icon: "icon-check-box",
  elItem: {
    exist: true,
    required: false,
    label: "多选框组",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    defaultValue: "值1",
    inline: true,
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
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "select",
  label: "下拉选择框",
  icon: "icon-select",
  elItem: {
    exist: true,
    required: false,
    label: "下拉选择框",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    defaultValue: "值1",
    inline: true,
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
    remote: false,
    remoteConstant: "",
    remoteOptions,
    remoteProps,
    property: "" // 查询条件下完整路径
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "date",
  label: "日期选择器",
  icon: "icon-date",
  class: itemClass,
  elItem: {
    exist: true,
    required: false,
    label: "日期选择器",
    class: itemClass
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    defaultValue: "",
    property: "", // 查询条件下完整路径
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    type: "date",
    format: "yyyy-MM-dd"
  },
  required: false,
  page: {
    position: "",
    type: "basic",
    pid: ""
  },
  options: {
    width: "",
    property: "" // 查询条件下完整路径
  }
},
{
  type: "upload",
  label: "上传",
  icon: "",
  elItem: {
    exist: false, // 是在el-form-item包裹下
    required: false, // 该项必填
    label: "上传", // el-form-item显示的标签
    class: "" // el-form-item的样式
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    action: "",
    multiple: true, // 可以上传多个
    slot: {
      btnTitle: "点击上传", // 按钮的文字
      tip: "" // 提示文字, 为空时不生成div
    }
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "link",
  label: "链接",
  icon: "",
  elItem: {
    exist: false,
    required: false,
    label: "链接",
    class: ""
  },
  self: {
    model: "",
    disabled: false,
    style: "",
    class: "",
    label: "链接",
    elType: "primary",
    underline: true,
    icon: "",
    href: "https://"
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
},
{
  type: "input_number",
  label: "计数器",
  icon: "",
  elItem: {
    exist: false,
    required: false,
    label: "计数器",
    class: ""
  },
  self: {
    defaultValue: 0,
    model: "",
    disabled: false,
    style: "",
    class: "",
    // label: "描述文字"
    placeholder: "",
    size: "",
    precision: "", // 精度
    min: "",
    max: "",
    step: 1,
    "step-strictly": false // 如果这个属性被设置为true，则只能输入步数的倍数
  },
  page: {
    position: "",
    type: "basic",
    pid: ""
  }
}
];
export const layoutElement = [
  {
    type: "grid",
    label: "栅格布局",
    icon: "icon-grid",
    elItem: {
      exist: false,
      required: false,
      label: "栅格布局",
      class: ""
    },
    page: {
      position: "",
      pid: ""
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
    self: {
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
      position: "",
      pid: ""
    },
    self: {
      labelPosition: "top",
      size: "small",
      labelWidth: "80",
      labelSuffix: "",
      class: ""
    },
    list: []
  },
  {
    type: "collapse",
    label: "折叠面板",
    page: {
      position: "",
      pid: ""
    },
    elItem: {
      exist: false,
      required: false,
      label: "折叠面板",
      class: ""
    },
    self: {
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
      list: [ {
        type: "form",
        label: "表单",
        class: "ctbms-form",
        page: {
          position: "",
          pid: ""
        },
        self: {
          align: "top",
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
    elItem: {
      exist: true,
      required: false,
      label: "弹窗",
      class: itemClass
    },
    self: {
      model: "",
      disabled: false,
      style: "",
      class: "ctbms-form__el-input--open-dialog",
      placeholder: "请输入内容",
      defaultValue: "",
      property: "" // 查询条件下完整路径
    },
    page: {
      position: "",
      needForm: true,
      pid: ""
    }
  },
  {
    type: "span_readonly",
    label: "只读文本",
    icon: "icon-text",
    elItem: {
      exist: true,
      required: false,
      label: "只读文本",
      class: itemClass
    },
    self: {
      model: "",
      disabled: false,
      style: "",
      class: "el-form-item__readonly-value",
      placeholder: "请输入内容",
      defaultValue: "",
      property: "" // 查询条件下完整路径
    },
    page: {
      position: "",
      needForm: true,
      pid: ""
    }
  },
  {
    type: "placeholder",
    label: "占位",
    elItem: {
      exist: true,
      required: false,
      label: "占位",
      class: itemClass
    },
    page: {
      position: "",
      needForm: true,
      pid: ""
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
      pid: ""
    }
  },
  {
    type: "kpmg_file",
    module: "cofco",
    icon: "",
    label: "上传附件",
    elItem: {
      exist: true,
      required: false,
      label: "上传附件",
      class: itemClass + " ctbms-form__el-form-item--full-line"
    },
    page: {
      position: "",
      needForm: true,
      pid: ""
    }
  }
]
