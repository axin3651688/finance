import store from '@/store'; // vuex
import router from '@v/message_page/router';

const EMOTION_SPRITES = require('@a/message/data/emotion_sprites.json').data; // 聊天表情数据

/**
 * 格式化时间戳 返回 年-月-日 时:分
 */
export function FORMAT_TIME(time) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = date.getMonth();
  let D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  let newTime = `${Y}-${M}-${D} ${H}:${m}`;
  // console.log(newTime)
  return newTime;
}

/**
 * 格式化时间戳 更具不同的时长返回不同的显示方式
 */
export function FORMAT_MSG_TIME(publishtime) {
  let dateTime = new Date(publishtime);
  let Y = dateTime.getFullYear();
  let M = dateTime.getMonth();
  let D = dateTime.getDate();
  let h = dateTime.getHours();
  let m = dateTime.getMinutes();
  M = M > 9 ? M : '0' + M;
  D = D > 9 ? D : '0' + D;
  h = h > 9 ? h : '0' + h;
  m = m > 9 ? m : '0' + m;

  let currTime = Date.parse(new Date()); // 获取当前时间戳
  let l = parseInt(currTime) - parseInt(publishtime);
  let time = l / 1000;

  // 秒转小时
  let hours = time / 3600;
  if (hours < 24) {
    return `${h}:${m}`;
  }
  // 秒转天数
  let days = time / 3600 / 24;
  if (days < 30) {
    return Math.floor(days) + '天前';
  }
  // 秒转月
  let months = time / 3600 / 24 / 30;
  if (months < 12) {
    return `${M}-${D} ${h}:${m}`;
    // return Math.floor(months) + "月前";
  }
  // 秒转年
  // let years = time / 3600 / 24 / 30 / 12;
  // return Math.floor(years) + "年前";
  return `${Y}-${M}-${D} ${h}:${m}`;
}

/**
 * 解析聊天符号，替换成表情图
 */
export function PARSE_EMOTIONS(content) {
  // debugger;
  if (!content) return;
  let pattern1 = /\[[\S\s]+?\]/g; // 正则匹配聊天表情
  let matchContent = content.match(pattern1);
  // console.log('匹配表情：', matchContent);
  if (matchContent) {
    matchContent.forEach(face => {
      EMOTION_SPRITES.forEach(emotion => {
        if (emotion.value === face) {
          let html = `<span class="face-img ${emotion.className}"></span>`;
          content = content.replace(face, html);
        }
      });
    });
  }
  return content;
}

/**
 * 1003 处理electron 登录失效后重新登录
 */
function _processLoginExpired(data) {
  // alert('1003====authorization'+JSON.stringify(data.data.authorization));
  if (data.data.authorization) {
    // 重登录成功窗口变大
    if (window.require) {
      var ipc = window.require('electron').ipcRenderer;
    }
    if (window.require) {
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
      var ipc = window.require('electron').ipcRenderer;
    }
    if (window.require) {
      // alert('web_outLogin');
      router.push('/message_login');
      ipc.send('web_outLogin', '');
    }
  }
}

/**
 * 统一处理服务器推送的socket信息
 */
export function messagePageProcessSocket(data) {
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
