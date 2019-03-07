/**
 * author: 姜海斌
 * date: 2019-01-17
 * description: 在接到服务端 socket 信息后全局弹窗提醒
 */
import store from '@/store'
import {Notification} from 'element-ui'

export function showNotification(data) {
  // debugger;
  const $notify = Notification

  if (!localStorage.authorization) return false // 如果没有登陆不弹消息提示

  // 如果是自己发的群聊信息，不用给自己提示
  if (data.code === 1101 && data.data.senderId === store.getters.user.user.id) {
    return false
  }

  // notificationTypeList 需要消息提示的 code 列表,如果消息不在列表中，则 return
  let notificationTypeList = [1100, 1101, 11017, 11016, 11018, 1500, 11021, 1004, 1005]
  if (notificationTypeList.indexOf(data.code) < 0) return false // 如果消息不在列表中，则 return

  let title = '收到消息'
  let msg = data.msg
  switch (data.code) {
    case 1100: // 单聊消息
      title = '收到好友消息'
      msg = '消息:' + data.data.content
      break
    case 1101: // 群聊消息
      title = '群组：' + data.data.otherName
      msg = data.data.content
      break
    case 11016: // 新朋友
      title = '新的好友申请'
      break
    case 11017: // 群助手
      title = '群助手'
      break
    case 11021: // 分析助手
      title = '分析助手'
      msg = data.data.content
      break
    case 1500: // 智能语音
      title = '小帮机器人'
      let temp = data.msg.replace('发送指令：', '')
      msg = '接收到指令:' + temp
      break
    case 1004: // 上线通知
      title = '上线通知'
      if (data.data.user.id === store.getters.user.user.id) {
        msg = '你刚刚在' + msg.replace('云智囊 for', '')
        // msg = msg.replace('云智囊 for', '')
      }
      break
    case 1005: // 下线通知
      title = '下线通知'
      if (data.data.user.id === store.getters.user.user.id) {
        msg = '你刚刚从' + msg.replace('云智囊 for', '')
        // msg = msg.replace('云智囊 for', '')
      }
      break
  }

  $notify.success({
    title: title,
    message: _cutStr(msg),
    onClick: _handleClick,
    icon: 'http://jiaxin365.cn/images/cloud/biimg/daiban_iconweb.png',
    showClose: true,
    position: 'bottom-right'
  })

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

/**
 * 消息提示点击后的操作
 * @private
 */
function _handleClick() {
  // if ()
  // alert(data);
}

/**
 * 字符长度限制
 * @param string
 */
function _cutStr(string) {
  if (string.length > 30) {
    string = string.substr(0, 15) + '···'
  }
  return string
}
