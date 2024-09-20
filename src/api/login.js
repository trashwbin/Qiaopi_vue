import request from '@/utils/request'
// 获取图片验证码
export const getPicCode = () => {
  return request.get('')
}
