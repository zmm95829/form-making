<template>
  <div class="Container">
    <header class="header"></header>
    <nav class="nav"></nav>
    <footer class="footer"></footer>
    <aside class="aside-left">
      <FormElement/>
    </aside>
    <aside class="aside-right"></aside>
    <section class="section"></section>
Container
  </div>
</template>
<script>
import FormElement from "./FormElement";
export default {
  name: "Container",
  components: {
    FormElement
  },
  data: function() {
    return {

    }
  }
};
</script>
<style>
.header {
  background-color: yellow;
  width: 100%;
  height: 120px;
}
.nav {
  background-color: red;
  width: calc(100% - 560px);
  height: calc(100% - 200px);
  position: fixed;
  top: 120px;
  left: 260px;
}
.footer {
  background-color: orange;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 80px;
}
.aside-left {
  background-color: blue;
  position: fixed;
  left: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 260px;
}
.aside-right {
  background-color: blue;
  position: fixed;
  right: 0;
  top: 120px;
  height: calc(100% - 200px);
  width: 300px;
}
.section {
  background-color: green;
}
</style>
