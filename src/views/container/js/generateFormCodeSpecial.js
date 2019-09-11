
/**
 * 获取cofco特有的html
 */
export function getFormHtmlCofco(item, require) {
  let re = "";
  switch (item.type) {
    case "dialog":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
      <el-input
        v-model="model.${item.model}"
        placeholder="${item.options.placeholder}"
        :disabled="true"
        class="${item.subClass}"
        />
        <el-button
          type="primary"
          style="margin-left:2px"
          icon="el-icon-more"
          circle
          size="mini"
        />
        <!-- TODO:需要替换成弹窗组件 -->
    </el-form-item>`;
      break;
    case "span_readonly":
      re = `          <el-form-item label="${item.label}" class="${item.class}" ${require}>
        <span class="${item.subClass}">{{ model.${item.model} }}</span>
  </el-form-item>
    `;
      break;
    case "placeholder":
      re = `<el-form-item class="${item.class}"/>`;
      break;
    case "kpmg_file":
      return `<el-form-item
      label="${item.label}"
      class="${item.class}"
    >
      <kpmg-file
        :multiple="true"
        :view-only="viewOnly"
        :interaction-id="model.${item.model}"
        @interaction-id-assigned="${item.model}Assigned"
      />
    </el-form-item>`
    default: break;
  }
  return re;
}
