import request from '@/utils/request'

export function generateLetter(data) {
  return request({
    url: '/letter/generateLetter',
    method: 'post',
    data: data
  })
}

export function sendLetter(data) {
  return request({
    url: '/letter/sendLetter',
    method: 'post',
    data: data
  })
}
