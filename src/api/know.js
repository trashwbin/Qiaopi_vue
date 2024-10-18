import request from '@/utils/request'
export function userLoginPage() {
  // useCard function is used to use a card
  return request({
    url: '/question/userLoginPage',
    method: 'get'
  })
}
