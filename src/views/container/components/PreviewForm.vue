
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
      page: {}
    }
  },
  mixins: [generateVueMixins()],
  mounted() {},
  methods: {},
  template: "<span></span>"
};
</script>
<style scoped>
</style>
