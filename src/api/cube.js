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
        params: item
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
        url: '/zjb/online/onlineuser',
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
        // url: '/api/api/find_data?cubeId='+data.cubeId + "&sql="+data.sql,
        // method: 'post'
        // data: data
        url: '/zjb/zjb/find_data?cubeId=' + data.cubeId + "&sql=" + data.sql,
        method: 'get'
    })
}
/**
 * name : sjz
 * 说明 ：图片编辑管理的走马灯显示接口
 * 文件 ：systemSettings/tabPicture.vue
 * time : 2019/3/20 17:32:32
 */
export function UploadShow() {
    return request({
        url: '/zjb/upload/find?show=1',
        method: 'get'
        // params: data
    })
}
/**
 * name: sjz
 * 说明：应收、预付、其他安全比例和预警比例的查询接口
 */
export function query_sjz(data){
    return request({
        url: '/zjb/ageanalysis/query?company=' + data.company + '&period=' + data.period + '&item=' + data.item + '&suser=' + data.suser,
        // url: '/zjb/ageanalysis/query',
        method: 'get'
        // params: data
    })
}
/**
 * name: sjz
 * 说明：应收、预付、其他安全比例和预警比例的新增接口
 */
export function ageanalysis(data){
    return request({
        url: '/zjb/ageanalysis/add',
        method: 'post',
        data: data
    })
}
/**
 * name：sjz
 * 说明：应收、预付、其他安全比例和预警比例的修改（更新）接口
 */
export function update_sjz(data){
    return request({
        url: '/zjb/ageanalysis/update',
        method: 'post',
        data: data
    })
}
/**1.
 * name: sjz
 * 说明：风险识别的【风险发生概率-参照按钮】接口 /riskprobability/query_tovo
 */
export function riskprobability(){
    return request({
        url: '/zjb/riskprobability/query_tovo',
        method: 'get'
    })
}
/**2.
 * name: sjz
 * 说明：风险识别的【风险影响程度-参照按钮】接口 /risk_influence_degree/query_tovo
 */
export function risk_influence_degree(){
    return request({
        url: '/zjb/risk_influence_degree/query_tovo',
        method: 'get'
    })
}
/**3.
 * name: sjz
 * 说明：风险识别的【删除按钮】接口 /riskdistinguish/delete
 */
export function deleteRiskdistinguish(data){
    return request({
        url: '/zjb/riskdistinguish/delete',
        method: 'post',
        data: data
    })
}
/**4.
 * name: sjz
 * 说明：风险识别的【风险类型下拉】接口 /risktype/query_all
 */
export function risktype(){
    return request({
        url: '/zjb/risktype/query_all',
        method: 'get'
    })
}
/**5.
 * name: sjz
 * 说明：风险识别的【报告类型下拉】接口 /riskreporttype/query_all
 */
export function riskreporttype(){
    return request({
        url: '/zjb/riskreporttype/query_all',
        method: 'get'
    })
}
/**6.
 * name: sjz
 * 说明：风险识别的【风险等级】接口 /riskmatrix/query_byscore
 */
export function riskmatrix(data){
    return request({
        url: '/zjb/riskmatrix/query_byscore',
        method: 'get',
        params: data
    })
}
/**7.
 * name: sjz
 * 说明：风险识别的【风险矩阵】接口 /riskmatrix/query_tovo
 */
export function riskmatrix_tovo(){
    return request({
        url: '/zjb/riskmatrix/query_tovo',
        method: 'get'
    })
}
/**8.
 * name: sjz
 * 说明：风险识别的【保存/提交按钮】接口 /riskdistinguish/add
 */
export function riskdistinguish_add(data){
    return request({
        url: '/zjb/riskdistinguish/add',
        method: 'post',
        data: data
    })
}
/**9.
 * name: sjz
 * 说明：风险识别的【修改按钮】接口 /riskdistinguish/update
 */
export function riskdistinguish_update(data){
    return request({
        url: '/zjb/riskdistinguish/update',
        method: 'post',
        data: data
    })
}
/**10.
 * name: sjz
 * 说明：风险识别的【风险关闭按钮】接口 /riskdistinguish/update_sisclose
 */
export function riskdistinguish_update_sisclose(data){
    return request({
        url: '/zjb/riskdistinguish/update_sisclose',
        // contentType: "application/json;charset=UTF-8",
        method: 'get',
        // dataType: 'json',
        params: data
    })
}
/**11.
 * name: sjz
 * 说明：风险识别的【下达/批量下达按钮】接口 /riskdistinguish/risk_release
 */
export function riskdistinguish_risk_release(data){
    return request({
        url: '/zjb/riskdistinguish/risk_release',
        method: 'post',
        data: data
    })
}
/**12.
 * name: sjz
 * 说明：风险报告的【报告页面】接口 /riskreportstate/query_riskreport
 */
export function riskreportstate_query_riskreport(data){
    return request({
        url: '/zjb/riskreportstate/query_riskreport',
        method: 'post',
        data: data
    })
}