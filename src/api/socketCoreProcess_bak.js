import {
<<<<<<< HEAD
  Message,
  MessageBox,
  Notification
=======
    Message,
    MessageBox
>>>>>>> c7fd3a348bfd2563fe7785bd7cfeb99e7c5aa7b1
} from 'element-ui'
import {
  login
} from "../api/interface.js";
import {
  isArray
} from 'util';
import cmd1500Handle from './cmd1500Handle'
import {
<<<<<<< HEAD
  processServerMessage,
  processServerAck
=======
    processServerMessage
>>>>>>> c7fd3a348bfd2563fe7785bd7cfeb99e7c5aa7b1
} from 'utils/message'

/**
 * 消息核心处理
 * author:gjx
 * date:2018-12-03
 */
export default function socketCoreProcess(websocket, datas) {
<<<<<<< HEAD
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
        console.log('socketCoreProcess: 1002+账号在别端登录');
        reload(data)
        break;
      case 1003:
        // 登录已失效，请重新登录
        // debugger;
        // todo: 根据不同平台（web/客户端）跳到不同的登录页面
        console.log('socketCoreProcess: 1003+登录已失效，请重新登录', data);
        reloadLogin(data)
        break;
      case 1004:
        // 你已在Windows登陆
        console.log('socketCoreProcess: 1004+你已在Windows登陆');
        // reload1004(data)

        break;
      case 1005:
        // 你已在Windows下线
        console.log('socketCoreProcess: 1005');
        reload(data)
        break;
      case 1006:
        // 对方收到消息或读了消息
        debugger;
        console.log('socketCoreProcess: 1006');
        break;
      case 1100:
        debugger; // 单聊
        processServerMessage(data);
        break;
      case 1101:
        debugger; // 群聊
        processServerMessage(data);
        break;
      case 2000:
        debugger; // 消息 ack 回执
        processServerAck(data);
        break;
      case 1500:
        //终端控制处理逻辑 {text:"执行成功"}
        let sendBean = cmd1500Handle(websocket, data);
        // sendBean.device = data.fromDevice;
        // sendBean.code = 15001; //收到口令回执
        // websocket.send(sendBean);
        break;

      default:
    }
  };

  let allowNotification = window.Notification;
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
    $notify.success({
      title: title,
      message: data.msg,
      showClose: true,
      position: "bottom-right"
    });
    // var n = new Notification("adfdfdf", { // 标题
    //     body: "内容：", // 显示内容
    //     icon: "http://jiaxin365.cn/images/cloud/biimg/daiban_iconweb.png",
    //     lang: 'zh-CN',
    //     data: {}
    // });
    //    n.onclick = function(event,msg){
    //        event.preventDefault(); // prevent the browser from focusing the
    //        window.focus();
    //        //Cnbi.Msg.alert("可传入回调函数执行哦，亲！",4);
    //        // var $btn = $("#layui-layim-min").parent();// $btn.trigger("click");
    //        n.close();
    //    }
    //    setTimeout(function() {n.close();}, 6000);// 两秒后关闭通知

  }

  let permission = allowNotification.permission;
  if (permission == "denied") {
    // debugger;
    var notification = new window.Notification("这是一个通知撒:", {
      dir: "auto",
      lang: "hi",
      tag: "testTag",
      icon: "https://static.cnblogs.com/images/adminlogo.gif",
      body: "通知content"
    });
  }
=======
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
                console.log('socketCoreProcess: 1003');
                break;
            case 1004:
            // 登录已失效，请重新登录
             console.log('socketCoreProcess: 1003');
            break;    
            case 1006:
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
>>>>>>> c7fd3a348bfd2563fe7785bd7cfeb99e7c5aa7b1

  function reload1004(data) {
    console.log(data.data);
    if (!Cnbi.isEmpty(data.data)) {
      let receive = data.data.user.id;
      let local = JSON.parse(localStorage.database).user.id
      if (receive === local) {
        console.log("传来的ID和本地id一样,强制退到登录界面");
        showMessage(data)
      }
    } else {
      showMessage(data)
    }

<<<<<<< HEAD
  }

  function reload(data) {
    console.log(data.data);
    if (!Cnbi.isEmpty(data.data)) {
      let receive = data.data.user.id;
      let local = JSON.parse(localStorage.database).user.id
      if (receive === local) {
        console.log("传来的ID和本地id一样,啥也不做");
      }
    } else {
      showMessage(data)
    }

  }
=======
>>>>>>> c7fd3a348bfd2563fe7785bd7cfeb99e7c5aa7b1

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

  function showMessage(data) {
    MessageBox.confirm(data.msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 以后要改为自动登录
      router.push("/login");


    }).catch(() => {
      router.push("/login");
    })
  }

  // debugger;
  if (isArray(datas)) {
    datas.forEach(data => {
      parseData(data);
    });
  } else {
    parseData(datas);
  }
}