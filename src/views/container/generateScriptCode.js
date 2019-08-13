import {getFormModel} from "./../../utils/handleData.js";

function generateScriptCode(list) {
  const model = getFormModel(list);
  const re = `<script type="text/javascript">
      new Vue({
          el:"#app",
          data: function(){
            return {
              model: ${JSON.stringify(model)}
            }
          }
      })
    </script>`;
  return re;
}
export default generateScriptCode;
