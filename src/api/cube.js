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
 * name: sjz
 * 说明：日志管理数据对的请求接口
 * time: 2019/1/18 10:00:00 礼拜五
 * @param {*} data 
 */
export function dataRequest(data) {
  return request({
    // url: '/api/api/find_sys_log?cubeId=7',
    // method: 'post',
    // data:data
    url: '/zjb/sys/log/queryall_page',
    method: 'get',
    params: data
  })
}
/**
 * name: sjz
 * 说明: 在线用户数据的请求接口
 * time: 2019/1/18 16:54:00
 */
export function onlineRequest(data) {
  return request({
    // url: '/zjb/zjb/online_user_list',
    // method: 'post',
    // data: data
    url: '/fq/online/onlineuser',
    method: 'get',
    params: data
  })
}
/**
 * name: sjz
 * 说明 : 市管企业经营业绩情况表请求接口;
 *        EVA表的请求接口
 * time : 2019/2/22 15:55:00
 */
export function eva_city_Request(data) {
  return request({
    url: '/api/api/find_data?cubeId='+data.cubeId + "&sql="+data.sql,
    method: 'post'
    // data: data
  })
}



