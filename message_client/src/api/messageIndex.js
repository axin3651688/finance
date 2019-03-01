// message 页面获取消息列表
import request from '@mu/http'

/**
 * 查询可以添加的卡片数据 FIND_CARD 方滔滔
 * GET /api/find_card
 * 模块数据操作接口 : Module Client Rest
 */
export function FIND_CARD(userId) {
  // debugger
  return request({
    url: '/api/api/find_card',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

/**
 * 我的节点 MY_NODE 方滔滔
 * GET /api/my_node
 * 模块数据操作接口 : Module Client Rest
 */
export function MY_NODE(userId) {
  // debugger
  return request({
    url: '/api/api/my_node',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

/**
 * 常用联系人 LATEST_CONTACT 龚佳新
 * GET /api/latest_contact
 * 首页我的数据操作接口 : Index Client Rest
 */
export function LATEST_CONTACT(userId) {
  // debugger
  return request({
    url: '/api/api/latest_contact',
    method: 'get',
    params: {
      userId: userId
    }
  })
}
