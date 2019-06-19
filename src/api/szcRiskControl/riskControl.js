import request from 'utils/http'

/**
 * 根据部门来查询风险管控的内容。
 * @author szc 2019年5月21日11:37:58
 */
export function deptQueryRisk() {
    return request({
        url: '/fill/query',
        method: 'post'
    })
}
/**
 * 根据部门来查询风险管控的内容。
 * @author szc 2019年5月21日11:37:58
 */
export function queryInstructions(params) {
    return request({
        url: '/fill/query',
        method: 'post',
        data: params
    })
}
/**
 * 查询风险应对策略。
 * @author szc 2019年5月21日11:37:58
 */
export function queryCopingStrategies() {
    return request({
        url: '/zjb/riskstrategy/query_all',
        method: 'get'
    })
}
/**
 * 按照公司查询部门。
 * @author szc 2019年5月21日20:26:58
 */
export function queryDeparts(company) {
    return request({
        url: '/zjb/department/query_byscomcode?scomcode=' + company,
        method: 'get'
    })
}
/**
 * 风险管控的风险批示人员的下达。
 * @author szc 2019年5月21日20:26:58
 */
export function updateInstruction(params) {
    return request({
        url: '/zjb/riskreportstate/update_bynrelateids',
        method: 'post',
        // contentType: 'application/json;charset=UTF-8',
        data: params
            // dataType: 'json'
    })
}
/**
 * 树表的批量退回、提醒
 * @author szc 2019年5月21日20:26:58
 */
export function updateInstructionAll(params) {
    return request({
        url: '/zjb/riskreportstate/update_remindback',
        method: 'post',
        // contentType: 'application/json;charset=UTF-8',
        data: params
            // dataType: 'json'
    })
}
/**
 * 汇总提醒查询人员的请求
 */
export function queryUserOfCompany(data) {
    return request({
        url: '/zjb/zjb/find_data?cubeId=' + data.cubeId + "&sql=" + data.sql,
        method: 'get'
    })
}
/**
 * 风险单个批示的参照。
 */
export function queryReference() {
    return request({
        url: '/zjb/riskstrategy/query_all',
        method: 'get'
    })
}
/**
 * 风险模块集团对标的总查询入口
 */
export function groupQuery(params) {
    return request({
        url: '/zjb/select/query',
        method: 'post',
        params: params
    })
}
/**
 * 风险模块集团对标的总查询入口
 */
export function ipoRatio(params) {
    return request({
        url: '/zjb/select/ipo_ratio',
        method: 'get'
    })
}