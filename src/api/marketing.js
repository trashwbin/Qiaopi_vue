import request from '@/utils/request'
export function list() {
  return request({
    url: '/marketing/list',
    method: 'get'
  })
}
