export default `
<template>
  <section
    v-loading="page.loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="ctbms-form-wrap"
  >
    <Sticky :sticky-top="origin !== 'sso'? 98 : 0" :z-index="10">
      <FormButtonGroup
        :is-use-disabled="true"
        :is-view="page.action==='View'"
        :is-audit="page.action==='Audit'"
        :txn-key="page.$placeholder_txnKey"
        @save="submitForm('save', $event)"
        @submit="submitForm('submit', $event)"
      >
        <auditing-dialog slot="audit-button" @before-handling-complete="beforeComplete" />
      </FormButtonGroup>
    </Sticky>
    $placeholder_html
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { merge } from "lodash";

import formMixin from "@/mixins/formMixin";

import Sticky from "@/components/Sticky";
import FormButtonGroup from "@/components/FormButtonGroup";
import AuditingDialog from "@/components/Auditing/dialog";

import { saveIgnoreNull, findById } from "@/api/结算管理/开票管理/开票登记申请"; // TODO:修改api路径

import { deleteNullAttribute } from "@/utils/objectOperate";
import { SUBMIT_TIPS, SUCCESS_TIPS } from "@/constants/page";
import { getValidateFormResult } from "@/utils/validate";
import { $placeholder_txnKey } from "@/constants/process";
$placeholder_import

export default {
  name: "KaiPiaoDengJiShenQingBiaoDan", // TODO:修改表单名称
  components: {
    Sticky,
    FormButtonGroup,
    AuditingDialog
  },
  mixins: [formMixin],
  data: function() {
    return {
      model: $placeholder_model,
      dict: $placeholder_dict,
      page: {
        $placeholder_page
        action: "",
        loading: true,
        rules: $placeholder_rule,
        $placeholder_txnKey
      }
    };
  },
  computed: {
    /**
     * 引用currentAccount，以便获取当前登陆账户的信息; 引入origin判断取当前环境是否是门户
     */
    ...mapGetters(["origin", "currentAccount"]),
    /**
     * 是否只读
     */
    viewOnly: function() {
      return this.page.action === "View" || (this.page.action === "Audit" && !this.isAuditTaskTypeStart);
    }
  },
  mounted: function mounted() {
    this.page.action = this.$route.params.action;
    Promise.resolve()
      .then(() => this.bindDicts())
      .then(() => this.bindModel())
      .catch(e => {
        this.$alert("加载数据出现错误：" + e, "错误", { type: "error" });
        console.error("加载过程中出现错误:", e);
      })
      .then(() => {
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
      ]);
    },
    /**
     * 加载表单数据
     */
    bindModel() {
      if (this.page.action === "Add") {
       // TODO:
      } else {
        return findById(this.$route.params.id).then(v => {
          this.model = merge(this.model, deleteNullAttribute(v));
        });
      }
    },
    /**
     * 保存数据
     */
    submitForm: function(type, callBack) {
      if (!getValidateFormResult(this, "model")) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请将必填项填写完整."
        });
        return callBack();
      }
      saveIgnoreNull(this.model, type).then(v => {
        this.$message({
          type: "success",
          showClose: true,
          message: type === "save" ? SUCCESS_TIPS : SUBMIT_TIPS
        });
        this.$router.go(-1);
      }).catch(_ => {
        callBack();
      });
    },$placeholder_methods
    /**
     * 在流程审核通过的时候, 更新字段
     */
    beforeComplete(taskUpdateData) {
      if (this.isAuditTaskTypeStart) {
        Object.assign(taskUpdateData, this.model);
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/ctbms/form.scss";
</style>
`;
