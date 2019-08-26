import {getDict} from "@/api/cofco";
import * as constantObj from "@/constants/cofco";
/**
 * 获取model
 * @param {*} list 数据数组
 */
export function getFormModel(list) {
  let model = {};
  list.map(v => v.model).forEach((v, index) => {
    switch (list[index].type) {
      case "checkbox":
        model[v] = list[index].options && list[index].options.remote ? [] : list[index].options.defaultValue.split(",");
        break;
      case "grid":
        list[index].columns.forEach(vv => {
          model = {...model, ...getFormModel(vv.list)};
        });
        break;
      case "placeholder":
        break;
      default:
        model[v] = list[index].options && list[index].options.remote ? "" : list[index].options.defaultValue;
        break;
    }
  });
  return model;
}
/**
 * 获取dict
 * @param {*} list 数据数组
 */
export function getDictOptions(list) {
  let dict = {};
  list.forEach(v => {
    switch (v.type) {
      case "radio":
      case "checkbox":
      case "select":
        dict[v.model + "_options"] = v.options.remote ? [] : v.options.options;
        break;
      case "grid":
        v.columns.forEach(vv => {
          dict = {...dict, ...getDictOptions(vv.list)};
        });
        break;
      default: break;
    }
  });
  return dict;
}
/**
 * 生成简单正则必填规则
 * @param {*} list 数组数据
 */
export function getRules(list) {
  let rules = {};
  list.forEach(v => {
    if (v.required) {
      rules[v.model] = [{ required: true, message: "必填", trigger: "blur" }]
    } else if (v.type === "grid") {
      v.columns.forEach(vv => {
        rules = {...rules, ...getRules(vv.list)};
      });
    }
  });
  return rules;
}
/**
 * 生成导入语句
 * @param {*} list 数据数组
 */
export function generateImports(list, formConfig) {
  let re = `
  import { mapGetters } from "vuex";

  import Sticky from "@/components/Sticky";
  import FormButtonGroup from "@/components/FormButtonGroup";
  `;
  if (list.map(v => v.options.remote === true).length) {
    re += `import { getDict } from "@/api/dict";
  `;
    const constants = generateConstants(list);
    if (constants.length) {
      re += `  import { ${constants.join(", ")} } from "@/constants/dict";
      `;
    }
  }
  if (formConfig.hasFlow) {
    re += `  import { ${formConfig.flowKey} } from "@/constants/process";
    `
  }
  return re;
}
export function generateConstants(list) {
  const constants = [];
  list.filter(v => v.options && v.options.remote).forEach(vv => {
    constants.push(vv.options.remoteConstant);
  });
  return constants;
}
/**
 * 获取vue混入对象
 */
export function generateVueMixins(list, formConfig, getString = false) {
  const re = {
    created() {
    },
    computed: {},
    mounted() {
      Promise.resolve()
        .then(() => this.bindDicts())
        .then(() => this.bindModel())
        .catch(e => {
          this.$alert("加载数据出现错误：" + e, "错误", { type: "error" });
          console.error("加载过程中出现错误:", e);
        })
        .then(() => {
          this.page.loading = false;
        });
    },
    methods: getMethods(list, getString, formConfig)
  }
  return re;
}
function getMethods(list, getString, formConfig) {
  let re;
  switch (getString) {
    case false:
      re = {
        /**
         * 加载字典数据
         */
        bindDicts: function() {
          const lists = this.data.list;
          const constants = generateConstants(lists);
          const dicts = getDictOptions(lists);
          const filterDictsName = [];
          Object.keys(dicts).forEach(v => {
            if (!dicts[v].length) {
              filterDictsName.push(v);
            }
          });
          const promises = [];
          constants.forEach((v, index) => {
            promises.push(getDict(constantObj[v]).then(vv => {
              this.dict[filterDictsName[index]] = vv;
            }));
          })
          return Promise.all(promises);
        },
        /**
         * 加载表单数据
         */
        bindModel: function() {
          return Promise.resolve();
        }
      };
      break;
    default:
      const constants = generateConstants(list);
      const dicts = getDictOptions(list);
      const filterDictsName = [];
      Object.keys(dicts).forEach(v => {
        if (!dicts[v].length) {
          filterDictsName.push(v);
        }
      });
      let promises = "[";
      constants.forEach((v, index) => {
        promises += `
        getDict(${v}).then(vv => {
          this.dict["${filterDictsName[index]}"] = vv;
        })`;
        promises += (index !== constants.length - 1 ? "," : "");
      });
      promises += "]";
      re = `{
        /**
         * 加载字典数据
         */
        bindDicts: function() {
          return Promise.all(${promises});
        },
        /**
         * 加载表单数据
         */
        bindModel: function() {
          return Promise.resolve();
        },
        /**
         * 保存数据
         */
        submitForm: function(type, callBack) {
          this.$refs["model"].validate(valid => {
            if (valid) {
              // ...
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "请将必填项填写完整"
              });
            }
          });
          return callBack();          
        }${formConfig.hasFlow ? `,
        /**
         * 在流程审核通过的时候, 更新字段
         */
        beforeComplete(taskUpdateData) {
          if (this.isAuditTaskTypeStart) {
            Object.assign(taskUpdateData, this.model);
          }
        }` : ""}
      }`
      break;
  }
  return re;
}

function generateScriptCode(list, formConfig) {
  const model = getFormModel(list);
  const dict = getDictOptions(list);
  const mixins = generateVueMixins(list, formConfig, true);
  let finds = /__WEBPACK_IMPORTED.*default\.a/.exec(mixins.mounted.toString());
  finds = (finds && finds.join("|")) || null;
  let mounted = mixins.mounted.toString();
  mounted = finds ? mounted.replace(new RegExp("(" + finds + ")", "g"), "Promise") : mounted;

  const vue = `{
            // name: "form",
            // el: "#app",
            components: {
              Sticky,
              FormButtonGroup,
            },
            data: function() {
              return {
                model: ${JSON.stringify(model)},
                dict: ${JSON.stringify(dict)},
                page: {
                  loading: true,
                  rules: ${JSON.stringify(getRules(list))} ${formConfig.hasFlow ? "," : ""}
                  ${formConfig.hasFlow ? formConfig.flowKey : ""}
                }
              }
            },
            computed: {
              /**
              * 引用currentAccount，以便获取当前登陆账户的信息; 引入origin判断取当前环境是否是门户
              */
             ...mapGetters(["origin", "currentAccount"])},
            mounted: ${mounted},
            methods: ${mixins.methods}
      }`;
  // const re = `
  //   <script type="text/javascript">
  //   ${generateImports(list, formConfig)}
  //     // new Vue(${vue})
  //   </script>`;
  const re = `
  <script type="text/javascript">
  ${generateImports(list, formConfig)}
  export default ${vue}
  </script>`;
  return re;
}
export default generateScriptCode;
