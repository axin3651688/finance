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
 * 说明：组织管理 部门添加请求接口 /department/add
 */
export function department_add(data) {
    return request({
        url: '/zjb/department/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：组织管理 部门删除请求接口 /department/delete
 */
export function department_delete(data) {
    return request({
        url: '/zjb/department/delete',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz
 * 说明：组织管理 部门修改请求接口 /department/update 
 */
export function department_update(data) {
    return request({
        url: '/zjb/department/update',
        method: 'post',
        data: data
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
 * 说明：日志管理模糊搜索的请求接口
 * time: 2019年6月2日13:38:10
 * @param {*} data 
 */
export function dataLikeRequest(data) {
    return request({
        url: '/zjb/sys/log/like_query',
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
/**1
 * name: sjz
 * 说明：应收、预付、其他安全比例和预警比例的查询接口
 */
export function query_sjz(data) {
    return request({
        url: '/zjb/ageanalysis/query?company=' + data.company + '&period=' + data.period + '&item=' + data.item + '&suser=' + data.suser,
        // url: '/zjb/ageanalysis/query',
        method: 'get'
            // params: data
    })
}
/**2
 * name: sjz
 * 说明：应收、预付、其他安全比例和预警比例的新增接口
 */
export function ageanalysis(data) {
    return request({
        url: '/zjb/ageanalysis/add',
        method: 'post',
        data: data
    })
}
/**3
 * name：sjz
 * 说明：应收、预付、其他安全比例和预警比例的修改（更新）接口
 */
export function update_sjz(data) {
    return request({
        url: '/zjb/ageanalysis/update',
        method: 'post',
        data: data
    })
}
/**4
 * name: sjz
 * 说明：应收、预付、其他安全比例和预警比例的删除-接口 /ageanalysis/delete
 */
export function ageanalysis_delete(data) {
    return request({
        url: '/zjb/ageanalysis/delete',
        method: 'post',
        data: data
    })
}
/**1.
 * name: sjz
 * 说明：风险识别的【风险发生概率-参照按钮】接口 /riskprobability/query_tovo
 */
export function riskprobability() {
    return request({
        url: '/zjb/riskprobability/query_tovo',
        method: 'get'
    })
}
/**2.
 * name: sjz
 * 说明：风险识别的【风险影响程度-参照按钮】接口 /risk_influence_degree/query_tovo
 */
export function risk_influence_degree() {
    return request({
        url: '/zjb/risk_influence_degree/query_tovo',
        method: 'get'
    })
}
/**3.
 * name: sjz
 * 说明：风险识别的【删除按钮】接口 /riskdistinguish/delete
 */
export function deleteRiskdistinguish(data) {
    return request({
        url: '/zjb/riskdistinguish/delete',
        method: 'post',
        data: data
    })
}
/**4.
 * name: sjz
 * 说明：风险识别的【风险类型下拉】接口 /risktype/query_all(弃用) || /risktype/queryBycompanyAndDepart
 */
export function risktype(data) {
    return request({
        // url: '/zjb/risktype/query_all',
        url: '/zjb/risktype/queryBycompanyAndDepart',
        method: 'get',
        params: data
    })
}
/**5.
 * name: sjz
 * 说明：风险识别的【报告类型下拉】接口 /riskreporttype/query_all
 */
export function riskreporttype() {
    return request({
        url: '/zjb/riskreporttype/query_all',
        method: 'get'
    })
}
/**6.
 * name: sjz
 * 说明：风险识别的【风险等级】接口 /riskmatrix/query_byscore
 */
export function riskmatrix(data) {
    return request({
        url: '/zjb/riskmatrix/query_byscore',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz
 * 说明：
 */
export function riskmatrix_all() {
    return request({
        url: '/zjb/riskmatrix/query_all',
        method: 'get'
    })
}
/**7.
 * name: sjz
 * 说明：风险识别的【风险矩阵】接口 /riskmatrix/query_tovo
 */
export function riskmatrix_tovo() {
    return request({
        url: '/zjb/riskmatrix/query_tovo',
        method: 'get'
    })
}
/**8.
 * name: sjz
 * 说明：风险识别的【保存/提交按钮】接口 /riskdistinguish/add
 */
export function riskdistinguish_add(data) {
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
export function riskdistinguish_update(data) {
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
export function riskdistinguish_update_sisclose(data) {
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
export function riskdistinguish_risk_release(data) {
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
export function riskreportstate_query_riskreport(data) {
    return request({
        url: '/zjb/riskreportstate/query_riskreport',
        method: 'post',
        data: data
    })
}
// 
/**13.
 * name: sjz
 * 说明：风险报告的【报告页面-上报按钮】接口 /riskreportstate/add
 */
export function riskreportstate_add(data) {
    return request({
        url: '/zjb/riskreportstate/add',
        method: 'post',
        data: data
    })
}
//
/**14.
 * name: sjz
 * 说明：风险报告的【报告页面-退回按钮】接口 /riskreportstate/update_remindback
 */
export function riskreportstate_update_remindback(data) {
    return request({
        url: '/zjb/riskreportstate/update_remindback',
        method: 'post',
        data: data
    })
}
/**15.
 * name: sjz
 * 说明：风险识别的【下达记录按钮】接口 /riskdistinguish/query_release
 */
export function riskdistinguish_query_release(data) {
    return request({
        url: '/zjb/riskdistinguish/query_release',
        method: 'get',
        params: data
    })
}
/**16.
 * name: sjz 
 * 说明：风险识别的【导入按钮】接口 /risk_excel/excel_input
 */
export function risk_excel_excel_input(data) {
    return request({
        url: '/zjb/risk_excel/excel_input',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：系统设置的【全局参数控制】查询接口 /globalparam/query_all
 */
export function globalparam_all() {
    return request({
        url: '/zjb/globalparam/query_all',
        method: 'get'
    })
}
/**
 * name: sjz
 * 说明：系统设置的【全局参数控制】修改添加接口 /globalparam/add
 */
export function globalparam_add(data) {
    return request({
        url: '/zjb/globalparam/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：系统设置的【集团指标】添加弹出框选择器指标接口/dimIndex/queryzb_by_stype
 */
export function dimIndex_queryzb_by_stype(data) {
    return request({
        url: '/zjb/dimIndex/queryzb_by_stype',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz /dimIndex/add
 * 说明：系统设置的【集团指标】表格展现接口 /dimIndex/query_by_stype
 */
export function dimIndex_query_by_stype(data) {
    return request({
        url: '/zjb/dimIndex/query_by_stype',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【集团指标】添加接口 /dimIndex/add
 */
export function dimIndex_add(data) {
    return request({
        url: '/zjb/dimIndex/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【集团指标】删除接口 /dimIndex/delete
 */
export function dimIndex_delete(data, vax) {
    return request({
        url: '/zjb/dimIndex/delete?stype=' + vax,
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【集团指标】数据维护表格展现接口 /dimIndex/queryfact_bystype
 */
export function dimIndex_queryfact_bystype(data) {
    return request({
        url: '/zjb/dimIndex/queryfact_bystype',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【行业指标】查询指标接口 /dim_target/queryall_bystype
 */
export function dim_target_queryall_bystype(data) {
    return request({
        url: '/zjb/dim_target/queryall_bystype',
        method: 'get',
        params: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【行业指标】添加指标接口 /dim_target/add
 */
export function dim_target_add(data) {
    return request({
        url: '/zjb/dim_target/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【行业指标】删除指标接口 /dim_target/delete
 */
export function dim_target_delete(data, vax) {
    return request({
        url: '/zjb/dim_target/delete?stype=' + vax,
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【行业指标】数据维护表格展现接口 /dim_trade/query_all
 */
export function fcattarget_query_by_fcattarget(data) {
    return request({
        url: '/zjb/fcattarget/query_by_fcattarget',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【行业指标】数据维护保存接口 /fcattarget/add
 */
export function fcattarget_add(data) {
    return request({
        url: '/zjb/fcattarget/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【市企指标】企业维护查询数据接口 /dim_cityenterprise/query_all
 */
export function dim_cityenterprise_query_all() {
    return request({
        url: '/zjb/dim_cityenterprise/query_all',
        method: 'get'
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【市企指标】企业维护添加企业接口 /dim_cityenterprise/add
 */
export function dim_cityenterprise_add(data) {
    return request({
        url: '/zjb/dim_cityenterprise/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【市企指标】企业维护删除企业接口 /dim_cityenterprise/delete
 */
export function dim_cityenterprise_delete(data) {
    return request({
        url: '/zjb/dim_cityenterprise/delete',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【市企指标】企业维护修改企业接口 /dim_cityenterprise/update
 */
export function dim_cityenterprise_update(data) {
    return request({
        url: '/zjb/dim_cityenterprise/update',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【上市指标】信息维护查询接口 /dim_listedcompany/query_all
 */
export function dim_listedcompany_query_all() {
    return request({
        url: '/zjb/dim_listedcompany/query_all',
        method: 'get'
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【上市指标】信息维护删除接口 /dim_listedcompany/delete
 */
export function dim_listedcompany_delete(data) {
    return request({
        url: '/zjb/dim_listedcompany/delete',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【上市指标】信息维护添加接口 /dim_listedcompany/add
 */
export function dim_listedcompany_add(data) {
    return request({
        url: '/zjb/dim_listedcompany/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置的【上市指标】信息维护修改接口 /dim_listedcompany/update
 */
export function dim_listedcompany_update(data) {
    return request({
        url: '/zjb/dim_listedcompany/update',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz 
 * 说明：系统设置【上市指标】数据维护模板下载
 */
export function downLoadTemplate() {
    return request({
        url: '/zjb/risk_excel/excel_listedcompany_export',
        responseType: "blob",
        method: 'post'
    })
}
/**
 * name: sjz
 * 说明：
 */
export function selectQuery(data) {
    return request({
        url: "/zjb/select/query",
        method: 'post',
        params: data
    })
}