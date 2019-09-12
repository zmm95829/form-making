
/**
 * 获取cofco特有的html
 */
export function getFormHtmlCofco(item, require) {
  let re = "";
  switch (item.type) {
    case "dialog":
      re = `          <el-form-item label="${item.elItem.label}" class="${item.elItem.class}" ${require}>
      <el-input
        v-model="model.${item.self.model}"
        placeholder="${item.self.placeholder}"
        :disabled="true"
        class="${item.elItem.class}"
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
      re = `          <el-form-item label="${item.elItem.label}" class="${item.elItem.class}" ${require}>
        <span class="${item.elItem.class}">{{ model.${item.self.model} }}</span>
  </el-form-item>
    `;
      break;
    case "placeholder":
      re = `<el-form-item class="${item.elItem.class}"/>`;
      break;
    case "kpmg_file":
      return `<el-form-item
      label="${item.elItem.label}"
      class="${item.elItem.class}"
    >
      <kpmg-file
        :multiple="true"
        :view-only="viewOnly"
        :interaction-id="model.${item.self.model}"
        @interaction-id-assigned="attachAssigned('${item.self.model}', $event)"
      />
    </el-form-item>`
    // case "list_table":
    //   re = `<list-table
    //   :table-data="tableData"
    //   :column-options="columnOptions"
    //   :loading="page.loading"
    //   :total="page.total"
    //   :is-first-page="page.isFirstPage"
    //   form-name="${item.formName}"
    //   fixed-label="${item.fixedLabel}"
    //   operate-width="130px"
    // >
    //   <template slot-scope="scope" slot="fixedColumn">
    //     <a class="ctbms-list__id-link">{{ scope.row.${item.fixedProps} }}</a>
    //   </template>
    //   <template slot-scope="scope" slot="operate">
    //   <!-- TODO: -->
    //   </template>
    // </list-table>`
    //   break;
    default: break;
  }
  return re;
}
