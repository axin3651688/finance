import {
  isJSON
} from 'utils';
import socketCoreProcess from '../api/socketCoreProcess.js';
export default function webSocket(data) {
  let url = data.url;
  let timer = null;

  let initSocket = function () {
    let socketIsClosed = false;
    let websocket = null;
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
      console.log('  websocket.onopen  ');
      window.socket = websocket;
      socketIsClosed = false;
      if (timer) {
        clearInterval(timer);
      }
      timer = null;
    };

    // 收到消息时
    websocket.onmessage = function (evnt) {
      let data = evnt.data;
      socketCoreProcess(websocket, JSON.parse(data));
    };

    // 关闭连接时
    websocket.onclose = function (evnt) {
      console.log('  websocket.onclose  ');
      socketIsClosed = true;
      closeShow();
    };

    // 链接错误时
    websocket.onerror = function (evnt) {
      console.log('  websocket.onerror  ');
    };

    // socket 发送消息
    websocket.deliver = function (data) {
      console.log('  websocket.deliver  ');
      if (socketIsClosed) {
        return closeShow();
      }
      websocket.send(JSON.stringify(data));
    };

    return websocket;
  };

  let closeShow = function () {
    // debugger;
    if (!timer) {
      timer = setInterval(function () {
        initSocket();
        console.log('socket尝试重连······', timer);
      }, 3000);
    }
  };

  return initSocket();
}