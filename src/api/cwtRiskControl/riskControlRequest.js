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
 * @author cwt
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
 * @author cwt
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
 * @author cwt
 */
export function riskSystemAdd(params) {
    return request({
        url: '/zjb/risk_sys/add',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度风险建议添加
 * @author cwt
 */
export function riskSystemSuggestAdd(params) {
    return request({
        url: '/zjb/risk_sys/add_advice',
        method: 'post',
        params: params
    })
}


/**
 * 风险制度迷糊查询
 * @author cwt
 */
export function getQueryByFiledTableData(params) {
    return request({
        url: '/zjb/risk_sys/query_by_filed',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度删除
 * @author cwt
 */
export function riskSystemDelete(params) {
    return request({
        url: '/zjb/risk_sys/delete',
        method: 'post',
        params: params
    })
}

/**
 * 风险制度风险建议详情查询
 * @author cwt
 */
export function riskSystemSuggestDetailQuery(params) {
    return request({
        url: '/zjb/risk_sys/query_advice',
        method: 'post',
        params: params
    })
}


/**
 * 风险反馈树表退回  提醒功能接口
 * @author cwt
 */
export function riskBackAndNotice(params) {
    return request({
        url: '/zjb/riskreportstate/update_remindback',
        method: 'post',
        data: params
    })
}


/**
 * 组织架构图中点击部门展现详细信息请求
 * @author cwt
 */
export function departmentClickEvent(params) {
    return request({
        url: '/zjb/risk/organization/get_data',
        method: 'post',
        params: params
    })
}