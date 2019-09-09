import { getFormCode, getListCode } from "./js/generateFormCode.js";
import generateScriptCode from "./generateScriptCode.js";
import store from "@/store";
function exportCodeForm(data, formConfig) {
  const isProcess = `<FormButtonGroup
  :is-use-disabled="true"
  :is-view="action==='View'"
  :is-audit="action==='Audit'"
  :txn-key="page.${formConfig.flowKey}"
  @save="submitForm('save', $event)"
  @submit="submitForm('submit', $event)"
>
  <auditing-dialog slot="audit-button" @before-handling-complete="beforeComplete"/>
</FormButtonGroup>`;
  const isUnProcess = `<FormButtonGroup
    :is-view="false"
    :is-audit="false"
    :is-allow-submit="false"
    :show-print="false"
    :show-process="false"
    :is-use-disabled="true"
    @save="submitForm('save', $event)"/>`;
  return `<template>
  <section
    v-loading="page.loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="ctbms-form-wrap"
  >
    <Sticky :sticky-top="origin !== 'sso'? 98 : 0" :z-index="10">
      ${formConfig.hasFlow ? isProcess : isUnProcess}
    </Sticky>
    
        ${getFormCode(data || { list: [] }, formConfig)}
    </section>
    </template>
    ${generateScriptCode(data.list, formConfig)}  
    <style lang="scss">
@import "@/styles/ctbms/form.scss";
</style>  
  `;
}
function exportCodeList(data) {
  return `<template>
<section class="ctbms-form-wrap">
${getListCode(data)}
</section>
</template>
${generateScriptCode(data.list)}
<style lang="scss">
@import "@/styles/ctbms/form.scss";
</style>  
`;
}
export default function(data, formConfig) {
  if (store.state.system.project.page.indexOf("form") !== -1) {
    return exportCodeForm(data, formConfig);
  } else {
    return exportCodeList(data);
  }
};
