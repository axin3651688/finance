import Vue from 'vue'
import App from './App.vue'
import axios from '@mu/http'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import VueQriously from 'vue-qriously' // 二维码生成 https://github.com/theomessin/vue-qriously
import {directive} from 'namedavatar/src/vue' // 填充默认头像 https://github.com/joaner/namedavatar
import 'element-ui/lib/theme-chalk/index.css'
import '@ms/reset.scss' // 统一浏览器样式
import '@ms/emotion_sprites.scss' // 全局加载聊天表情样式
import Bus from './bus.js' // bus 总线
import Avatar from 'vue-avatar'

import VueCordovaDevice from 'vue-cordova-device'
import VueCordova from 'vue-cordova'

Vue.use(VueCordovaDevice)
Vue.use(VueCordova)

Vue.config.productionTip = false
Vue.directive('avatar', directive)
Vue.component('Avatar', Avatar)
Vue.use(ElementUI)
Vue.use(VueQriously)
Vue.use(Bus)

Vue.prototype.axios = axios

let $vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log('Vue==', $vue)
console.log('Vue.cordova==', Vue.cordova)
console.log('Vue.cordova.device=====', Vue.cordova.device)
