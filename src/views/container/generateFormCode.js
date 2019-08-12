function getElFormItemCode(item) {
  return `<el-form-item label=${item.label}>
  <el-input
    v-model="model.${item.model}"
    placeholder="${item.options.placeholder}"
    :disabled=${item.options.disabled}
  />
</el-form-item>
`
};
export default function(data, formConfig, msg) {
  let items = "";
  data.list.forEach(v => {
    items += getElFormItemCode(v);
  });
  console.log(msg);
  console.log(`<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}">
  ${items}
  </el-form>
  `)
  return `<el-form label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size}" label-suffix="${formConfig.labelSuffix}">
  ${items}
  </el-form>
  `
};
