// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vlf from 'vlf'
Vue.use(Vlf);
import myTap from "../static/js/tap.js"
Vue.use(myTap);
import "@/../static/js/rem.js";
import "../static/css/common.scss";

import DateTitle from '@/components/DateTitle.vue';
Vue.component(DateTitle.name,DateTitle);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
