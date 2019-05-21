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