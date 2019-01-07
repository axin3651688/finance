import request from 'utils/http'
import proxy from './proxy.js'


// 角色列表
export function ROLE_LIST(userId,companyId) {
    // debugger
    return request({
        // url: proxy.file + '/api/my_session',
        url: '/api/api/role_list',
        method: 'get',
        params: {
            'userId': userId,
            'companyId':companyId
        }
    })
}