import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui';
// import router from '@v/layout/router'

let loading;
axios.defaults.timeout = 10000;

function startLodading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: 'rgba(0,0,0,0)'
    });
}

function endLoading() {
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
    // if(config.method === 'post') {
    // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    // config.transformRequest = [function (data, headers) {
    //     // return qs.stringify(data);
    //     console.log(data)
    // }];
    // }
    // 加载动画
    startLodading();
    // debugger
    if (localStorage.authorization) {
        // 设置统一请求头 todo 暂时屏蔽
        config.headers.Authorization = localStorage.authorization;
        config.headers.device = Cnbi.getDevice();
    }
    return config;
}, error => {
    return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
}, error => {
    // 错误提醒
    endLoading();
    console.error(error);

    // 获取错误状态码
    const {
        status
    } = error.response;
    if (status == 401) {
        console.error("toen失效,请重新登陆!");
        // token过期,清除token
        localStorage.removeItem('authorization');
        // todo 有bug暂时无法解决
        // 跳转到登陆页面
        // router.push("/login");
    }
    return Promise.reject(error);

})
export default axios;