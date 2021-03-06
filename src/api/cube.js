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

/**
 * GET /api/find_data_cube 按id或code查询标准数据数据集对象 李宁
 * 2019-06-10  by:jhb
 */
// export function FIND_DATA_CUBE(cubeId) {
//   return request({
//     url: '/api/api/find_data_cube',
//     method: 'get',
//     params:{cubeId}
//   })
// }


export function FIND_DATA_CUBE(cubeId) {
  return request({
    url: '/cnbi/test/'+cubeId+".json",
    method: 'get',
    params:{cubeId}
  })
}

