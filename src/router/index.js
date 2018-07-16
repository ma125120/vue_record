

import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Detail = () => import('@/pages/Detail.vue');
Vue.use(VueRouter)

export default new VueRouter({
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

