import request from 'utils/http'
/**
 * 数据导出的接口。
 * @author szc 2019年4月3日17:12:54
 */
export function exportExcle(exportData) {
    return request({
        url: '/exp/exportexcle',
        method: 'post',
        params: exportData
    })
}