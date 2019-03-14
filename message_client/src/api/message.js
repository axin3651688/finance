/**
 * 刘琦(464823519)  9:48:30
 @姜海斌 post  /api/find_group_file

 查看群文件 FIND_GROUP_FILE 李宁

 /api/find_group_img

 查看群相册 FIND_GROUP_IMG 李宁

 2.224服务上有这个接口
 */

/**
 * 约定：get请求用params，post用data
 * 约定：api函数名同一大写,下划线连接
 */
import request from '@mu/http'

/**
 * 登录接口
 * POST /auth/login
 * 登录登出二维码操作接口 : Login Client Rest
 */
export function LOGIN(loginUser) {
  // debugger;
  return request({
    url: '/api/auth/login',
    method: 'post',
    params: { // 这里需要用 params 不可以用 data
      account: loginUser.usename,
      password: loginUser.password
    }
  })
}

/**
 * 登出接口
 * GET /auth/logout
 * 登录登出二维码操作接口 : Login Client Rest
 */
export function LOGOUT() {
  return request({
    url: '/api/auth/logout',
    method: 'get'
  })
}

/**
 * 获取二维码的生成地址 SCAN_URL 龚佳新
 * GET /auth/cnbi_scan
 * 登录登出二维码操作接口 : Login Client Rest
 */
export function SCAN_URL(data) {
  // debugger
  return request({
    url: '/api/auth/cnbi_scan',
    method: 'get',
    params: data
  })
}

/**
 * 获取登录二维码url SCAN_LOGIN_URL 李宁
 * GET /auth/scan_login_url
 * 登录登出二维码操作接口 : Login Client Rest
 */
export function SCAN_LOGIN_URL(params) {
  // debugger;
  return request({
    url: '/api/auth/scan_login_url',
    method: 'get',
    params: params
  })
}

/**
 * 上传文件
 * POST /api/file_upload
 * 文件数据操作接口 : File Client Rest
 */
export function FILE_UPLOAD(data) {
  // debugger;
  return request({
    url: '/api/api/file_upload',
    method: 'post',
    data: data
  })
}

/**
 * 获取消息左边栏session数据
 * GET /api/my_session
 * 首页我的数据操作接口 : Index Client Rest
 */
export function MY_SESSION(userId) {
  // debugger
  return request({
    url: '/api/api/my_session',
    method: 'get',
    params: {
      'userId': userId
    }
  })
}

/**
 * 查看个人资料，左边自己的详细信息
 * GET /api/left_user_info
 * 首页我的数据操作接口 : Index Client Rest
 */
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

/**
 * 获取 单聊消息
 * POST /api/find_single_msg
 * 消息操作接口 : Message Client Rest
 */
export function FIND_SINGLE_MSG(data) {
  // debugger;
  return request({
    url: '/api/api/find_single_msg',
    method: 'post',
    data: data
  })
}

/**
 * 获取 群聊聊消息
 * POST /api/find_group_msg
 * 消息操作接口 : Message Client Rest
 */
export function FIND_GROUP_MSG(data) {
  // debugger
  return request({
    url: '/api/api/find_group_msg',
    method: 'post',
    data: data
  })
}

/**
 * 发送 单聊消息
 * POST /api/save_single_msg
 * 消息操作接口 : Message Client Rest
 */
export function SAVE_SINGLE_MSG(data) {
  // debugger;
  return request({
    url: '/api/api/save_single_msg',
    method: 'post',
    data: data
  })
}

/**
 * 发送 群聊消息
 * POST /api/save_group_msg
 * 消息操作接口 : Message Client Rest
 */
export function SAVE_GROUP_MSG(data) {
  // debugger;
  return request({
    url: '/api/api/save_group_msg',
    method: 'post',
    data: data
  })
}

/**
 * 发送消息
 * POST /api/deliver
 * 消息操作接口 : Message Client Rest
 */
export function sendMsg(data) {
  debugger
  return request({
    url: '/api/api/deliver',
    method: 'post',
    data: data
  })
}

/**
 * 分页查询模块订阅消息
 * POST /api/find_module_msg
 * 消息操作接口 : Message Client Rest
 */
export function FIND_MODULE_MSG(data) {
  // debugger
  return request({
    url: '/api/api/find_module_msg',
    method: 'post',
    data: data
  })
}

/**
 * 单聊回执(截止时间方式的)
 * POST /api/update_chat_state_time
 * 消息操作接口 : Message Client Rest
 * 消除单聊消息未读计数
 */
export function UPDATE_CHAT_STATE_TIME(data) {
  return request({
    url: '/api/api/update_chat_state_time',
    method: 'post',
    data: data
  })
}

/**
 * 更改群聊消息的状态 state=6 撤回
 * POST /api/update_groupchat_state
 * 消息操作接口 : Message Client Rest
 */
export function UPDATE_GROUPCHAT_STATE(data) {
  return request({
    url: '/api/api/update_groupchat_state',
    method: 'post',
    data: data
  })
}

/**
 * 我的好友列表
 * GET /api/my_friend_list
 * 用户数据操作接口 : User Client Rest
 */
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

/**
 * 添加好友
 * POST /api/save_friend
 * 用户数据操作接口 : User Client Rest
 * 处理好友申请时调用，保存好友添加好友
 */
export function SAVE_FRIEND(data) {
  // debugger
  return request({
    url: '/api/api/save_friend',
    method: 'post',
    data: data
  })
}

/**
 * 查询团队与人员的二及列表 ALL_COMPANY_CONTACT_LIST 龚佳新
 * GET /api/my_contact_list
 * 用户数据操作接口 : User Client Rest
 */
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

/**
 * 搜索我通讯录中的所有人 SEARCH_MY_CONTACT 李宁
 * GET /api/search_my_contact
 * 用户数据操作接口 : User Client Rest
 */
export function SEARCH_MY_CONTACT(params) {
  // debugger;
  return request({
    url: '/api/api/search_my_contact',
    method: 'get',
    params: params
  })
}

/**
 * 组织成员通讯 MY_COMPANY_CONTACT_LIST 龚佳新
 * GET /api/my_contact_list
 * 用户数据操作接口 : User Client Res
 * 组织成员列表
 */
export function MY_COMPANY_CONTACT_LIST(companyId) {
  // debugger
  return request({
    url: '/api/api/my_contact_list',
    method: 'get',
    params: {
      companyId: companyId
    }
  })
}

/**
 * 成员资料
 * GET /api/contact_info
 * 公司数据操作接口 : Company Client Rest
 */
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

/**
 * 我的公司列表 MY_COMPANY_LIST 龚佳新 方滔滔
 * GET /api/my_company_list
 * 公司数据操作接口 : Company Client Rest
 */
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

/**
 * session模块消息已读
 * PUT /api/update_module_state_all
 * 模块数据操作接口 : Module Client Rest
 * 消除订阅消息左侧红点未读数，进入页面时请求
 */
export function UPDATE_MODULE_STATE_ALL(data) {
  // debugger
  return request({
    url: '/api/api/update_module_state_all',
    method: 'put',
    params: data
  })
}

/**
 * 修改模块消息状态
 * PUT /api/change_module_state
 * 模块数据操作接口 : Module Client Rest
 */
export function CHANGE_MODULE_STATE(data) {
  // debugger
  return request({
    url: '/api/api/change_module_state',
    method: 'put',
    params: data
  })
}

/**
 * 查询群助手消息通知
 * GET /api/help_group_msg
 * 申请消息操作接口 : Apply Msg Client Rest
 */
export function HELP_GROUP_MSG(data) {
  // debugger
  return request({
    url: '/api/api/help_group_msg',
    method: 'get',
    params: {
      userId: data
    }
  })
}

/**
 * 查询新朋友消息通知
 * GET /api/new_friend_list
 * 申请消息操作接口 : Apply Msg Client Rest
 */
export function NEW_FRIEND_LIST(data) {
  // debugger
  return request({
    url: '/api/api/new_friend_list',
    method: 'get',
    params: {
      userId: data
    }
  })
}

/**
 * 更新群组邀请消息状态
 * PUT /api/refuse_group
 * 申请消息操作接口 : Apply Msg Client Rest
 * 处理好友申请时调用，保存好友,之后更新这条消息的状态 更新群组邀请消息状态
 */
export function REFUSE_GROUP(params) {
  // debugger
  return request({
    url: '/api/api/refuse_group',
    method: 'put',
    params: params
  })
}

/**
 * 更新新朋友消息通知
 * GET /api/refuse_friend
 * 申请消息操作接口 : Apply Msg Client Rest
 * 处理好友申请时调用，保存好友,之后更新这条消息的状态 更新新朋友消息通知
 */
export function REFUSE_FRIEND(params) {
  // let temp = {    // 模板数据
  //   code: '',     // 字符串
  //   state: 3      // 3拒绝，4同意
  // };
  // debugger
  return request({
    url: '/api/api/refuse_friend',
    method: 'get',
    params: params
  })
}

/**
 * 查看群组详细资料
 * GET /api/group_info
 * 群组数据操作接口 : Group Client Rest
 */
export function GROUP_INFO(data) {
  // debugger
  return request({
    url: '/api/api/group_info',
    method: 'get',
    params: {
      groupId: data
    }
  })
}

/**
 * 修改群资料
 * PUT /api/edit_group
 * 群组数据操作接口 : Group Client Rest
 */
export function EDIT_GROUP(data) {
  // debugger
  return request({
    url: '/api/api/edit_group',
    method: 'put',
    params: data
  })
}

/**
 * 退出群组
 * DELETE /api/quit_group
 * 群组数据操作接口 : Group Client Rest
 */
export function QUIT_GROUP(data) {
  // debugger
  return request({
    url: '/api/api/quit_group',
    method: 'delete',
    params: data
  })
}

/**
 * 解散群聊
 * DELETE /api/dissolu_group
 * 群组数据操作接口 : Group Client Rest
 */
export function DISSOLU_GROUP(data) {
  // debugger
  return request({
    url: '/api/api/dissolu_group',
    method: 'delete',
    params: data
  })
}

/**
 * 移除团队成员
 * POST /api/del_group_user
 * 群组数据操作接口 : Group Client Rest
 */
export function DEL_GROUP_USER(data) {
  debugger
  return request({
    url: '/api/api/del_group_user',
    method: 'post',
    data: data
  })
}

/**
 * 申请加入群聊，群主同意某人加群
 * POST /api/join_group
 * 群组数据操作接口 : Group Client Rest
 */
export function JOIN_GROUP(data) {
  debugger
  return request({
    url: '/api/api/join_group',
    method: 'post',
    data: data
  })
}

/**
 * 邀请加入群聊 SEND_GROUP_INVITE_MSG 方滔滔
 * POST /api/send_group_invite_msg
 * 群组数据操作接口 : Group Client Rest
 */
export function SEND_GROUP_INVITE_MSG(data) {
  // debugger;
  return request({
    url: '/api/api/send_group_invite_msg',
    method: 'post',
    data: data
  })
}

/**
 * 我的群组列表
 * GET /api/my_group_list
 * 群组数据操作接口 : Group Client Rest
 */
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

/**
 * 查询群聊公告
 * GET /api/find_group_notice
 * 群聊公告操作接口 : Group Notice Client Rest
 */
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
