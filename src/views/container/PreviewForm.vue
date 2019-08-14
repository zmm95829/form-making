
<script>
import getElFormCode from "./generateFormCode.js";
import { getFormModel, generateVueMixins, getDictOptions } from "./generateScriptCode.js";
export default {
  name: "",
  props: {
    data: {
      type: Object,
      default: () => {
        list: []
      }
    },
    formConfig: {
      type: Object,
      default: () => { }
    },
    template: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      model: {},
      dict: {},
      page: {}
    }
  },
  mixins: [generateVueMixins(this.data && this.data.list || [])],
  mounted(){},
  methods: {},
  created() {
      console.log("vue created");
    this.$options.template = `${this.template}`;
    this.model = getFormModel(this.data.list);
    this.dict = getDictOptions(this.data.list);
    console.log(generateVueMixins(this.data && this.data.list || []));
    // console.log(mixins);
    // this.dict = mixins.data.dict;
    // console.log("mixins");
    // console.log();
    // this.$options.mixins = [];
    // console.log(this.$options.mixins);
    // console.log(this);
    // this.$extends(generateVueMixins(this.data.list));
  },
  template: `<span></span>`
};
</script>
<style>
</style>