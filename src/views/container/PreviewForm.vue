
<script>
import { getFormModel, generateVueMixins, getDictOptions } from "./generateScriptCode.js";
import generateFormCode from "./generateFormCode.js";
import { getDict } from "@/api/cofco.js";
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
      page: {}
    }
  },
  mixins: [generateVueMixins()],
  mounted() {
  },
  methods: {},
  created() {
    this.$options.template = `${generateFormCode(this.data, this.formConfig)}`;
    this.model = getFormModel(this.data.list);
    this.dict = getDictOptions(this.data.list);
  },
  template: "<span></span>"
};
</script>
<style>
</style>
