import store from '@/store'; // vuex
import router from '@v/message_page/router';

/**
 * 1003 处理electron 登录失效后重新登录
 */
function _processLoginExpired(data) {
  // alert('1003====authorization'+JSON.stringify(data.data.authorization));
  if (data.data.authorization) {
    // 重登录成功窗口变大
    if (window.require) {
      let ipc = window.require('electron').ipcRenderer;
      ipc.send('web_autoLogin', '');
    }
  } else {
    // 登陆失败 electron 退出处理
    // debugger;
    // 清除本地记录的一些数据
    localStorage.removeItem('database');
    store.dispatch('clearCurrentState');
    localStorage.removeItem('authorization'); // 清token

    if (window.require) {
      let ipc = window.require('electron').ipcRenderer;
      router.push('/message_login');
      ipc.send('web_outLogin', '');
    }
  }
}

/**
 * 统一处理服务器推送的socket信息
 */
export function messagePageSocketProcess(data) {
  // debugger;
  switch (data.code) {
    case 1001: // 与服务器连接成功
      // 连接成功后会得到 token
      store.dispatch('ActionSetMessageStore', {token: data.data.token});
      break;
    case 1003: // 登录已失效
      _processLoginExpired(data);
      break;
    case 1006: // 对方收到消息或读了消息
      console.log('socketCoreProcess: 1006');
      break;
    case 1100: // 单聊
      store.dispatch('ActionSetMessageStore', {newServerMsg: data});
      break;
    case 1101: // 群聊
      // debugger;
      store.dispatch('ActionSetMessageStore', {newServerMsg: data});
      break;
    case 1500: // 语音控制
      console.log('1500语音控制:', data);
      debugger;
      break;
    case 2000: // 消息 ack 回执
      store.dispatch('ActionSetMessageStore', {serverAck: data});
      break;
    case 10010: // 10010-APP已扫码通知，扫码成功
      console.log('10010扫码成功：', data);
      store.dispatch('ActionSetMessageStore', {scanStatus: data});
      break;
    case 10011: // 10011-APP登录通知，登陆成功
      console.log('10011扫码登陆：', data);
      store.dispatch('ActionSetMessageStore', {scanStatus: data});
      break;
  }
}
