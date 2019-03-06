import store from '@/store' // vuex
import router from '@/router'
import {isArray} from 'util'
import {showNotification} from '@mu/notification.js'  // 消息弹窗

/**
 * 消息核心处理
 * author:gjx
 * date:2018-12-03
 */
export default function socketCoreProcess(websocket, datas) {
  let parseData = function (data) {
    console.info(data)
    let code = data.code
    showNotification(data) // 消息弹窗
    // debugger;
    switch (code) {
      case 1001: // 与服务器连接成功
        console.info('1001:', data.msg)
        localStorage.setItem('device', data.data.token) // 连接成功后会得到 设备号
        break
      case 1002: // 账号在别端登录
        _processOtherDeviceLogin()
        break
      case 1003: // 重新登陆
        _processLoginExpired(data)
        break
      case 1004: // 上线通知
        debugger
        store.commit('MutationUpdateSessionOnlineState', { // 收到对方上线后更新在线状态
          targetId: '1100_' + data.data.user.id,
          online: true
        })
        break
      case 1005: // 下线通知
        debugger
        store.commit('MutationUpdateSessionOnlineState', {
          targetId: '1100_' + data.data.user.id,
          online: false
        })
        break
      case 1006:// 对方收到消息或读了消息
        break
      case 1100: // 单聊
        store.dispatch('ActionSetMessageStore', {newServerMsg: data})
        break
      case 1101: // 群聊
        store.dispatch('ActionSetMessageStore', {newServerMsg: data})
        break
      case 1500: // 终端控制处理逻辑 {text:"执行成功"}
        break
      case 2000: // 消息 ack 回执
        store.dispatch('ActionSetMessageStore', {serverAck: data})
        break
      case 10010: // 10010-APP已扫码通知，扫码成功
        console.log('10010扫码成功：', data)
        store.dispatch('ActionSetMessageStore', {scanStatus: data})
        break
      case 10011: // 10011-APP登录通知，登陆成功
        console.log('10011扫码登陆：', data)
        store.dispatch('ActionSetMessageStore', {scanStatus: data})
        break
      case 11016: // 新朋友通知
        store.dispatch('ActionSetMessageStore', {newServerMsg: data})
        break
      case 11017: // 群助手通知
        store.dispatch('ActionSetMessageStore', {newServerMsg: data})
        break
      case 11021: // 分析助手
        store.dispatch('ActionSetMessageStore', {newServerMsg: data})
        break
      default:
    }
  }

  // debugger;
  if (isArray(datas)) {
    datas.forEach(data => {
      parseData(data)
    })
  } else {
    parseData(datas)
  }
}

/**
 * 1003 处理electron 登录失效后重新登录
 */
function _processLoginExpired(data) {
  // debugger;
  if (data.data.authorization) {
    // 重登录成功窗口变大
    if (window.require) {
      let ipc = window.require('electron').ipcRenderer
      ipc.send('web_autoLogin', '')
    }
  } else {
    // 登陆失败 electron 退出处理
    // debugger;
    // 清除本地记录的一些数据
    localStorage.removeItem('database')
    store.dispatch('clearCurrentState')
    localStorage.removeItem('authorization') // 清登陆令牌
    router.push('/message_login')
    if (window.require) {
      let ipc = window.require('electron').ipcRenderer
      ipc.send('web_outLogin', '')
    }
  }
}

/**
 * 1002 处理账号在其他设备登录
 * 如果在其它设备登录，则本设备下线
 */
function _processOtherDeviceLogin() {
  console.log('账号在其它设备登录')
  alert('账号在其它设备登录')
  localStorage.removeItem('database')
  store.dispatch('clearCurrentState')
  localStorage.removeItem('authorization') // 清登陆令牌
  router.push('/message_login')
}

