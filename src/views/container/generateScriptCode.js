/**
 * 获取model
 * @param {*} list 数据数组
 */
export function getFormModel(list) {
  const model = {};
  list.map(v => v.model).forEach((v, index) => {
    if (list[index].type === "checkbox") {
      model[v] = list[index].options.defaultValue.split(",");
    } else {
      model[v] = list[index].options.defaultValue
    }
  });
  return model;
}
/**
 * 获取dict
 * @param {*} list 数据数组
 */
export function getDictOptions(list) {
  const dict = {};
  list.forEach(v => {
    switch (v.type) {
      case "radio":
      case "checkbox":
        dict[v.model + "_options"] = v.options.remote ? [] : v.options.options;
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
export function generateImports(list) {
  if (list.map(v => v.options.remote === true).length) {
    return "import { getDict } from \"@/api/dict\";";
  } else {
    return "";
  }
}
/**
 * 获取vue混入对象
 */
export function generateVueMixins(list, getString = false) {
  const re = {
    created() {
    },
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
    methods: getMethods(getString)
  }
  return re;
}
function getMethods(getString) {
  let re;
  switch (getString) {
    case false:
      re = {
        /**
         * 加载字典数据
         */
        bindDicts: function() {
          return Promise.all([]);
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
      re = `{
        /**
         * 加载字典数据
         */
        bindDicts: function() {
          return Promise.all([]);
        },
        /**
         * 加载表单数据
         */
        bindModel: function() {
          return Promise.resolve();
        }
      }`
      break;
  }
  return re;
}

function generateScriptCode(list) {
  const model = getFormModel(list);
  const dict = getDictOptions(list);
  const mixins = generateVueMixins(list, true);
  const vue = `{
            el: "#app",
            data: function() {
              return {
                model: ${JSON.stringify(model)},
                dict: ${JSON.stringify(dict)},
                page: {
                  loading: true
                }
              }
            },
            mounted: ${mixins.mounted.toString().replace("__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a", "Promise")},
            methods: ${mixins.methods}
      }`;
  const re = `<script type="text/javascript">
      new Vue(${vue})
    </script>`;
  return re;
}
export default generateScriptCode;
