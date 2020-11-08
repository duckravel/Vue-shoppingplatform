<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //   var apipath = process.env.APIPATH;
  //   var custom = process.env.CUSTOMPATH;
  //   const api = `${apipath}/api/${custom}/products/all`;
  //   this.$http.get(api).then((response) => {})
  // },
}
</script>

<style lang='scss'>
@import "./assets/all";

</style>
