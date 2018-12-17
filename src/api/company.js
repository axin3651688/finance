import request from 'utils/http'
// 公司数请求
export function getcompanyTreee(id, dimName, type, pid) {
  // console.log("进来请求");
  return request({
    url: '/get/cube/find_dim' + id + '/' + dimName + '/' + type + '/' + pid,
    // url: '/tree/cube/find_dim2/company/0/1',
    method: 'get',
  })
}