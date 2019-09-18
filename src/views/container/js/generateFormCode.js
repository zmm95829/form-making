import { getFormHtmlCofco } from "./generateFormCodeSpecial.js";
function getElFormItemCode(item) {
  let re = "";
  const require = item.elItem && item.elItem.required ? "prop=\"" + item.self.model + "\"" : "";
  if (item.module) {
    switch (item.module) {
      case "cofco":
        re = getFormHtmlCofco(item, require);
        break;
      default: break;
    }
  } else {
    switch (item.type) {
      case "input":
        re = `<el-input v-model="model.${item.self.model}" :disabled=${item.self.disabled} placeholder="${item.self.placeholder}"/>`;
        break;
      case "textarea":
        re = ` <el-input v-model="model.${item.self.model}" :disabled=${item.self.disabled} :autosize="{ minRows: ${item.self.minRows} }" placeholder="${item.self.placeholder}" type="textarea"/>`;
        break;
      case "radio":
        re = `<el-radio-group
            v-model="model.${item.self.model}"
            :disabled="${item.self.disabled}"
          >
          <el-radio 
            style="{display: ${item.self.inline ? "inline-block" : "block"}}"
            :label="itemSub.${item.self.remote ? item.self.remoteProps.value : "value"}"
            v-for="(itemSub, index) in dict.${item.self.model}_options"
            :key="index"
          >
            {{ itemSub.${item.self.remote ? item.self.remoteProps.elItem.label : "label"} }}
          </el-radio>
        </el-radio-group>`;
        break;
      case "checkbox":
        re = `<el-checkbox-group
            v-model="model.${item.self.model}"
            :disabled="${item.self.disabled}"
           
          >
          <el-checkbox 
            style="{display: ${item.self.inline ? "inline-block" : "block"}}"
            :label="itemSub.${item.self.remote ? item.self.remoteProps.value : "value"}"
            v-for="(itemSub, index) in dict.${item.self.model}_options"
            :key="index"
          >
            {{ itemSub.${item.self.remote ? item.self.remoteProps.elItem.label : "label"} }}
          </el-checkbox>
        </el-checkbox-group>`;
        break;
      case "select":
        re = `<el-select v-model="model.${item.self.model}">
          <el-option
            v-for="(itemSub, index) in dict.${item.self.model}_options"
            :key="index"
            :label="itemSub.${item.self.remote ? item.self.remoteProps.elItem.label : "label"}"
            :value="itemSub.${item.self.remote ? item.self.remoteProps.value : "value"}"
          />
        </el-select>`;
        break;
      case "date":
        if (item.self.type.indexOf("range") !== -1) {
          const defaultTime = item.self.type === "daterange" ? ":default-time=\"['00:00:00', '23:59:59']\"" : "";
          re = `<el-date-picker v-model="model.${item.self.model}" type="${item.self.type}" ${defaultTime} format="${item.self.format}" value-format="${item.self.format}" start-placeholder="${item.self.startPlaceholder}" end-placeholder="${item.self.endPlaceholder}" />`;
        } else {
          re = `<el-date-picker v-model="model.${item.self.model}" type="${item.self.type}" format="${item.self.format}" value-format="${item.self.format}" placeholder="${item.self.placeholder}" />`;
        }
        break;
      case "grid":
        let subItems = "";
        item.columns.forEach((col, index) => {
          let subItem = "";
          // 仅一层栅格布局
          col.list.forEach(v => {
            subItem += `${getElFormItemCode(v)}`;
          });
          subItems += item.generateCode ? `<el-col :span="${col.span ? col.span : 0}">
          ${subItem}
          </el-col>` : subItem;
        });
        re = item.generateCode ? `<el-row
          :gutter="${item.self.gutter}"
          type="flex"
          justify="${item.self.justify}"
          align="${item.self.align}"
        >
        ${subItems}
        </el-row>` : subItems;
        break;
      case "form":
        re = getElFormCode(item);
        break;
      case "collapse":
        let items = "";
        item.items.forEach(v => {
          let subItems = `<el-collapse-item title="${v.title}" name="${v.name}">`;
          if (v.top.list.length) {
            subItems += "<template slot='title'>";
            v.top.list.forEach(vv => {
              subItems += getElFormItemCode(vv);
            });
            subItems += "</template>";
          }
          v.list.forEach(vv => {
            subItems += getElFormItemCode(vv);
          });
          subItems += "</el-collapse-item>";
          items += subItems;
        });
        re = `<el-collapse v-model="page.${item.self.model}" class="${item.elItem.class}">
        ${items}
        </el-collapse>
        `
        break;
      case "button":
        re = `<el-button type="${item.self.type}" icon="${item.self.icon}">${item.elItem.label}</el-button>`
        break;
      case "upload":
        re = `<el-upload
          action="${item.self.action}"
          :multiple=${item.self.multiple}
          :file-list="model.${item.self.model}"
          >
          <el-button size="small" type="primary">${item.self.slot.btnTitle}</el-button>
          <div slot="tip" class="el-upload__tip">${item.self.slot.tip}</div>
        </el-upload>`;
        break;
      default: break;
    }
  }
  return item.elItem && item.elItem.exist ? `<el-form-item${getPropValue("label", item.elItem && item.elItem.label)}${getPropValue("class", item.elItem && item.elItem.class)} ${require}>
  ${re}
  </el-form-item>
  ` : re;
};
function getElFormCode(item) {
  let items = "";
  item.list.forEach((v, index) => {
    items += index === item.list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form ref="model" :model="model" :rules="page.rules" label-position="${item.self.labelPosition}" label-width="${item.self.labelWidth}px" size="${item.self.size}"${getPropValue("label-suffix", item.self.labelSuffix)}${getPropValue("class", item.self.class)}>
${items}
        </el-form>`
}
export function getFormCode(list, formConfig) {
  let items = "";
  list.forEach((v, index) => {
    items += index === list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form ref="model" :model="model" :rules="page.rules" label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}"${getPropValue("label-suffix", formConfig.labelSuffix)}${getPropValue("class", formConfig.class)}>
${items}
        </el-form>`
};
export function getListCode(list) {
  let items = "";
  list.forEach((v, index) => {
    items += index === list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return items;
};

function getPropValue(prop, value) {
  if (!value) {
    return "";
  } else {
    return ` ${prop}="${value}"`
  }
}
