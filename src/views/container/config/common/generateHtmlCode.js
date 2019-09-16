import { getFormCode } from "@/views/container/js/generateFormCode.js";
import { jsonFormat } from "@/utils/helper.js";
import { getModel, getDictOptions, getRules } from "@/views/container/js/generateScriptCode.js";
export default function(data, formConfig) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <script src="https://cdn.jsdelivr.net/npm/vue"></script>
      <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
      <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    </head>
    <body>
      <div id="app">
        ${getFormCode(data.list, formConfig)}
      </div>
    </body>
    <script type="text/javascript">
      new Vue({
          el:"#app",
          data: function(){
            return {
              model: ${jsonFormat(JSON.stringify(getModel(data.list)), false)},
              dict: ${jsonFormat(JSON.stringify(getDictOptions(data.list)), false)},
              page: {
                rules: ${jsonFormat(JSON.stringify(getRules(data.list)), false)}
              }
            }
          },
          methods: {
            submit: function() {
              this.$refs["model"].validate((valid) => {
                if (valid) {
                  this.$alert(this.ruleForm);
                } else {
                  alert("未填写完整");
                  return false;
                }
              });
            }
          }
      })
    </script> 
  </html>`;
};
