
import { getFormCode } from "../../../js/generateFormCode.js";
import { getModel, getDictOptions, generateConstants, generateImports, getRules } from "../../../js/generateScriptCode.js";
import content from "./formTemplate";
import { jsonFormat } from "@/utils/helper.js";
// const placeholderArr = [
//   "$placeholder_txnKey",
//   "$placeholder_html",
//   "$placeholder_import",
//   "$placeholder_model",
//   "$placeholder_dict",
//   "$placeholder_page",
//   "$placeholder_rule"
//   "$placeholder_getDicts",
// ];
export default function(list, formConfig) {
  let re = content;
  re = re.replace("$placeholder_txnKey", formConfig.flowKey)
  re = re.replace("$placeholder_html", getFormCode(list, formConfig));

  const constants = generateConstants(list);
  re = re.replace("$placeholder_import", generateImports(list, null, constants));

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
  re = re.replace("$placeholder_rule", jsonFormat(JSON.stringify(getRules(list))), false);
  re = re.replace("$placeholder_getDicts", getDictItems);
  return re;
};
