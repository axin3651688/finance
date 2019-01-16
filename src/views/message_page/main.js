import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously' // 二维码生成 https://github.com/theomessin/vue-qriously
import {directive} from 'namedavatar/src/vue' // 填充默认头像 https://github.com/joaner/namedavatar
import '@s/message/normalize.scss' // 统一浏览器样式

Vue.directive('avatar', directive);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQriously);

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
