import request from '@/utils/request'
// 获得漂流瓶
export function getDriftBottle() {
  return request({
    url: '/bottle/getDriftBottle',
    method: 'get'
  })
}
// 展示漂流瓶
export function showDriftBottle() {
  return request({
    url: '/bottle/showDriftBottle',
    method: 'get'
  })
}
// 生成漂流瓶
export function generateDriftBottle(senderAddress, content) {
  const data = { senderAddress, content }
  return request({
    url: '/bottle/generateDriftBottle',
    method: 'post',
    data: data
  })
}
