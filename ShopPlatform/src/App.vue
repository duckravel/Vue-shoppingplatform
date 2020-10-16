<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){
    const api =`${process.env.APIPATH}${process.env.CUSTOMPATH}/products`;
    //api伺服器
    //所申請的api path
    this.$http.get(api).then(Response=>{
       console.log(Response.data);
    })
  },
}
</script>

<style>
/* @import './assets/all' */

</style>
