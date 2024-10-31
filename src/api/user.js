import request from '@/utils/request'

// 获取用户功能卡
export function getMyFunctionCard() {
  return request({
    url: '/user/getMyFunctionCard',
    method: 'get'
  })
}
// 获取国家列表
export function getCountries() {
  return request({
    url: '/user/getCountries',
    method: 'get',
    headers: {
      isToken: false
    }
  })
}
// 获取用户地址
export function getMyAddress() {
  return request({
    url: '/user/getMyAddress',
    method: 'get'
  })
}
export function getFriendAddress(friendId) {
  return request({
    url: '/user/getFriendAddress',
    method: 'get',
    params: { friendId }
  })
}

// 获取用户猪仔币
export function getUserMoney() {
  return request({
    url: '/user/getUserMoney',
    method: 'get'
  })
}
export function getUserFriends() {
  return request({
    url: '/user/getMyFriends',
    method: 'get'
  })
}
// 获取用户仓库
export function getUserRepository() {
  return request({
    url: '/user/getUserRepository',
    method: 'get'
  })
}
// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}

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

// 修改用户名
export function updateUsername(username) {
  return request({
    method: 'put',
    url: '/user/updateUsername',
    data: {
      username // 确保请求体是一个 JSON 对象
    }
  })
}
// 修改昵称
export function updateNickname(nickname) {
  return request({
    method: 'put',
    url: '/user/updateUserInfo',
    data: {
      nickname // 确保请求体是一个 JSON 对象
    }
  })
}
// 修改性别
export function updateSex(sex) {
  return request({
    method: 'put',
    url: '/user/updateUserInfo',
    data: {
      sex // 确保请求体是一个 JSON 对象
    }
  })
}
// 获取用户头像
export function getAvatarList() {
  return request({
    method: 'get',
    url: '/user/getAvatarList'
  })
}
// 修改密码
export function updatePassword(oldPassword, newPassword, confirmPassword) {
  return request({
    method: 'put',
    url: '/user/updatePassword',
    data: {
      oldPassword,
      newPassword,
      confirmPassword
    }
  })
}
