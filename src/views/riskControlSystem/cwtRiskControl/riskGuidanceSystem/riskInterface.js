import request from 'utils/http'

/**
 * @function 风险指引目录服务操作接口
 */
/**1.
 * name: sjz
 * 说明：风险指引制度
 *      【查询】接口（注：应用目录）
 * time：2019年7月15日14:40:19
 */
// export function riskguidecatalogAll() {
//     return request({
//         url: '/zjb/riskguidecatalog/query_all',
//         method: 'get'
//     })
// }
/**1.
 * name: sjz
 * 说明：风险指引制度
 *      【查询】接口（注：应用目录）
 * time：2019年7月15日14:40:19
 */
export function selectAll(data) {
    return request({
        url: '/zjb/select/query',
        method: 'get',
        params: data
    })
}
/**2.
 * name: sjz
 * 说明：风险指引制度
 *      【添加】接口（注：应用目录）
 * time：2019年7月15日16:47:53
 */
export function riskguidecatalogAdd(data) {
    return request({
        url: '/zjb/riskguidecatalog/add',
        method: 'post',
        data: data
    })
}
/**3.
 * name: sjz
 * 说明：风险指引制度
 *      【修改】接口（注：应用目录）
 * time：2019年7月16日09:28:55
 */
export function riskguidecatalogUpdate(data) {
    return request({
        url: '/zjb/riskguidecatalog/update',
        method: 'post',
        data: data
    })
}
/**4.
 * name: sjz
 * 说明：风险指引制度
 *      【删除】接口（注：应用目录）
 * time：2019年7月16日11:40:12
 */
export function riskguidecatalogDelete(data) {
    return request({
        url: '/zjb/riskguidecatalog/delete',
        method: 'post',
        data: data
    })
}
/**
 * @function 风险指引标题服务操作接口 
 */
/**1.
 * name: sjz
 * 说明：风险指引制度
 *      【添加】接口（注：应用标题）
 * time：2019年7月16日14:33:43
 */
export function riskguidetitleAdd(data) {
    return request({
        url: '/zjb/riskguidetitle/add',
        method: 'post',
        data: data
    })
}
/**2.
 * name: sjz
 * 说明：风险指引制度
 *      【删除】接口（注：应用标题）
 * time：2019年7月16日14:33:43
 */
export function riskguidetitleDelete(data) {
    return request({
        url: '/zjb/riskguidetitle/delete',
        method: 'post',
        data: data
    })
}
/**3.
 * name: sjz
 * 说明：风险指引制度
 *      【修改】接口（注：应用标题）
 * time：2019年7月16日14:33:43
 */
export function riskguidetitleUpdate(data) {
    return request({
        url: '/zjb/riskguidetitle/update',
        method: 'post',
        data: data
    })
}
/**4.
 * name: sjz
 * 说明：风险指引制度
 *      【查询】接口（注：应用标题）
 * time：2019年7月16日14:33:43
 */
export function riskguidetitleAll() {
    return request({
        url: '/zjb/riskguidetitle/query_all',
        method: 'get'
    })
}
/**
 * @function 风险指引内容服务操作接口 
 */
/**1.
 * name: sjz
 * 说明：风险指引制度
 *      【添加】接口（注：应用内容）
 * time：2019年7月16日14:38:03
 */
export function riskguidecontentAdd(data) {
    return request({
        url: '/zjb/riskguidecontent/add',
        method: 'post',
        data: data
    })
}
/**2.
 * name: sjz
 * 说明：风险指引制度
 *      【删除】接口（注：应用内容）
 * time：2019年7月16日14:38:37
 */
export function riskguidecontentDelete(data) {
    return request({
        url: '/zjb/riskguidecontent/delete',
        method: 'post',
        data: data
    })
}
/**3.
 * name: sjz
 * 说明：风险指引制度
 *      【修改】接口（注：应用内容）
 * time：2019年7月16日14:39:07
 */
export function riskguidecontentUpdate(data) {
    return request({
        url: '/zjb/riskguidecontent/update',
        method: 'post',
        data: data
    })
}
/**4.
 * name: sjz
 * 说明：风险指引制度
 *      【查询】接口（注：应用内容）
 * time：2019年7月16日14:39:33
 */
export function riskguidecontentAll() {
    return request({
        url: '/zjb/riskguidecontent/query_all',
        method: 'get'
    })
}
/**
 * name:sjz
 * 说明：风险指引制度
 *      【图片】接口（注：应用内容）
 */
export function riskguidecontentPicture(data) {
    return request({
        url: '/zjb/riskguidecontent/upload_chart',
        method: 'post',
        data: data
    })
}
/**
 * @function 风险指引标题服务操作接口
 */
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】查询接口（注：应用于目录的标题）
 */
export function riskguidetitle_All() {
    return request({
        url: '/zjb/riskguidetitle/query_all',
        method: 'get'
    })
}
/** 
 * name: sjz
 * 说明：风险指引制度
 *      【标题】添加接口 
 */
 export function riskguidetitle_Add(data) {
    return request({
        url: '/zjb/riskguidetitle/add',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】删除接口 
 */
export function riskguidetitle_Delete(data) {
    return request({
        url: '/zjb/riskguidetitle/delete ',
        method: 'post',
        data: data
    })
}
/**
 * name: sjz
 * 说明：风险指引制度
 *      【标题】修改接口 
 */
export function riskguidetitle_Updata(data) {
    return request({
        url: '/zjb/riskguidetitle/updata ',
        method: 'post',
        data: data
    })
}

