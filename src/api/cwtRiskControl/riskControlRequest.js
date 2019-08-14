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
        // contentType: "application/json; charset=utf-8",
        // dataType: 'json',
        params: {vos: params}
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

/**
 * 获取行业对标中的指标选项
 * @author cwt
 */
export function getAllHYZB(params) {
    return request({
        url: '/zjb/dim_target/queryall_bystype?stype=' + params,
        method: 'get'
    })
}

/**
 * 获取行业对标柱状图数据
 * @author cwt
 */
export function getHYZBData(params) {
    return request({
        url: '/zjb/select/query',
        method: 'post',
        params: params
    })
}


/**
 * 获取预警报告中表格一的数据
 * @author cwt
 */
export function getwarningReportTable1Data(params) {
    return request({
        url: '/zjb/risk_warning_report/query_data',
        method: 'post',
        params: params
    })
}


/**
 * 获取预警报告中表格一点击公司之后第四部分数据的重新渲染
 * @author cwt
 */
export function getwarningReportBottomData(params) {
    return request({
        url: '/zjb/risk_warning_report/query',
        method: 'post',
        params: params
    })
}

/**
 * 获取集团指标数据
 * @author cwt
 */
export function getGroupIndicatorsData(params) {
    return request({
        url: '/zjb/select/query',
        method: 'post',
        params: params
    })
}


/**
 * 获取国资委指标指标数据
 * @author cwt
 */
export function getAssessmentIndicatorsData(params) {
    return request({
        url: '/zjb/select/query',
        method: 'post',
        params: params
    })
}


/**
 * 查询当前全局控制的结果
 * @author cwt
 */
export function getGlobleControlState(params) {
    return request({
        url: '/zjb/globalparam/query_all',
        method: 'get',
    })
}


/**
 * 风险管控系统导出功能接口
 * @author cwt
 */
export function riskReportExport(params) {
    return request({
        url: '/exp/exportDocx',
        method: 'post',
        responseType:'blob',
        data: params
    })
}


/**
 * 风险预警模型数据请求
 * @author cwt
 */
export function predictiveModel(params) {
    return request({
        url: '/zjb/forcase/analysis',
        method: 'post',
        params: params
    })
}

/**
 * 风险预警模型select options获取
 * @author cwt
 */
export function getPredictiveModelSelect(params) {
    return request({
        url: '/zjb/forcase/select_versioncode_version',
        method: 'post',
        params: params
    })
}

/**
 * 风险预警模型select options保存
 * @author cwt
 */
export function predictiveModelSave(params) {
    return request({
        url: '/zjb/forcase/insert_data',
        method: 'post',
        data: params
    })
}

/**
 * 组织架构获取所有部门请求
 * @author cwt
 */
export function getAllDepartment(params) {
    return request({
        url: '/zjb/risk/organization/get_organization',
        method: 'get'
    })
}


/**
 * 获取第三方数据
 */
export function findThirdPartData1(params) {
    params.cubeId = 4;
    return request({
        method: "post",
        url: params.url || "/zjb/zjb/find_cube_map/",
        responseType:'blob',
        params: params
    })
}


/**
 * 风险制度建议修改
 */
export function riskSuggestChange(params) {
    return request({
        method: "post",
        url: '/zjb/risk_sys/update_advice',
        responseType:'blob',
        params: params
    })
}

/**
 * 风险制度建议删除
 */
export function riskSuggestDelete(params) {
    return request({
        method: "post",
        url: '/zjb/risk_sys/delete_advice',
        responseType:'blob',
        params: params
    })
}


