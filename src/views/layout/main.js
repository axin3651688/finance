import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'
import ZkTable from 'vue-table-with-tree-grid'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import "@/styles/green/index.scss"
import '../../../node_modules/handsontable/dist/handsontable.full.css'
// 挂载全局组件echart
import VueECharts from '@c/charts/ECharts'
Vue.component('chart', VueECharts);
import VueQriously from 'vue-qriously' // 二维码生成 https://github.com/theomessin/vue-qriously
// import "@s/green/index.scss" //cxy
import Blob from '@/excel/Blob.js'
import Export2Excel from '@/excel/Export2Excel.js'
import { Script } from 'vm';
import Viewer from 'v-viewer'
Vue.use(Viewer);
Viewer.setDefaults({
    Options: {
        "inline": true,
        "button": true,
        "navbar": true,
        "title": true,
        "toolbar": true,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": true,
        "scalable": true,
        "transition": true,
        "fullscreen": true,
        "keyboard": true,
        "url": "data-source"
    }
});
import 'viewerjs/dist/viewer.css'
import '@a/iconfont/iconfont.css'
import '@a/szcIcon/iconfont.css'
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