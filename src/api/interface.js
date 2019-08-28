import request from 'utils/http'
import store from '@/store'

//全局修改  cubeId , 这里写了其他地方都没得用！ zdk 2019年3月12日 09:26:42
let cubeId = 4;
// let cubeId = 8;
/**
 * 登录接口
 */
export function login(loginUser) {
    console.log("调用登录接口");
    return request({
        // url: '/api/auth/login',
        url: '/zjb/sys/loginM/login',
        // method: 'post',
        method: 'get',
        params: {
            cubeId: cubeId,
            account: loginUser.usename,
            password: loginUser.password
        }

    })
}

/**
 * 登出接口
 */
export function logout() {
    console.log("调用登出接口");
    return request({
        url: '/zjb/sys/loginM/logout',
        // url:'/zdk/zjb/logout',
        // url: '/api/api/core_user/logout',
        method: 'get',
        // params: {
        //   Authorization: localStorage.authorization,
        // }
    })
}
/**
 * 一次性全部加载公司树。 szc 2019-3-12 11:16:47
 */
export function getCompanyTree_old() {
    return request({
        url: '/zjb/sys/dimcompany/query_all',
        method: 'get'
    })
}
/**
 * 按照用户查询能用的公司
 * @param {*} user 
 */
export function getCompanyTree(user) {
    return request({
        url: '/zjb/sys/dimcompany/query_user?suser=' + user,
        method: 'get'
            // params: {
            //   "suser": user.username
            // }
    })
}
/**
 * 公司树异步请求接口 以前的惰性加载请求公司树
 */
export function getCompanyTree_old_old(id, dimName, type, pid) {
    console.log("调用公司树异步请求接口");
    // return request({
    //   url: '/get/cube/find_dim' + id + '/' + dimName + '/' + type + '/' + pid,
    //   // url: '/tree/cube/find_dim2/company/0/1',
    //   method: 'get',
    // })
    return request({
        url: '/api/api/find_dim' + cubeId + '/' + dimName + '/' + type + '/' + pid,
        // url: '/tree/cube/find_dim2/company/0/1',
        method: 'get',
    })
}

/**
 * 侧边栏请求接口
 */
export function findSideBar(userId, code) {
    return request({
        url: '/zjb/sys/menus/query_menus',
        method: 'get',
        params: {
            "roleId": userId,
            "spcode": code || "0"
        }
    })
}

/**
 * 获取第三方数据
 */
export function findThirdPartData(params) {
    // debugger
    // if (!params.cubeId) {
    //   params.cubeId = JSON.parse(localStorage.database).license.id;
    //   // 取vuex里面的use里面的id
    //   // params.cubeId = this.user.user.license.id
    // }
    params.cubeId = cubeId;
    return request({
        method: "post",
        url: params.url || "/zjb/zjb/find_cube_map/",
        params: params
    })
}
/**
 * 模块数据请求
 * 1:如果有sourceId刚按sourceId 约定的地址加载
 * 2：否则从url中直接加载
 */
export function findDesignSource(sourceId, url) {
    // debugger;
    //为了兼容马军写的module_api_cache而写的,后期可优化掉的 
    // if (isNaN(sourceId)) {
    //   url = sourceId;
    //   sourceId = 0;
    // }
    if (sourceId) {
        url = sourceId;
        sourceId = undefined;
    }
    let api = sourceId ? "/zjb/zjb/find_design_source?id=" + sourceId : url;
    return request({
        url: api,
        method: 'get',
        params: {
            id: sourceId || 0
        }
    })
}
export function findDesignSource_old(sourceId, url) {
    // debugger;
    //为了兼容马军写的module_api_cache而写的,后期可优化掉的 
    // if (isNaN(sourceId)) {
    //   url = sourceId;
    //   sourceId = 0;
    // }
    let api = sourceId ? "/api/api/find_design_source?id=" + sourceId : url;
    return request({
        url: api,
        method: 'get',
        params: {
            id: sourceId || 0
        }
    })
}
/**
 * 文档帮助处理。
 */
export function helpRequest() {
    return request({
        url: '/zjb/pdf/helpPdf',
        method: 'get'
    })
}