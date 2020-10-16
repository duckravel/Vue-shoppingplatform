<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
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
    const api ='https://vue-course-api.hexschool.io/api/duckravel/products';
    //api伺服器
    //所申請的api path
    console.log(process.env.APIPATH,process.env.CUSTOMPATH);
    this.$http.get(api).then(Response=>{
      // console.log(Response.data);
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
