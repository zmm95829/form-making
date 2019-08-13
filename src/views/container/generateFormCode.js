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
          v-model="item.model"
          :disabled="${item.options.disabled}"
        >
        <el-radio 
          :style="{display: ${item.options.inline ? "inline-block" : "block"}}"
          :label="itemSub.value"
          v-for="(itemSub, index) in dict.${item.model}_options)"
          :key="index"
        >
          {{ itemSub.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>`;
      break;
    default: break;
  }
  return re;
};
export default function(data, formConfig, msg) {
  let items = "";
  data.list.forEach((v, index) => {
    items += index === data.list.length - 1 ? `${getElFormItemCode(v)}` : `${getElFormItemCode(v)}
`;
  });
  console.log(msg);
  console.log(`<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}">
        ${items}
  </el-form>`)
  return `<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}">
${items}
        </el-form>`
};
