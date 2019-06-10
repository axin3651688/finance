import request from 'utils/http'

/**
 * 登录接口
 */
export function login(loginUser) {
    console.log("调用登录接口");
    return request({
        url: '/api/auth/login',
        method: 'post',
        params: {
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
        url: '/api/auth/logout',
        method: 'get',
    })
}

/**
 * 公司树异步请求接口
 */
export function getCompanyTree(id, dimName, type, pid) {
    console.log("调用公司树异步请求接口");
    return request({
        url: '/api/api/find_dim' + id + '/' + dimName + '/' + type + '/' + pid,
        // url: '/tree/cube/find_dim2/company/0/1',
        method: 'get',
    })
}

/**
 * 侧边栏请求接口
 */
export function findSideBar(userId, code) {
    return request({
        url: '/api/api/find_node',
        method: 'get',
        params: {
            "userId": userId,
            "code": code || "10"
        }
    })
}

/**
 * 获取第三方数据
 */
export function findThirdPartData(params) {
    console.log("paramsparams", params)
    if (!params.cubeId) {
        params.cubeId = JSON.parse(localStorage.database).license.id;
    }
    return request({
        method: "post",
        url: params.url || "/api/api/find_cube_map/",
        params: params
    })
}

/**
 * 模块数据请求
 * 1:如果有sourceId刚按sourceId 约定的地址加载
 * 2：否则从url中直接加载
 */
export function findDesignSource(sourceId, url) {
    //为了兼容马军写的module_api_cache而写的,后期可优化掉的
    console.log("sourceId", sourceId, "url", url)
    if (isNaN(sourceId)) {
        // debugger
        url = sourceId;
        sourceId = 0;
    }
    let num = url.indexOf("zbfx.json");
    let api = num == -1 && sourceId ? "/api/api/find_design_source?id=" + sourceId : url;
    return request({
        url: api,
        method: 'get',
        params: {
            id: sourceId || 0
        }
    })
}
/**
 * 组织成员列表
 *
 */
export function companyContactList(companyId) {
    console.log("调用成员接口");
    console.log(companyId);

    return request({
        url: '/api/api/my_contact_list',
        method: 'get',
        params: {
            companyId: companyId
        }
    })
}
/**
 * 催报消息操作接口
 *
 */
export function SAVE_MODULE_MSG(datas) {
    console.log("催报消息操作接口");
    // console.log(datas);
    debugger
    return request({
        url: '/api/api/new/save_module_msg',
        method: 'post',
        data: datas
    })
}

/**
 * 催报消息操作接口
 *
 */
export function queryCellDetail(datas) {
    console.log("请求原因弹框详细信息");
    console.log(datas);
    debugger
    return request({
        url: '/api/api/find_data?cubeId=' + datas.cubeId + '&sql=' + datas.sql,
        method: 'post'
            // data: datas
    })
}

// export function ACK_MODULE_MSG(data) {
//   console.log("催报消息操作接口");
//   // console.log(data);
//   debugger
//   return request({
//     url: '/api/api/change_module_user_state',
//     method: 'get',
//     params: {
//       code: data,
//       chat: 2000,
//       type: 1102
//     }
//   })
// }

/**
 * 成员信息查询是否存在
 * 可以根据usename,邮箱,id查询
 *
 */
export function FIND_USER_ACCOUNT(use) {
    console.log("调用成员接口");
    return request({
        url: '/api/api/find_user_account',
        method: 'get',
        params: {
            account: use
        }
    })
}
