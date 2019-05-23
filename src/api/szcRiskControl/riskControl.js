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
        data: params
    })
}