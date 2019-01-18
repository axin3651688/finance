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

// 查看该公司是否可以创建子公司
export function ENABLE_CREATE_SUB_COMPANY(companyId) {
    // debugger
    return request({
        url: '/api/api/enable_create_sub_company',
        method: 'get',
        params: {
            'companyId':companyId,
        }
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

//公司应用列表
export function FIND_COMPANY_MODULE(companyId) {
    // debugger
    return request({
        url: '/api/api/find_company_module',
        method: 'get',
        params: {
            'companyId':companyId,
        }
    })
}
//启/禁用公司应用
export function ENABLE_COMPANY_APPS(data) {
    // debugger
    return request({
        url: '/api/api/enable_company_apps',
        method: 'put',
        data:data
    })
}
//查看角色的管理权限
export function FIND_ROLE_ACCREDIT_ADMIN(roleId) {
    // debugger
    return request({
        url: '/api/api/find_role_accredit_admin',
        method: 'get',
        params: {
            'roleId':roleId,
        }
    })
}

//保存角色的管理权限
export function SAVE_ROLE_ACCREDIT_ADMIN(data) {
    // debugger
    return request({
        url: '/api/api/save_role_accredit_admin',
        method: 'post',
        data: data
    })
}
//查看角色的功能权限
export function FIND_ROLE_ACCREDIT_FUNCTION(roleId) {
    // debugger
    return request({
        url: '/api/api/find_role_accredit_function',
        method: 'get',
        params: {
            'roleId':roleId,
        }
    })
}
// 查询角色的应用权限
export function FIND_ROLE_ACCREDIT_APPS(roleId) {
    // debugger
    return request({
        url: '/api/api/find_role_accredit_apps',
        method: 'get',
        params: {
            'roleId':roleId,
        }
    })
}
// 查询角色的授权公司权限
export function FIND_ROLE_ACCREDIT_OTHER(roleId) {
    // debugger
    return request({
        url: '/api/api/find_role_accredit_other',
        method: 'get',
        params: {
            'roleId':roleId,
        }
    })
}
// 添加角色 SAVE_ROLE
export function SAVE_ROLE(data) {
    // debugger
    return request({
        url: '/api/api/save_role',
        method: 'post',
        data: data
    })
}
//编辑角色
export function UPDATE_ROLE(data) {
    // debugger
    return request({
        url: '/api/api/update_role',
        method: 'put',
        data: data
    })
}
//删除角色
export function DEL_ROLE(data) {
    // debugger
    return request({
        url: '/api/api/del_role',
        method: 'delete',
        params: data
    })
}
//保存角色的功能权限
export function SAVE_ROLE_ACCREDIT_FUNCTION(data) {
    // debugger
    return request({
        url: '/api/api/save_role_accredit_function',
        method: 'post',
        data: data
    })
}
//保存角色的应用权限
export function SAVE_ROLE_ACCREDIT_APPS(data) {
    // debugger
    return request({
        url: '/api/api/save_role_accredit_apps',
        method: 'post',
        data: data
    })
}
// 保存角色的授权公司权限
export function SAVE_ROLE_ACCREDIT_OTHER(data) {
    // debugger
    return request({
        url: '/api/api/save_role_accredit_other',
        method: 'post',
        data: data
    })
}
// 查询在线用户
export function ONLINE_USER_LIST(data) {
    // debugger
    return request({
        url: '/api/api/online_user_list',
        method: 'post',
        data: data
    })
}


// /api/company_user_list
// 公司成员列表 COMPANY_USER_LIST

// 保存角色的授权公司权限
export function COMPANY_USER_LIST(data) {
    // debugger
    return request({
        url: '/api/api/company_user_list',
        method: 'post',
        data: data
    })
}




