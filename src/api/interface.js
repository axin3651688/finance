import request from 'utils/http'
import store from '@/store'
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
    url: '/auth/logout',
    method: 'get'
  })
}

/**
 * 公司树异步请求接口
 */
export function getCompanyTree(id, dimName, type, pid) {
  console.log("调用公司树异步请求接口");
  return request({
    url: '/get/cube/find_dim' + id + '/' + dimName + '/' + type + '/' + pid,
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
  // debugger
  if (!params.cubeId) {
    // params.cubeId = JSON.parse(localStorage.database).license.id;
    // 取vuex里面的use里面的id
    params.cubeId = this.user.user.license.id
  }
  return request({
    method: "post",
    url: params.url || "/get/cube/find/",
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
  if (isNaN(sourceId)) {
    url = sourceId;
    sourceId = 0;
  }
  let api = sourceId ? "/api/api/find_design_source?id=" + sourceId : url;
  return request({
    url: api,
    method: 'get',
    params: {
      id: sourceId || 0
    }
  })
}