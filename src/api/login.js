import request from '@/utils/request'

// 获取图片验证码
export const getPicCode = () => {
  return request({
    url: '/user/getCode',
    method: 'get'
  })
}
// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/user/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}
// 注册方法
export function register(data) {
  return request({
    url: '/user/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
