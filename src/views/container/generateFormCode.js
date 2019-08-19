function getElFormItemCode(item) {
  let re = "";
  const require = item.required ? "prop=\"" + item.model + "\"" : "";
  switch (item.type) {
    case "input":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} placeholder="${item.options.placeholder}"/>
    </el-form-item>`;
      break;
    case "textarea":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} :autosize="{ minRows: ${item.options.minRows} }" placeholder="${item.options.placeholder}" type="textarea"/>
    </el-form-item>`;
      break;
    case "radio":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-radio-group
          v-model="model.${item.model}"
          :disabled="${item.options.disabled}"
         
        >
        <el-radio 
          style="{display: ${item.options.inline ? "inline-block" : "block"}}"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
        >
          {{ itemSub.${item.options.remote ? item.options.remoteProps.label : "label"} }}
        </el-radio>
      </el-radio-group>
    </el-form-item>`;
      break;
    case "checkbox":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-checkbox-group
          v-model="model.${item.model}"
          :disabled="${item.options.disabled}"
         
        >
        <el-checkbox 
          style="{display: ${item.options.inline ? "inline-block" : "block"}}"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
        >
          {{ itemSub.${item.options.remote ? item.options.remoteProps.label : "label"} }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>`;
      break;
    case "select":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-select v-model="model.${item.model}"        >
        <el-option
          v-for="(itemSub, index) in dict.${item.model}_options"
          :key="index"
          :label="itemSub.${item.options.remote ? item.options.remoteProps.label : "label"}"
          :value="itemSub.${item.options.remote ? item.options.remoteProps.value : "value"}"
        />
      </el-select>
    </el-form-item>`;
      break;
    case "date":
      if (item.options.type.indexOf("range") !== -1) {
        const defaultTime = item.options.type === "daterange" ? ":default-time=\"['00:00:00', '23:59:59']\"" : "";
        re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <el-date-picker v-model="model.${item.model}" type="${item.options.type}" ${defaultTime} format="${item.options.format}" value-format="${item.options.format}" start-placeholder="${item.options.startPlaceholder}" end-placeholder="${item.options.endPlaceholder}" />
      </el-form-item>`;
      } else {
        re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <el-date-picker v-model="model.${item.model}" type="${item.options.type}" format="${item.options.format}" value-format="${item.options.format}" placeholder=${item.options.placeholder} />
      </el-form-item>`;
      }

      break;
    default: break;
  }
  return re;
};
export default function(data, formConfig) {
  let items = "";
  data.list.forEach((v, index) => {
    items += index === data.list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  return `<el-form ref="model" :model="model" :rules="page.rules" label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}" class="${formConfig.class}">
${items}
        </el-form>`
};
