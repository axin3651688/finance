import extraAxios from 'axios'
import {
    Message,
    Loading
} from 'element-ui';
import store from '@/store';
// import router from '@v/layout/router'

let loading;
// axios.defaults.timeout = 10000;
// request.defaults.headers.common['Authentication'] = store.state.user.authorization;

function startLodading(text) {
    loading = Loading.service({
        lock: true,
        text: text ? text : "拼命加载中...",
        background: 'rgba(0,0,0,0)'
    });
}

function endLoading() {
    loading.close();
}

// 请求拦截
extraAxios.interceptors.request.use(config => {
        // 加载动画 701是抽取的节点
        if (localStorage.siderState) {
            let siderState = JSON.parse(localStorage.siderState),
                text = "拼命加载中...";
            if (siderState.code == '701') {
                text = "数据抽取中..."
            }
            startLodading(text);
        } else {
            startLodading();
        }

        return config;
    }, error => {
        return Promise.reject(error)
    })
    // 响应拦截
extraAxios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
}, error => {
    // 错误提醒
    endLoading();
    // Message({
    //     message: "抽取出现错误！",
    //     type: "error"
    // });
    console.error(error);

    // 获取错误状态码
    const {
        status
    } = error.response;
    if (status == 401) {
        console.error("toen失效,请重新登陆!");
        // token过期,清除token
        localStorage.removeItem('authorization');
    }
    return Promise.reject(error);

})
export default extraAxios;