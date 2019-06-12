import request from '../../utils/http'

/**
 * 请求方法分为post和get两种请求方法
 * post方法
 * 传递参数用data对象的方法传入
 *
 * get方法
 * 传递参数的方法是在URL的后面拼接
 */

/**
 * @功能 获取当前选择的页面的所有部门
 * @author cwt
 * @time 2019-5-22
 */
export function getDepartments(params) {
    return request({
        url: '/zjb/department/query_byscomcode?scomcode=' + params.company,
        method: 'get'
    })
}

export function getRiskTableData(params) {
    return request({
        url: '/zjb/department/query_byscomcode',
        method: 'post'
    })
}

/**
 * 风险反馈的风险批示人员的下达。
 * @author cwt
 */
export function riskFeedControl(params) {
    return request({
        url: '/zjb/riskreportstate/update_bynrelateids',
        method: 'post',
        data: params
    })
}

/**
 * 人才队伍所有数据查询
 * @author cwt
 */
export function getAllPerson(params) {
    return request({
        url: '/zjb/risk_talent/query',
        method: 'post',
        params: params
    })
}

/**
 * 人才队伍分页数据查询
 * @author cwt /risk_talent/query_user
 */
export function getCurrentPageData(params) {
    return request({
        url: '/zjb/risk_talent/query_user',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度分页数据查询
 * @author cwt /risk_talent/query_user
 */
export function getRiskSystemTableData(params) {
    return request({
        url: '/zjb/risk_sys/query_all',
        method: 'post',
        params: params
    })
}


/**
 * 风险制度分页数据查询
 * @author cwt /risk_talent/query_user
 */
export function riskSystemAdd(params) {
    return request({
        url: '/zjb/risk_sys/add',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度风险建议添加  /risk_sys/query_by_filed
 * @author cwt /risk_talent/query_user
 */
export function riskSystemSuggestAdd(params) {
    return request({
        url: '/zjb/risk_sys/add_advice',
        method: 'post',
        params: params
    })
}


/**
 * 风险制度迷糊查询 /risk_sys/query_by_filed
 * @author cwt /risk_talent/query_user
 */
export function getQueryByFiledTableData(params) {
    return request({
        url: '/zjb/risk_sys/query_by_filed',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度删除 /risk_sys/query_by_filed
 * @author cwt /risk_talent/query_user
 */
export function riskSystemDelete(params) {
    return request({
        url: '/zjb/risk_sys/delete',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度风险建议详情查询 /risk_sys/query_by_filed
 * @author cwt /risk_talent/query_user
 */
export function riskSystemSuggestDetailQuery(params) {
    return request({
        url: '/zjb/risk_sys/query_advice',
        method: 'post',
        params: params
    })
}