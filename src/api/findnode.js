import request from 'utils/http'
// 侧边栏请求
export function findnode(userId, code) {
  // console.log("进来请求");
  // debugger
  return request({
    url: '/api/api/find_node',
    method: 'get',
    params: {
      "userId": userId,
      "code": code
    }
  })
}