import {
    Message,
    MessageBox,
    Notification
} from 'element-ui'
import {
    login
} from "../api/interface.js";
import {
    isArray
} from 'util';
import cmd1500Handle from './cmd1500Handle'
import {
    processServerMessage
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
                alert('账号在别端登录')
                console.log('账号在别端登录');
                break;
            case 1003:
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
        var title = title = "收到" + who + "的消息";
        $notify.success({
            title: title,
            message: data.msg,
            showClose: true,
            position: "bottom-right"
        });
        //    var n = new allowNotification(title, {// 标题
        //        body : "内容：" +data.msg , // 显示内容
        //        icon : user?user.avatar:"http://jiaxin365.cn/images/cloud/biimg/daiban_iconweb.png",
        //        lang : 'zh-CN',
        //        data : data
        //    });
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


    // debugger;
    if (isArray(datas)) {
        datas.forEach(data => {
            parseData(data);
        });
    } else {
        parseData(datas);
    }
}