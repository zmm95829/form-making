function getElFormItemCode(item) {
  let re = "";
  switch (item.type) {
    case "input":
      re = `          <el-form-item label=${item.label}>
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} placeholder="${item.options.placeholder}"/>
    </el-form-item>`;
      break;
    case "textarea":
      re = `          <el-form-item label=${item.label}>
      <el-input v-model="model.${item.model}" :disabled=${item.options.disabled} :autosize="{ minRows: ${item.options.minRows} }" placeholder="${item.options.placeholder}" type="textarea"/>
    </el-form-item>`;
      break;
    case "radio":
      re = `          <el-form-item label=${item.label}>
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
      re = `          <el-form-item label=${item.label}>
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
  return `<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}">
${items}
        </el-form>`
};
