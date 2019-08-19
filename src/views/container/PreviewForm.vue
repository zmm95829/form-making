
<script>
import { getFormModel, generateVueMixins, getDictOptions, getRules } from "./generateScriptCode.js";
import generateFormCode from "./generateFormCode.js";
export default {
  name: "",
  props: {
    data: {
      type: Object,
      default: () => function() {
        return {
          list: []
        }
      }
    },
    formConfig: {
      type: Object,
      default: () => { }
    }
  },
  data: function() {
    return {
      model: {},
      dict: {},
      page: {
        loading: false,
        rules: {}
      }
    }
  },
  mixins: [generateVueMixins()],
  mounted() {
  },
  methods: {},
  created() {
    this.$options.template = `${generateFormCode(this.data, this.formConfig)}`;
    this.page.rules = getRules(this.data.list);
    this.model = getFormModel(this.data.list);
    this.dict = getDictOptions(this.data.list);
  },
  template: "<span></span>"
};
</script>
<style scoped>
.ctbms-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  justify-content: space-between;

}
.ctbms-form__el-form-item {
  flex: 0 0 21%; /* explanation below */
  width: calc(100% - 24px);
  margin: 5px 5px;
}
.ctbms-form__el-form-item--full-line {
    flex: none;
    display: block;
  }
</style>
