import { getFormCode } from "../../../js/generateFormCode.js";
import { getModel, getDictOptions, generateConstants, generateImports, getRules } from "../../../js/generateScriptCode.js";
import content from "./formTemplate";
import { jsonFormat, getPath } from "@/utils/helper.js";
import { objectFilter } from "../../../../../utils/helper.js";
// const placeholderArr = [
//   "$placeholder_txnKey",
//   "$placeholder_html",
//   "$placeholder_import",
//   "$placeholder_model",
//   "$placeholder_dict",
//   "$placeholder_page",
//   "$placeholder_rule"
//   "$placeholder_getDicts",
//   "$placeholder_methods"
// ];
export default function(list, formConfig) {
  let re = content;
  re = re.replace(/\$placeholder_txnKey/g, formConfig.flowKey)
  re = re.replace("$placeholder_html", getFormCode(list, formConfig));

  const constants = generateConstants(list);
  re = re.replace("$placeholder_import", generateImports(list, null, constants));

  re = re.replace("$placeholder_model", jsonFormat(JSON.stringify(getModel(list)), false));
  const dicts = getDictOptions(list);
  re = re.replace("$placeholder_dict", jsonFormat(JSON.stringify(dicts), false));
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
  re = re.replace("$placeholder_rule", jsonFormat(JSON.stringify(getRules(list)), false));
  re = re.replace("$placeholder_getDicts", getDictItems);
  re = re.replace("$placeholder_methods", getMethods(list));
  return re;
};

/**
 * 方法
 * @param {*} list 数据
 */
export function getMethods(list) {
  // 有上传附件时
  const kpmgFiles = objectFilter(getPath(list), (v) => v.includes("kpmg_file"));
  let re = "";
  if (kpmgFiles.length > 0) {
    re += `
    /**
     * 上传组件
     */
    attachAssigned(type, interactionId) {
      this.model[type] = interactionId;
    },`;
  }
  return re;
}
