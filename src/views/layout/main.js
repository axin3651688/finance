import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'
import ZkTable from 'vue-table-with-tree-grid'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../../../node_modules/handsontable/dist/handsontable.full.css'
// import "@s/green/index.scss"
// 挂载全局组件echart
import VueECharts from '@c/charts/ECharts'
Vue.component('chart', VueECharts);

import VueQriously from 'vue-qriously' // 二维码生成 https://github.com/theomessin/vue-qriously

Vue.use(ZkTable)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQriously)

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')