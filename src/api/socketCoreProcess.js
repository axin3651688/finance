import {
  isArray
} from 'util';
import cmd1500Handle from './cmd1500Handle';
import {messagePageSocketProcess} from '@mu/socketProcess.js'; // 独立消息页面message_page的消息自己处理
import {showNotification} from 'utils/notification.js';  // 消息弹窗

/**
 * 消息核心处理
 * author:gjx
 * date:2018-12-03
 */
export default function socketCoreProcess(websocket, datas) {
  let parseData = function (data) {
    let code = data.code;
    console.info(data);
    showNotification(data); // 消息弹窗
    messagePageSocketProcess(data); // 独立消息页面message_page的消息自己处理
    // debugger;
    switch (code) {
      case 1001:
        break;
      case 1002:
        // 账号重复登录提示及处理
        console.log(data);
        console.log('账号在别端登录');
        break;
      case 1003:
        // 登录已失效，请重新登录
        break;
      case 1004:
        break;
      case 1006:
        // 对方收到消息或读了消息
        break;
      case 1100:
        // 单聊
        break;
      case 1101:
        // 群聊
        break;
      case 1500:
        // 终端控制处理逻辑 {text:"执行成功"}
        let sendBean = cmd1500Handle(websocket, data);
        // sendBean.device = data.fromDevice;
        // sendBean.code = 15001; //收到口令回执
        // websocket.send(sendBean);
        break;
      case 2000:
        break;

      default:
    }
  };

  // debugger;
  if (isArray(datas)) {
    datas.forEach(data => {
      parseData(data);
    });
  } else {
    parseData(datas);
  }
}
