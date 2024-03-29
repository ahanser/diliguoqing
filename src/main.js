import 'babel-polyfill'//兼容IE
import Vue from 'vue'


import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import http from "axios"
import 'element-ui/lib/theme-chalk/index.css'

import 'element-ui/lib/theme-chalk/reset.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import '@/icons' // icon
//import '@/permission' // permission control
import { httpGet, httpPost, httpGet2, httpPost2 } from '@/utils/request'
Vue.prototype.$http = http,
Vue.prototype.$httpGet = httpGet,
Vue.prototype.$httpPost = httpPost,
Vue.prototype.$httpGet2 = httpGet2,
Vue.prototype.$httpPost2 = httpPost2,
Vue.use(ElementUI, { 
  size:'small',
  i18n: (key, value) => i18n.t(key, value)
 })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
