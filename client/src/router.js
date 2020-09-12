import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/main.vue'
import ByCourt from './views/bycourt.vue'
import Quote from './views/quote.vue'
import Service from '@/views/service'
import Flow from '@/views/flow'
import AboutUs from '@/views/aboutus'
import ChangePwd from '@/views/changepwd'
import ForgotPwd from '@/views/forgotpwd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bycourt/:id',
      name: 'byCourt',
      component: ByCourt,
      props: (route) => ({
        pCrt: route.query.crt, id: route.params.id.replace("_", "/") 
      })
    },    
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/quote',
      name: 'quote',
      component: Quote
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    { path: '/flow', name: 'flow', component: Flow },
    { path: '/service', name: 'service', component: Service },
    { path: '/quote', name: 'quote', component: Quote },
    { path: '/changepwd', name: 'changepwd', component: ChangePwd },
    { path: '/forgotpwd', name: 'forgotpwd', component: ForgotPwd },
  ]
})
