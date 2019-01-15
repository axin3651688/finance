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
//查看用户子公司列表
export function FIND_SUB_COMPANY_LIST(userId) {
    // debugger
    return request({
        // url: proxy.file + '/api/my_session',
        url: '/api/api/find_sub_company_list',
        method: 'get',
        params: {
            'userId': userId,
        }
    })
}

// 查询公司基本信息
export function FIND_COMPANY_BASE_INFO(companyId) {
    // debugger
    return request({
        url: '/api/api/find_company_base_info',
        method: 'get',
        params: {
            'companyId': companyId,
        }
    })
}


//更新公司信息
export function EDIT_COMPANY_INFO(data) {
    // debugger
    return request({
        url: '/api/api/edit_company_info',
        method: 'put',
        data:data
    })
}

//选择行业
export function SELECT_INDUSTRY() {
    // debugger
    return request({
        url: '/api/api/select_industry',
        method: 'get',
        params: {}
    })
}
// 选择规模
export function SELECT_SCALE() {
    // debugger
    return request({
        url: '/api/api/select_scale',
        method: 'get',
        params: {}
    })
}
// 选择地区
export function SELECT_AREA() {
    // debugger
    return request({
        url: '/api/api/select_area',
        method: 'get',
        params: {}
    })
}
//查询公司性质(类型)
export function FIND_COMPANY_TYPE() {
    // debugger
    return request({
        url: '/api/api/find_company_type',
        method: 'get',
        params: {}
    })
}
// 添加子公司
export function SAVE_SUB_COMPANY(data) {
    // debugger
    return request({
        url: '/api/api/save_sub_company',
        method: 'post',
        data: data
    })
}

