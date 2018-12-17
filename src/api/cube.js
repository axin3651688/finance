import request from 'utils/http'
import { id } from 'postcss-selector-parser';

export function findCube(params) {
  return request({
    url: '/api/cube/find/',
    method: 'post',
    params: params
  })
}

// 填报页面
// export function report(item) {
//   return request({
//     url: '/get/cube/find_table_datas/',
//     method: 'post',
//     params:item
//   })
// }


export function report(item) {
  return request({
    url: '/get/cube/find_sql/',
    method: 'get',
    params:item
  })
}





