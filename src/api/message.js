/**
 * get请求用params，post用data
 */
import request from 'utils/http'


//上传文件
export function UPLOAD_FILE(data) {
  // debugger;
  return request({
    // url: proxy.file + '/api/file/upload_file',
    url: '/file/upload_file',
    method: 'post',
    data: data
  })
}


// 获取消息左边栏数据
export function MY_SESSION(userId) {
  // debugger
  return request({
    // url: proxy.file + '/api/my_session',
    url: '/api/api/my_session',
    method: 'get',
    params: {
      'userId': userId
    }
  })
}

// 获取单聊消息
export function FIND_SINGLE_MSG(senderId, receiverId) {
  // debugger;
  if (!senderId || !receiverId) return request({}); // 如果没有传参，返回空 request
  return request({
    url: '/api/api/find_single_msg',
    method: 'post',
    data: {
      page: 1,
      receiverId: receiverId,
      senderId: senderId,
      size: 30
    }
  })
}

// 获取群聊聊消息
export function findGroupMsg(data) {
  // console.log(" api findGroupMsg");
  // debugger
  return request({
    url: '/api/api/find_group_msg',
    // url: $api + '/api/find_group_msg',
    method: 'post',
    data: data
    // data: {
    //   page: 1,
    //   groupId: 4,
    //   userId: 225,
    //   size: 20
    // }
  })
}

// 发送消息，接受一个完整的数据对象
export function sendMsg(data) {
  debugger;
  return request({
    url: '/api/api/deliver',
    method: 'post',
    data: data
  })
}

// 发送消息，接受一个完整的数据对象
export function requestMyfriends(data) {
  // debugger
  return request({
    url: '/api/api/my_friend_list',
    method: 'get',
    params: {
      userId: data
    }
  })
}

// 查看个人资料
export function CONTACT_INFO(userId, targetId) {
  // debugger
  return request({
    url: '/api/api/contact_info',
    method: 'get',
    params: {
      userId: userId,
      targetId: targetId
    }
  })
}

// 查看个人资料，左边自己的详细信息
export function LEFT_USER_INFO(userId, targetId) {
  // debugger
  return request({
    url: '/api/api/left_user_info',
    method: 'get',
    params: {
      userId: userId,
      targetId: targetId
    }
  })
}

// /api/my_group_list
// 我的群组列表 MY_GROUP_LIST
export function MY_GROUP_LIST(userId) {
  // debugger
  return request({
    url: '/api/api/my_group_list',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 查询订阅消息列表
export function FIND_MODULE_MSG(data) {
  // debugger
  return request({
    url: '/api/api/find_module_msg',
    method: 'post',
    data: data
  })
}

// 消除订阅消息左侧红点未读数，进入页面时请求
export function UPDATE_MODULE_STATE_ALL(data) {
  console.log('api UPDATE_MODULE_STATE_ALL');
  // debugger
  return request({
    url: '/api/api/update_module_state_all',
    method: 'put',
    params: data
  })
}

// 单条订阅消息，点击单条时
export function CHANGE_MODULE_STATE(data) {
  console.log('api CHANGE_MODULE_STATE');
  // debugger
  return request({
    url: '/api/api/change_module_state',
    method: 'put',
    params: data
  })
}

// 查询群助手消息通知
export function HELP_GROUP_MSG(data) {
  console.log('api HELP_GROUP_MSG');
  // debugger
  return request({
    url: '/api/api/help_group_msg',
    method: 'get',
    params: {
      userId: data
    }
  })
}

// 群组同意某人加群
export function JOIN_GROUP(data) {
  debugger;
  return request({
    url: '/api/api/join_group',
    method: 'post',
    data: data
  })
}

// 查询新朋友消息通知
export function NEW_FRIEND_LIST(data) {
  console.log('api NEW_FRIEND_LIST');
  // debugger
  return request({
    url: '/api/api/new_friend_list',
    method: 'get',
    params: {
      userId: data
    }
  })
}

// 处理好友申请时调用，保存好友添加好友
export function SAVE_FRIEND(data) {
  // let temp = { // 数据模板
  //   friendId: 0,
  //   userId: 0
  // };
  debugger;
  return request({
    url: '/api/api/save_friend',
    method: 'post',
    data: data
  })
}

// 处理好友申请时调用，保存好友,之后更新这条消息的状态 更新群组邀请消息状态
export function REFUSE_GROUP(params) {
  // let temp = {    // 模板数据
  //   code: '',     // 字符串
  //   state: 3      // 3拒绝，4同意
  // };
  debugger;
  return request({
    url: '/api/api/refuse_group',
    method: 'put',
    params: params
  })
}

// 处理好友申请时调用，保存好友,之后更新这条消息的状态 更新新朋友消息通知
export function REFUSE_FRIEND(params) {
  // let temp = {    // 模板数据
  //   code: '',     // 字符串
  //   state: 3      // 3拒绝，4同意
  // };
  debugger;
  return request({
    url: '/api/api/refuse_friend',
    method: 'get',
    params: params
  })
}

// 查看群组详细资料
export function GROUP_INFO(data) {
  console.log('api GROUP_INFO');
  // debugger
  return request({
    url: '/api/api/group_info',
    method: 'get',
    params: {
      groupId: data
    }
  })
}

// 修改群资料
export function EDIT_GROUP(data) {
  console.log('api EDIT_GROUP');
  // debugger
  return request({
    url: '/api/api/edit_group',
    method: 'put',
    params: data
  })
}

// 退出群组
export function QUIT_GROUP(data) {
  console.log('api QUIT_GROUP');
  // debugger
  return request({
    url: '/api/api/quit_group',
    method: 'delete',
    params: data
  })
}

// 解散群聊
export function DISSOLU_GROUP(data) {
  console.log('api DISSOLU_GROUP');
  // debugger
  return request({
    url: '/api/api/dissolu_group',
    method: 'delete',
    params: data
  })
}

// 移除团队成员
export function DEL_GROUP_USER(data) {
  debugger;
  return request({
    url: '/api/api/del_group_user',
    method: 'post',
    data: data
  })
}

// 查询群聊公告
export function FIND_GROUP_NOTICE(groupId, userId) {
  // debugger
  return request({
    url: '/api/api/find_group_notice',
    method: 'get',
    params: {
      groupId: groupId,
      userId: userId
    }
  })
}

// 获取二维码的生成地址
export function SCAN_URL(data) {
  // debugger
  return request({
    url: '/api/auth/cnbi_scan',
    method: 'get',
    params: data
  })
}

// 我的公司列表,不查人员
export function MY_COMPANY_LIST(userId) {
  // debugger
  return request({
    url: '/api/api/my_company_list',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 组织成员列表
export function MY_COMPANY_CONTACT_LIST(companyId) {
  console.log('api MY_COMPANY_CONTACT_LIST');
  // debugger
  return request({
    url: '/api/api/my_contact_list',
    method: 'get',
    params: {
      companyId: companyId
    }
  })
}

// 查询团队与人员的二及列表
export function ALL_COMPANY_CONTACT_LIST(userId) {
  // debugger
  return request({
    url: '/api/api/my_company_contact_list',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 拉好友进群
export function SEND_GROUP_INVITE_MSG(data) {
  // debugger;
  return request({
    url: '/api/api/send_group_invite_msg',
    method: 'post',
    data: data
  })
}

// 获取登录二维码
export function SCAN_LOGIN_URL(params) {
  // debugger;
  return request({
    url: '/auth/scan_login_url',
    method: 'get',
    params: params
  })
}


// 全局搜索 GET /api/search_my_contact
export function SEARCH_MY_CONTACT(params) {
  // debugger;
  return request({
    url: '/api/api/search_my_contact',
    method: 'get',
    params: params
  })
}
