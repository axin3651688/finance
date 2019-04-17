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

Vue.config.productionTip = false
Vue.directive('avatar', directive)
Vue.component('Avatar', Avatar)
Vue.use(ElementUI)
Vue.use(VueQriously)
Vue.use(Bus)

Vue.prototype.axios = axios

/** ==> electron相关 */
// var devInnerHeight = 1080.0 // 开发时的InnerHeight
// var devDevicePixelRatio = 1.0 // 开发时的devicepixelratio
// var devScaleFactor = 1.3 // 开发时的ScaleFactor
// var scaleFactor = require('electron').screen.getPrimaryDisplay().scaleFactor
// var zoomFactor = (window.innerHeight / devInnerHeight) * (window.devicePixelRatio / devDevicePixelRatio) * (devScaleFactor / scaleFactor)
// require('electron').webFrame.setZoomFactor(zoomFactor)
/** <== electron相关 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
