import request from 'utils/http'

export function deptQueryRisk() {
    return request({
        url: '/fill/query',
        method: 'post'
    })
}