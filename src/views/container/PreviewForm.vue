
<script>
import getElFormCode from "./generateFormCode.js";
import { getFormModel } from "./../../utils/handleData.js";
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
      model: {}
    }
  },
  created() {
    this.$options.template = `${this.template}`;
    this.model = getFormModel(this.data.list);
  },
  template: `<span></span>`
};
</script>
<style>
</style>