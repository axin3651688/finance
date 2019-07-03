import request from 'utils/http'
/**
 * 数据导出的接口。
 * @author szc 2019年4月3日17:12:54
 */
export function exportExcle(exportData) {
    return request({
        url: '/exp/exportexcle',
        method: 'post',
        responseType: "blob",
        data: exportData
    })
}
/**
 * EVA导出请求
 * @param {导出的参数} exportData 
 * @author szc 2019年4月8日16:49:53
 */
export function exportEVAExcle(exportData) {
    return request({
        url: '/exp/exportexcle',
        method: 'post',
        responseType: "blob",
        data: exportData
    })
}
/**
 * world导出
 * @param {导出的参数} exportData 
 * @author szc 2019年4月8日16:49:53
 */
export function exportRiskWorld(exportData) {
    return request({
        url: '/exp/exportDocx',
        method: 'post',
        responseType: 'blob',
        params: exportData
    })
}