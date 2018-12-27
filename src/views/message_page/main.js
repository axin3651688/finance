import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously' // 二维码生成 https://github.com/theomessin/vue-qriously
import {directive} from 'namedavatar/src/vue' // 填充默认头像 https://github.com/joaner/namedavatar


Vue.directive('avatar', directive);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQriously);


// 设置一个全局判断是否为空的函数,后面用  !this.isEmpty(value)  即可调用
Vue.prototype.isEmpty = function (value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
