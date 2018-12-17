import request from 'utils/http'

export function fill() {
    return request({
        url: '/fill/query',
        method: 'post'    
    })
}