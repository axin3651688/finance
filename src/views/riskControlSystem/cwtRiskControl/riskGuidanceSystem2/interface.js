/**
 * name: sjz
 * 风险指引制度（2版）接口
 */
import request from 'utils/http'

/**
 * @function 风险指引标题服务操作接口
 */
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】查询接口（注：应用于目录的标题）
 */
export function riskguidetitle_All() {
    return request({
        url: '/zjb/riskguidetitle/query_all',
        method: 'get'
    })
}
/** 
 * name: sjz
 * 说明：风险指引制度
 *      【标题】添加接口 
 */
export function riskguidetitle_Add(data) {
    return request({
        url: '/zjb/riskguidetitle/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】删除接口 
 */
export function riskguidetitle_Delete(data) {
    return request({
        url: '/zjb/riskguidetitle/delete ',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】修改接口 
 */
export function riskguidetitle_Updata(data) {
    return request({
        url: '/zjb/riskguidetitle/update ',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：风险指引制度
 *      【目录】查询接口
 * @param {*} data 
 */
export function selectAll(data) {
    return request({
        url: '/zjb/select/query',
        method: 'get',
        params: data
    })
}