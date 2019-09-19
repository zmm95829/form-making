import { getFormCode } from "@/views/container/js/generateFormCode.js";

/**
 * 获取model
 * @param {*} list 数据数组
 */
export function getModel(list) {
  let model = {};
  list.map(v => v.self.model).forEach((v, index) => {
    switch (list[index].type) {
      case "checkbox":
        model[v] = list[index].self.options && list[index].self.remote ? [] : list[index].self.defaultValue.split(",");
        break;
      case "grid":
        list[index].columns.forEach(vv => {
          model = {...model, ...getModel(vv.list)};
        });
        break;
      case "collapse":
        list[index].items.forEach(vv => {
          model = {...model, ...getModel(vv.list)};
          model = {...model, ...getModel(vv.top.list)};
        });
        break;
      case "form":
        model = {...model, ...getModel(list[index].list)};
        break;
      case "placeholder":
      case "link":
        break;
      case "upload":
        model[v] = [];
        break;
      default:
        model[v] = list[index].self.options && list[index].self.remote ? "" : (list[index].self.options && list[index].self.defaultValue) || "";
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
        dict[v.self.model + "_options"] = v.self.remote ? [] : v.self.options;
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
 * 生成导入语句
 * @param {*} list 数据数组
 */
export function generateImports(list, formConfig, constant = null) {
  let re = "";
  const constants = constant || generateConstants(list);
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
/**
 * 生成常量数组
 * @param {*} list 数据
 */
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
        if (v.options && v.self.remote) {
          constants.push(v.self.remoteConstant);
        }
        break;
    }
  });
  return constants;
}

/**
 * 生成简单正则必填规则
 * @param {*} list 数组数据
 */
export function getRules(list) {
  let rules = {};
  list.forEach(v => {
    if (v.elItem && v.elItem.required) {
      rules[v.self.model] = [{ required: true, message: "必填", trigger: "blur" }]
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
 * 获取vue混入对象
 */
export function generateVueMixins(list, formConfig, getString = false) {
  const re = {
    created() {
      this.$options.template = `${getFormCode(this.data.list, this.formConfig)}`;
      this.page.rules = getRules(this.data.list);
      this.model = getModel(this.data.list);
      this.dict = getDictOptions(this.data.list);
    },
    computed: {},
    mounted() {}
  }
  return re;
}
