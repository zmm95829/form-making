export const data = {
  "list": [{
    "type": "collapse",
    "label": "折叠面板",
    "model": "collapse_key_156706265200085",
    "options": {
      "defaultValue": "1",
      "class": "ctbms-form-wrap__el-form__collapse--title",
      "accordion": true
    },
    "items": [{
      "top": {
        "list": [{
          "type": "form",
          "label": "表单",
          "class": "ctbms-form",
          "options": {
            "labelPosition": "left",
            "size": "small",
            "labelWidth": 80,
            "labelSuffix": ""
          },
          "list": [{
            "type": "input",
            "label": "单行文本",
            "icon": "icon-text",
            "model": "input_key_156706271800088",
            "class": "ctbms-form__el-form-item",
            "required": false,
            "options": {
              "width": "100%",
              "defaultValue": "",
              "required": false,
              "dataType": "string",
              "placeholder": "请输入内容",
              "disabled": false
            },
            "id": "156706271800088"
          }, { "type": "button", "label": "查询", "icon": "", "model": "button_key_156706272500019", "class": "ctbms-form__el-form-item", "subclass": "ctbms-form__el-button--search", "options": { "icon": "el-icon-search", "type": "primary" }, "id": "156706272500019" }],
          "id": "156706270600024",
          "model": "form_key_156706270600024"
        }],
        "tip": "更多查询项"
      },
      "title": "查询选项",
      "list": [{
        "type": "form",
        "label": "表单",
        "class": "ctbms-form",
        "options": {
          "labelPosition": "top",
          "size": "small",
          "labelWidth": 80,
          "labelSuffix": ""
        },
        "list": [{
          "type": "select",
          "label": "审批状态",
          "icon": "icon-select",
          "model": "apprStatus",
          "class": "ctbms-form__el-form-item",
          "required": false,
          "options": {
            "defaultValue": "",
            "placeholder": "请选择",
            "options": [{
              "label": "选项1",
              "value": "值1"
            },
            {
              "label": "选项2",
              "value": "值2"
            },
            {
              "label": "选项3",
              "value": "值3"
            }],
            "width": "",
            "remote": true,
            "remoteConstant":
              "SYS_APPRSTATUS",
            "remoteOptions":
              [{
                "label": "数据库数据1",
                "value": "值1"
              },
              {
                "label": "数据库数据2",
                "value": "值2"
              }
              ],
            "remoteProps": {
              "label": "itemValue",
              "value": "id"
            },
            "disabled": false
          },
          "id": "156706274500030"
        }]
      }],
      "name": "1"
    }],
    "id": "156706265200085"
  }, {
    "type":
      "list_table",
    "icon": "",
    "label": "表格组件",
    "columnOptions": [],
    "formName": "",
    "fixedLabel": "xx编号",
    "fixedProps": "",
    "operateWidth": "130px",
    "options": [],
    "id": "156706279200077",
    "model": "list_table_key_156706279200077"
  }]
}
