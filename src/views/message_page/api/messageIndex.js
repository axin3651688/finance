// message 页面获取消息列表
import request from 'utils/http'


// // 移除团队成员
// export function DEL_GROUP_USER(data) {
//   debugger;
//   return request({
//     url: '/api/api/del_group_user',
//     method: 'post',
//     data: data
//   })
// }

// GET /api/find_card
// 查询可以添加的卡片数据 FIND_CARD
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

//   GET /api/my_node
// 我的节点 MY_NODE 
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

//   /api/latest_contact
// 常用联系人 LATEST_CONTACT
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