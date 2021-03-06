import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui'
import {
    SET_FULLSCREEN_LOADING
} from 'utils/setFullscreenLoading.js'
// import router from '@v/layout/router'
import packageConfig from "../../package.json"
axios.defaults.timeout = 100000

let loading

/**
 * 开始加载动画
 * 从本地存储中获取 fullscreenLoading ，判断是否需要全屏加载动画
 * 在不需要全屏加载动画的地方调用 utils/setFullscreenLoading.js 中的方法禁用全屏加载
 * 如：SET_FULLSCREEN_LOADING(false)
 */
function _startLoading() {
    let fullscreenLoading = true
    try {
        if (localStorage.fullscreenLoading) {
            fullscreenLoading = JSON.parse(localStorage.fullscreenLoading)
        }
    } catch (e) {
        console.log(e)
    }
    if (fullscreenLoading) {
        loading = Loading.service({
            lock: true,
            text: "拼命加载中...",
            background: 'rgba(0,0,0,0)'
        })
    }
}

/**
 * 结束 加载动画
 * 结束加载动画后要将 fullscreenLoading 设置为默认的 true
 */
function _endLoading() {
    SET_FULLSCREEN_LOADING(true)
    if (loading) {
        loading.close()
    }
}

// 请求拦截
axios.interceptors.request.use(
    config => {
        // if(config.method === 'post') {
        // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
        // config.transformRequest = [function (data, headers) {
        //     // return qs.stringify(data);
        //     console.log(data)
        // }];
        // }

        // 加载动画
        _startLoading()
            // console.log(localStorage.getItem('device'), "请求头");

        // config.headers.device = localStorage.getItem('device') || Cnbi.getDevice()
        // debugger
        if (localStorage.authorization) {
            // 设置统一请求头 todo 暂时屏蔽
            config.headers.Authorization = localStorage.authorization
        }
        if (!localStorage.device) {
            // console.error("没有获取到正确的设备信息！");
        } else {
            config.headers.device = localStorage.device; //Cnbi.getDevice()
        }

        // debugger
        // config.headers.version = packageConfig.version;
        // console.log("------headers-----", config.headers);
        return config
    },

    error => {
        return Promise.reject(error)
    })

// 响应拦截
axios.interceptors.response.use(
    response => {
        // 结束加载动画
        _endLoading()
        return response
    },

    error => {
        // 错误提醒
        _endLoading()
        debugger
        let msg = error.response.data;
        if (!error.config.url) {
            msg = "温馨提示:此模块正在开发中...";
        }
        Message.error(msg);
        console.error(error)
            // 获取错误状态码
        const {
            status
        } = error.response
        if (status == 401) {
            console.error("toen失效,请重新登陆!")
                // token过期,清除token
            localStorage.removeItem('authorization')
                // todo 有bug暂时无法解决
                // 跳转到登陆页面
                // router.push("/login");
        }
        return Promise.reject(error)
    })


export default axios