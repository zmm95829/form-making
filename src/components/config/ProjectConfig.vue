<template>
  <div>
    <el-form>
      <el-form-item label="选择项目">
        <el-cascader
          v-model="model"
          :options="page.projectOptions"
          style="width: 280px;"
          />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleOkClick">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { projectOptions } from "./config";
import { mapGetters } from "vuex";
export default {
  name: "ProjectConfig",
  data: function() {
    return {
      model: [],
      page: {
        projectOptions,
        rules: {
          project: {required: true, message: "必填", trigger: "blur"},
          page: {required: true, message: "必填", trigger: "blur"}
        }
      }
    }
  },
  computed: {
    ...mapGetters(["system_project"])
  },
  mounted() {
    this.model = [this.system_project.name, this.system_project.page];
  },
  methods: {
    handleOkClick: function() {
      this.$store.commit("SET_PROJECT_PAGE", {name: this.model[0], page: this.model[1]});
      this.$emit("click");
      this.$router.push({
        name: "表单制作器",
        params: {
          name: this.model[0],
          page: this.model[1]
        }
      })
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
</style>
