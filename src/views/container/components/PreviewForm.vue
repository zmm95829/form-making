
<script>
import { generateVueMixins } from "./../js/generateScriptCode.js";
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
  // created() {
  //   this.$options.template = `${getFormCode(this.data, this.formConfig)}`;
  //   this.page.rules = getRules(this.data.list);
  //   this.model = getFormModel(this.data.list);
  //   this.dict = getDictOptions(this.data.list);
  // },
  template: "<span></span>"
};
</script>
<style scoped>
</style>
