
import { getListCode } from "../../../js/generateFormCode.js";
import { getModel, getDictOptions } from "../../../js/generateScriptCode.js";
import content from "./listTemplate";
import { arrayToString, jsonFormat } from "@/utils/helper.js";
// const placeholderArr = [
//   "$placeholder_listTable_fixedLabel",
//   "$placeholder_listTable_fixedProps",
//   "$placeholder_import",
//   "$placeholder_columns",
//   "$placeholder_components",
//   "$placeholder_columnOptions",
//   "$placeholder_model",
//   "$placeholder_dict",
//   "$placeholder_page",
//   "$placeholder_getDicts",
//   "$placeholder_filters",
//   "$placeholder_html"
// ];
export default function(list) {
  let re = content;

  re = re.replace("$placeholder_html", getListCode(list));
  const listTableItem = list.find(v => v.type === "list_table");
  re = re.replace("$placeholder_listTable_fixedLabel", (listTableItem && listTableItem.fixedLabel) || "TODO:");
  re = re.replace("$placeholder_listTable_fixedProps", (listTableItem && listTableItem.fixedProps) || "TODO:");

  const constants = generateConstants(list);
  re = re.replace("$placeholder_import", generateImports(list, null, constants));
  re = re.replace("$placeholder_columns", "[" + ((listTableItem && arrayToString(listTableItem.columns)).replace(/,/g, `,
  `) || "") + "]");
  re = re.replace("$placeholder_components", "");
  re = re.replace("$placeholder_columnOptions", listTableItem && JSON.stringify(listTableItem.columnOptions).replace(/},/g, `},
  `));
  re = re.replace("$placeholder_model", jsonFormat(JSON.stringify(getModel(list)), false));

  const dicts = getDictOptions(list);
  re = re.replace("$placeholder_dict", jsonFormat(JSON.stringify(dicts)), false);
  re = re.replace("$placeholder_page", "");

  const filterDictsName = [];
  Object.keys(dicts).forEach(v => {
    if (!dicts[v].length) {
      filterDictsName.push(v);
    }
  });
  let getDictItems = "";
  constants.forEach((v, index) => {
    getDictItems += `
    getDict(${v}).then(vv => {
      this.dict["${filterDictsName[index]}"] = vv;
    })`;
    getDictItems += (index !== constants.length - 1 ? "," : "");
  });
  re = re.replace("$placeholder_getDicts", getDictItems);
  re = re.replace("$placeholder_filters", getFilters(list));
  return re;
};
/**
 * 生成导入语句
 * @param {*} list 数据数组
 */
function generateImports(list, formConfig, constant = null) {
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
function generateConstants(list) {
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
        if (v.self.options && v.self.remote) {
          constants.push(v.self.remoteConstant);
        }
        break;
    }
  });
  return constants;
}
/**
 * 获取查询的过滤条件
 * @param {*} list 数据
 */
function getFilters(list) {
  let re = "";
  list.forEach(v => {
    switch (v.type) {
      case "collapse":
        // 结构：折叠面板 第一个item top中仅有一个form 里面都是基础元素
        let aaa = v.items[0].top.list[0].list
          .filter(v => v.self.operator)
          .map(vv => {
            return {
              "model": vv.model,
              "operator": vv.self.operator,
              "property": vv.self.property
            }
          });
        let bbb = v.items[0].list[0].list.filter(v => v.self.operator).map(vv => { return {"model": vv.model, "operator": vv.self.operator, "property": vv.self.property} });
        [...aaa, ...bbb].forEach(vvv => {
          re += `"${vvv.property + vvv.operator}": this.model.${vvv.model},`;
        });
        re = re.slice(0, -1);
        break;
      default: break;
    }
  });
  return re.replace(/,/g, `,
  `);
}
