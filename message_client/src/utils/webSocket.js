// import {
//   isJSON
// } from 'utils';
import socketCoreProcess from '../api/socketCoreProcess.js';

import {
  Message,
  MessageBox,
  Notification
} from 'element-ui';
import router from '@/router';

export default function webSocket(data) {
  // debugger;
  let websocket = null;
  let url = data.url;
  let socketIsClosed = false;
  // 首先判断是否 支持 WebSocket
  if ('WebSocket' in window) {
    websocket = new WebSocket(url);
  } else if ('MozWebSocket' in window) {
    websocket = new MozWebSocket(url);
  } else {
    websocket = new SockJS(url);
  }
  // 打开连接时
  websocket.onopen = function (evnt) {
    // debugger;
    console.log('  websocket.onopen  ');
    window.socket = websocket;
    socketIsClosed = false;
  };

  // 收到消息时
  websocket.onmessage = function (evnt) {
    let datas = evnt.data;
    // if (isJSON(datas)) {
    //   socketCoreProcess(websocket, JSON.parse(datas));
    // }
    socketCoreProcess(websocket, JSON.parse(datas));
  };

  websocket.onerror = function (evnt) {
    console.log('  websocket.onerror  ');
  };

  let closeShow = function () {
    // zdk 2019-1-3 11:10:38 注释   没搞好就别放进来
    // Notification.success({
    //     title: '提示',
    //     message: '已断开连接',
    //     showClose: true,
    //     position: "bottom-right"
    // });
    //  // TODO: 加心跳检测
    // alert('已断开连接')
  };

  websocket.onclose = function (evnt) {
    // 服务断开连接，正在重连
    socketIsClosed = true;
    console.log('  websocket.onclose  ');
    closeShow();
  };

  websocket.deliver = function (data) {
    debugger;
    if (socketIsClosed) {
      closeShow();
      return;
    }
    websocket.send(JSON.stringify(data));
    console.log('  websocket.deliver  ');
  };

  return websocket;
}
