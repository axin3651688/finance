import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'
import ZkTable from 'vue-table-with-tree-grid'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 import '@/styles/black/index.scss' // global css
//import '@/styles/green/index.scss' // global css
// import '@a/icons/iconfont.css' // icon

// 挂载全局组件echart
import VueECharts from '@c/charts/ECharts'
Vue.component('chart', VueECharts);

// import chinaMap from "./assets/china.json";
// VueECharts.registerMap("china", chinaMap);

Vue.use(ZkTable)
Vue.config.productionTip = false
Vue.use(ElementUI);


// 设置一个全局判断是否为空的函数,后面用  !this.isEmpty(value)  即可调用
Vue.prototype.isEmpty = function (value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')