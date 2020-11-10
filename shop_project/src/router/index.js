import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import order from '@/components/pages/order';
import coupon from '@/components/pages/coupon';
import customerorder from '@/components/pages/customerorder';

Vue.use(Router)

export default new Router({
  routes: [
    {path:'*',
    redirect:'login'},
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[{
        path:'products',
        name:'Products',
        component:Products,
        meta: { requiresAuth: true },
      },
      {
        path:'order',
        name:'order',
        component:order,
        meta: { requiresAuth: true },
      },
      {
        path:'coupon',
        name:'coupon',
        component:coupon,
        meta: { requiresAuth: true },
      },
      {
        path:'customerOrder',
        name:'customerOrder',
        component:customerorder,
        meta: { requiresAuth: true },
      },
    
    ],
    }
  ]
})
