import request from 'utils/http'

export function login(loginUser) {
  console.log(loginUser);
  return request({
    url: '/api/auth/login',
    method: 'post',
    params: {
      account: loginUser.usename,
      password: loginUser.password
    }

  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}