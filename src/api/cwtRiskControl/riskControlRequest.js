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