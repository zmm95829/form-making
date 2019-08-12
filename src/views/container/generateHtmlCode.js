import getElFormCode from "./generateFormCode.js";
import {getFormModel} from "./../../utils/handleData.js";
export default function(data, formConfig) {
  const model = getFormModel(data.list);
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
        ${getElFormCode(data || {list: []}, formConfig)}
      </div>
    </body>
    <script type="text/javascript">
      new Vue({
          el:"#app",
          data: function(){
            return {
              model: ${JSON.stringify(model)}
            }
          }
      })
    </script>
  </html>`;
};

// return `<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8">
//     <script src="https://cdn.jsdelivr.net/npm/vue"></script>
//     <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
//     <script src="https://unpkg.com/element-ui/lib/index.js"></script>
//   </head>
//   <body>
//     <div id="app">
//     </div>
//   </body>
//   <script type="text/javascript">
//     new Vue({
//         el:"#app",
//         data: function(){
//           return {

//           }
//         }
//     })
//   </script>
// </html>`;
