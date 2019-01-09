import {
  Message,
  MessageBox
} from 'element-ui'
import router from '@v/layout/router'

import {
  login
} from "../api/interface.js";
import {
  isArray
} from 'util';
import cmd1500Handle from './cmd1500Handle'
import {
  processServerMessage,
  processServerAck
} from 'utils/message'

/**
 * 消息核心处理
 * author:gjx
 * date:2018-12-03
 */
export default function socketCoreProcess(websocket, datas) {
  let $notify = Notification;
  let parseData = function (data) {
    let code = data.code;
    console.info(data)
    showNotification(data);
    // debugger;
    switch (code) {
      case 1001:
        console.log('socketCoreProcess: 1001');
        break;
      case 1002:
        // 账号重复登录提示及处理
        console.log(data);
        console.log('账号在别端登录');
        break;
      case 1003:
        // 登录已失效，请重新登录
        reloadLogin1003(data);
        break;
      case 1004:
        // 登录已失效，请重新登录
        break;
      case 1006:
        // 对方收到消息或读了消息
        console.log('socketCoreProcess: 1006');
        break;
      case 1100:
        // 单聊
        // debugger;
        processServerMessage(data);
        break;
      case 1101:
        // 群聊
        // debugger;
        processServerMessage(data);
        break;
      case 1500:
        //终端控制处理逻辑 {text:"执行成功"}
        let sendBean = cmd1500Handle(websocket, data);
        // sendBean.device = data.fromDevice;
        // sendBean.code = 15001; //收到口令回执
        // websocket.send(sendBean);
        break;
      case 2000:
        debugger; // 消息 ack 回执
        processServerAck(data);
        break;

      default:
    }
  };

  // let allowNotification = window.Notification;
  let showNotification = function (data) {
    // debugger;
    // notificationTypeList 需要消息提示的 code 列表
    let notificationTypeList = [1100, 1101, 11017, 11016, 11018, 1500, 11021, 1005, 1004];
    if (notificationTypeList.indexOf(data.code) < 0) return; // 如果消息不在列表中，则 return
    let bean = data.data;
    let user = bean.user;
    // debugger;
    let who = "自己";
    if (user) {
      who = "别人";
    }
    var title = "收到消息";
    // $notify.success({
    //     title: title,
    //     message: data.msg,
    //     showClose: true,
    //     position: "bottom-right"
    // });
    var n = new Notification(title, { // 标题
      body: data.msg || title, // 显示内容
      icon: "http://jiaxin365.cn/images/cloud/biimg/daiban_iconweb.png",
      lang: 'zh-CN',
      data: {}
    });
    n.onclick = function (event, msg) {
      event.preventDefault(); // prevent the browser from focusing the
      window.focus();
      //Cnbi.Msg.alert("可传入回调函数执行哦，亲！",4);
      // var $btn = $("#layui-layim-min").parent();// $btn.trigger("click");
      n.close();
    }
    setTimeout(function () {
      n.close();
    }, 6000); // 两秒后关闭通知

  }

  // debugger;
  if (isArray(datas)) {
    datas.forEach(data => {
      parseData(data);
    });
  } else {
    parseData(datas);
  }
  /* 刷新有1003过来,用传来的替换本地的token */
  function reloadLogin1003(data) {
    console.log(data.data);
    if (!Cnbi.isEmpty(data.data)) {
      debugger
      let token = data.data.authorization;
      localStorage.authorization = token;
      router.push("/main");
    } else {
      MessageBox.confirm("当前登录已失效,请重新登录!", '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        // electron 退出处理
        if (window.require) {
          var ipc = window.require('electron').ipcRenderer
        }
        if (window.require) {
          ipc.send('web_outLogin', '')
        }
        // 以后要改为自动登录
        router.push("/Login");

      }).catch(() => {
        router.push("/Login");
      })
    }
  }

  function reloadLogin(data) {
    console.log(data.data);
    if (!Cnbi.isEmpty(data.data)) {
      let receive = data.data.user.id;
      let local = JSON.parse(localStorage.database).user.id;
      if (receive === local) {
        console.log("传来的ID和本地id一样,啥也不做");
      }
    } else {
      MessageBox.confirm(data.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // electron 退出处理
        if (window.require) {
          var ipc = window.require('electron').ipcRenderer
        }
        if (window.require) {
          ipc.send('web_outLogin', '')
        }
        // 以后要改为自动登录
        router.push("/message_login");

      }).catch(() => {
        router.push("/message_login");
      })
    }

  }
}