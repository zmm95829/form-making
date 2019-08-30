import {getDict} from "@/api/cofco";
import * as constantObj from "@/constants/cofco";
import {getFormCode} from "./generateFormCode.js";
import { arrayToString } from "@/utils/helper.js";
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
      case "collapse":
        list[index].items.forEach(vv => {
          model = {...model, ...getFormModel(vv.list)};
          model = {...model, ...getFormModel(vv.top.list)};
        });
        break;
      case "form":
        model = {...model, ...getFormModel(list[index].list)};
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
 * 获取页面需要的变量
 * @param {*} list 数据数组
 */
export function getPageItems(list) {
  const page = {};
  list.forEach(v => {
    switch (v.type) {
      case "collapse":
        page[v.model] = v.options.defaultValue;
        break;
      default: break;
    }
  });
  return page;
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
      case "form":
        dict = {...dict, ...getDictOptions(v.list)};
        break;
      case "collapse":
        v.items.forEach(vv => {
          dict = {...dict, ...getDictOptions(vv.top.list)};
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
    } else {
      switch (v.type) {
        case "grid":
          v.columns.forEach(vv => {
            rules = {...rules, ...getRules(vv.list)};
          });
          break;
        default: break;
      }
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
  ${formConfig ? `import Sticky from "@/components/Sticky";
  import FormButtonGroup from "@/components/FormButtonGroup";` : `
  import { canEditFun } from "@/utils/buttonAuthority";
  import ListTable from "@/components/ShowTable/ListTable";
`}
  `;
  const constants = generateConstants(list);
  if (constants.length) {
    re += "import { getDict } from \"@/api/dict\";";
    re += `
    import { ${constants.join(", ")} } from "@/constants/dict";
      `;
  }
  if (formConfig && formConfig.hasFlow) {
    re += `  import { ${formConfig.flowKey} } from "@/constants/process";
    `
  }
  return re;
}
export function generateConstants(list) {
  let constants = [];
  list.forEach(v => {
    switch (v.type) {
      case "grid":
        v.columns.forEach(vv => {
          constants = [...constants, ...generateConstants(vv.list)];
        });
        break;
      case "collapse":
        v.items.forEach(vv => {
          constants = [...constants, ...generateConstants(vv.list)];
          constants = [...constants, ...generateConstants(vv.top.list)];
        });
        break;
      case "form":
        constants = [...constants, ...generateConstants(v.list)];
        break;
      default:
        if (v.options && v.options.remote) {
          constants.push(v.options.remoteConstant);
        }
        break;
    }
  });
  return constants;
}
/**
 * 查询页面获取动态列的对象
 * @param {*} list 数据数组
 */
function getColumnOptions(list) {
  return list.filter(v => v.type === "list_table").map(v => v.columnOptions);
}
/**
 * 查询页面获取查询的字段
 * @param {*} list 数据数组
 */
function getColumns(list) {
  let re = "";
  list.forEach(v => {
    switch (v.type) {
      case "list_table":
        re = v.columns.map(vv => v.substr(5));
        break;
      default: break;
    }
  });
  return arrayToString(re);
}
/**
 * 获取vue混入对象
 */
export function generateVueMixins(list, formConfig, getString = false) {
  const re = {
    created() {
      this.$options.template = `${getFormCode(this.data, this.formConfig)}`;
      this.page.rules = getRules(this.data.list);
      this.model = getFormModel(this.data.list);
      this.dict = getDictOptions(this.data.list);
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
          return Promise.resolve()${formConfig ? "" : `
          .then(v => this.handleSearch());
          `}
        }${formConfig ? `,
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
        }` : `,
        /**
         * 表格数据是否允许显示编辑等按钮
         * 数据是本部门的：角色有编辑权限的显示编辑按钮
         * 数据是下级部门的：只能有查看按钮
         */
        allowEdit: function(row) {
          return row.deptCode === this.currentAccount.departments[0].oaCode && this.canEdit;
        },
        pageList: function(page) {
          const pageInfo = page || {
            startPage: 1,
            pageSize: 10
          };
          const ba = {
            columns: columns,
            filters: ${getFilters(list)},
            sortings: [
              {
                ascending: false,
                orderBy: "createdDate"
              }
            ],
            startPage: pageInfo.startPage - 1,
            pageSize: pageInfo.pageSize
          };
          return ba;
        },
        /**
         * 查询报告信息
         */
        handleSearch(page) {
          if (!pagel) {
            this.page.isFirstPage = !this.page.isFirstPage;
          }
          // const _this = this;
          // _this.page.loading = true;
          // return paginate(this.pageList(page)).then(result => {
          //   _this.tableData = result.data;
          //   _this.$set(_this.page, "total", result.pageInfo.totalRecords);
          // }).then(() => {
          //   _this.page.loading = false;
          // });
        }`}${formConfig && formConfig.hasFlow ? `,
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

function getFilters(list) {
  let re = "{";
  list.forEach(v => {
    switch (v.type) {
      case "collapse":
        // 结构：折叠面板 第一个item top中仅有一个form 里面都是基础元素
        let aaa = v.items[0].top.list[0].list
          .filter(v => v.options.operator)
          .map(vv => {
            return {
              "model": vv.model,
              "operator": vv.options.operator,
              "property": vv.options.property
            }
          });
        let bbb = v.items[0].list[0].list.filter(v => v.options.operator).map(vv => { return {"model": vv.model, "operator": vv.options.operator, "property": vv.options.property} });
        [...aaa, ...bbb].forEach(vvv => {
          re += `"${vvv.property + vvv.operator}": this.model.${vvv.model},`;
        });
        re = re.slice(0, -1) + "}";
        break;
      default: break;
    }
  });
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
  const page = Object.assign({loading: true}, getPageItems(list));
  page["rules"] = getRules(list);
  let columnOptions = "";
  if (formConfig && formConfig.hasFlow) {
    page[formConfig.flowKey] = formConfig.flowKey;
  } else {
    page["isFirstPage"] = true;
    page["total"] = 0;
    columnOptions = JSON.stringify(getColumnOptions(list));
  }
  const vue = `{
            // name: "form",
            // el: "#app",
            components: {
              ${formConfig ? `Sticky,
              FormButtonGroup` : "ListTable"}
            },
            data: function() {
              return {
                ${formConfig ? "" : `canEdit: false,
                tableData: [],
                columnOptions: ${columnOptions.substr(1, columnOptions.length - 2)},
                `}
                model: ${JSON.stringify(model)},
                dict: ${JSON.stringify(dict)},
                page: ${JSON.stringify(page)},
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

  ${formConfig ? `const columns = ${getColumns(list)};` : ""}
  export default ${vue}
  </script>`;
  return re;
}
export default generateScriptCode;
