<template>
  <div class="Container">
    <header class="header"></header>
    <nav class="nav"></nav>
    <footer class="footer"></footer>
    <aside class="aside-left">
      <FormElement/>
    </aside>
    <aside class="aside-right"></aside>
    <section class="section">
      <FormView/>
    </section>
  </div>
</template>
<script>
import FormElement from "./FormElement";
import FormView from "./FormView.vue";
export default {
  name: "Container",
  components: {
    FormElement,
    FormView
  },
  data: function() {
    return {

    }
  }
};
</script>
<style>
.header {
  /* background-color: yellow; */
  border-bottom: 1px solid orange;
  width: 100%;
  height: 120px;
}
.nav {
  background-color: red;
}
.footer {
  border-top: 1px solid orange;
  /* background-color: orange; */
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 80px;
}
.aside-left {
  border-right: 1px solid blue;
  /* background-color: blue; */
  position: fixed;
  left: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 260px;
}
.aside-right {
  border-left: 1px solid blue;
  /* background-color: blue; */
  position: fixed;
  right: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 300px;
}
.section {
  /* background-color: green; */
  border: 1px solid green;
  width: calc(100% - 562px);
  height: calc(100% - 202px);
  position: fixed;
  top: 120px;
  left: 260px;
}
</style>
