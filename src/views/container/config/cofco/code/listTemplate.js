// 中粮业务管理系统查询页面组件模板

export default `<template>
<section class="ctbms-form-wrap">
  <!-- TODO:不需要新增按钮时删掉改代码 -->
  <el-row class="ctbms-form-buttons">
    <el-button v-if="canEdit && origin !== 'sso'" type="primary" class="ctbms-list__el-button--add" @click="handleAdd">创建xxx单</el-button>
  </el-row>
  $placeholder_html
  <list-table
    :table-data="tableData"
    :column-options="columnOptions"
    :loading="page.loading"
    :total="page.total"
    :is-first-page="page.isFirstPage"
    :formatter-fun="columnFormatter"
    form-name="KaiPiaoDengJiShenQingBiaoDan" TODO: 修改表单名
    fixed-label="$placeholder_listTable_fixedLabel"
    operate-width="130px"
    @handleDataChange="handleSearch"
  >
    <template slot-scope="scope" slot="fixedColumn">
      <a class="ctbms-list__id-link" @click="hanldeView(scope.row.id)">{{ scope.row.$placeholder_listTable_fixedProps }}</a>
    </template>
    <!-- <template slot-scope="{row}" slot="operate">
      TODO:
    </template>-->
  </list-table>
</section>
</template>

<script>
import { mapGetters } from "vuex";
import { get } from "lodash";

import ListTable from "@/components/ShowTable/ListTable";
import SelectTree from "@/components/SelectDialog/SelectTree";

import { paginate } from "@/api/结算管理/开票管理/开票登记申请"; // TODO: 修改api路径
import { canEditFun } from "@/utils/buttonAuthority";
import { SELL_INVOICE_APPLY } from "@/constants/process";
$placeholder_import

const columns = $placeholder_columns;

export default {
name: "KaiPiaoDengJiShenQingChaXun", // TODO:修改表单名称
components: {
  $placeholder_components
  SelectTree // 没有查询部门时删掉
},
data: function() {
  return {
    canEdit: false,
    tableData: [],
    columnOptions: $placeholder_columnOptions,
    model:$placeholder_model,
    dict: $placeholder_dict,
    page: {
      $placeholder_page
      loading: true,
      isFirstPage: true,
      total: 0
    }
  };
},
computed: {
  /**
  * 引用currentAccount，以便获取当前登陆账户的信息; 引入origin判断取当前环境是否是门户
  */
  ...mapGetters(["origin", "currentAccount"])
},
mounted: function mounted() {
  Promise.resolve()
  .then(() => this.bindDicts())
  .then(() => this.bindModel())
  .catch(e => {
    this.$alert("加载数据出现错误：" + e, "错误", { type: "error" });
    console.error("加载过程中出现错误:", e);
  }).then(() => {
    this.page.loading = false;
  });
},
methods: {
  /**
   * 加载字典数据
   */
  bindDicts: function() {
    return Promise.all([
      $placeholder_getDicts  
    ]).then(v => {
      this.model.dept = this.currentAccount.departments[0]; // TODO:没有部门时删掉
    });
  },
  /**
   * 加载表单数据
   */
  bindModel: function() {
    return Promise.resolve()
      .then(v => this.handleSearch());
  },
  /**
   * 表格数据是否允许显示编辑等按钮
   * 数据是本部门的：角色有编辑权限的显示编辑按钮
   * 数据是下级部门的：只能有查看按钮
   */
  allowEdit: function(row) {
    return row.deptCode === this.currentAccount.departments[0].oaCode && this.canEdit;
  },
  /**
   * 查询条件
   */
  pageList: function(page) {
    const pageInfo = page || {
      startPage: 1,
      pageSize: 10
    };
    const ba = {
      columns: columns,
      filters: {
        "txnInfo.key?EQ": SELL_INVOICE_APPLY, // TODO:修改流程key
        $placeholder_filters
      },
      sortings: [
        {
          ascending: false,
          orderBy: "createdDate"
        }
      ],
      startPage: pageInfo.startPage - 1,
      pageSize: pageInfo.pageSize
    };
    return ba;
  },
  /**
   * 查询表格数据
   */
  handleSearch(page) {
    if (!page) {
      this.page.isFirstPage = !this.page.isFirstPage;
    }
    this.page.loading = true;
    return paginate(this.pageList(page)).then(result => {
      this.tableData = result.data;
      this.$set(this.page, "total", result.pageInfo.totalRecords);
    }).then(() => {
      this.page.loading = false;
    });
  },
  /**
   * 选择部门 TODO:没有部门时删掉
   */
  selectDeptOk(val) {
    this.model.dept = val;
  },
  /**
   * 新增表单
   */
  handleAdd: function() {
    this.$router.push({
      name: "KaiPiaoDengJiShenQingBiaoDan", // TODO:修改表单名称
      params: {
        action: "Add"
      }
    });
  },
  /**
   * 查看表单
   */
  hanldeView: function(id) {
    this.$router.push({
      name: "KaiPiaoDengJiShenQingBiaoDan",// TODO:修改表单名称
      params: {
        id,
        action: "View"
      }
    });
  },
  /**
   * 数据格式转换
   */
  columnFormatter: function(row, column, prop) {
    let re = get(row, prop);
    switch (column.property) {
      default: break;
    }
    return re;
  }
},
/**
 * 进入页面时获取角色的读写权限
 */
beforeRouteEnter(to, from, next) {
  canEditFun(to.meta.code).then(v => {
    next(vm => {
      vm.canEdit = v;
    });
  });
}
};
</script>
<style lang="scss" scoped>
@import "@/styles/ctbms/form.scss";
.ctbms-form-buttons {
background-color: #fff;
&:nth-of-type(1) {
  justify-content: flex-start;
  margin-top: 20px;
  padding: 8px 5px;
  margin-bottom: 0px;
}
}
.ctbms-form-buttons {
.ctbms-form--el-button {
  margin-top: 28px;
}
}
</style>
`;
