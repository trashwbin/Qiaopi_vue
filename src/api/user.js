import request from '@/utils/request'

// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}
