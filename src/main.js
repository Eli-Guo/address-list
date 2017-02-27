// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import RouterConfig from './router-config.js'
import Vuex from 'vuex'
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import tool from './tool'
//import Loading from 'vux/src/components/loading'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
tool(Vue)

Vue.__Bathpath   = 'http://localhost:3066';
Vue.__Developing = false;
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
  routes: RouterConfig
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
