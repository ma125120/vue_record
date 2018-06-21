

import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Detail = () => import('@/pages/Detail.vue');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    }
  ]
})

