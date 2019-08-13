export const basicElement = [{
  type: "input",
  label: "单行文本",
  icon: "icon-input",
  model: "",
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
    required: false,
    width: "",
    remote: false,
    remoteOptions: [],
    props: {
      value: "value",
      label: "label"
    },
    disabled: false
  }
},
{
  type: "checkbox",
  label: "多选框组",
  icon: "icon-check-box",
  model: "",
  options: {
    inline: false,
    defaultValue: [],
    showLabel: false,
    options: [
      {
        value: "选项1"
      },
      {
        value: "选项2"
      },
      {
        value: "选项3"
      }
    ],
    required: false,
    width: "",
    remote: false,
    remoteOptions: [],
    props: {
      value: "value",
      label: "label"
    },
    remoteFunc: "",
    disabled: false
  }
}];
