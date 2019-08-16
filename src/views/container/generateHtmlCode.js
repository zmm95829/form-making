import getElFormCode from "./generateFormCode.js";
import generateScriptCode from "./generateScriptCode.js";
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
        ${getElFormCode(data || {list: []}, formConfig)}
      </div>
    </body>
    ${generateScriptCode(data.list, formConfig)}    
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
