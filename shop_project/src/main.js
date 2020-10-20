// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to,from,next)=>{
  if (to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
      const vm=this;
      axios.post(api).then((response) => {
        console.log(response);
        if (response.data.success){
          //這一段式安全性驗證的作法，先從後端取得cookie,再送cookie中的token給後端，可以避免跨域問題
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie=`hexToken=${token};expires=${new Date(expired)};`;
          //存好cookie後就可以進行轉址,轉址在created階段要先送token給後端進行驗證已取得資料
        }else{
          next({path:'/login'});
        }
  
      });
    }else{
        next();} 
    });
