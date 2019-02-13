/**
 * author: 姜海斌
 * date: 2019-01-17
 * description: 在接到服务端 socket 信息后全局弹窗提醒
 */
import store from '@/store';
import {Notification} from 'element-ui';

export function showNotification(data) {
  const $notify = Notification;
  // debugger;

  if (!localStorage.authorization) return false; // 如果没有登陆不弹消息提示

  // 如果是自己发的群聊信息，不用给自己提示
  if (data.code === 1101 && data.data.senderId === store.getters.user.user.id) {
    return false;
  }

  // notificationTypeList 需要消息提示的 code 列表,如果消息不在列表中，则 return
  let notificationTypeList = [1100, 1101, 11017, 11016, 11018, 1500, 11021, 1005, 1004];
  if (notificationTypeList.indexOf(data.code) < 0) return false; // 如果消息不在列表中，则 return

  let bean = data.data;
  let user = bean.user;
  let who = '自己';
  if (user) {
    who = '别人';
  }
  var title = '收到消息';
  $notify.success({
    title: title,
    message: data.msg,
    showClose: true,
    position: 'bottom-right'
  });
  // var n = new Notification(title, { // 标题
  //   body: data.msg || title, // 显示内容
  //   icon: "http://jiaxin365.cn/images/cloud/biimg/daiban_iconweb.png",
  //   lang: 'zh-CN',
  //   data: {}
  // });
  // n.onclick = function (event, msg) {
  //   event.preventDefault(); // prevent the browser from focusing the
  //   window.focus();
  //   //Cnbi.Msg.alert("可传入回调函数执行哦，亲！",4);
  //   // var $btn = $("#layui-layim-min").parent();// $btn.trigger("click");
  //   n.close();
  // }
  // setTimeout(function () {
  //   n.close();
  // }, 6000); // 两秒后关闭通知
}
