import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'*',
    redirect:'login'},
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{requiresAuth:true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    }
  ]
})
