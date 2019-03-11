import axios from 'axios'
import {Loading} from 'element-ui'
import {SET_FULLSCREEN_LOADING} from '@mu/setFullscreenLoading.js'
// import router from '@v/layout/router'

axios.defaults.timeout = 10000

let loading

/**
 * 开始加载动画
 * 从本地存储中获取 fullscreenLoading ，判断是否需要全屏加载动画
 * 在不需要全屏加载动画的地方调用 @mu/setFullscreenLoading.js 中的方法禁用全屏加载
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
      text: '拼命加载中...',
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
    // _startLoading();

    // debugger
    if (localStorage.authorization) {
      // 设置统一请求头
      config.headers.Authorization = localStorage.authorization

    }
    if (window.currentDevice) {
      console.log('正确获取设备号：', window.currentDevice)
      config.headers.device = window.currentDevice
    } else {
      console.error('未能正确获取设备号')
    }

    return config
  },

  error => {
    return Promise.reject(error)
  })

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 结束加载动画
    // _endLoading();
    return response
  },

  error => {
    // 错误提醒
    _endLoading()
    console.error(error)

    // 获取错误状态码
    const {status} = error.response
    if (status === 401) {
      console.error('toen失效,请重新登陆!')
      // 登陆令牌过期,清除
      localStorage.removeItem('authorization')
    }
    return Promise.reject(error)
  })

export default axios
