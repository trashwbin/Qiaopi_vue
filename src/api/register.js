import instance from '@utils/request'// 导入配置好的axios
// 请求登录接口
export const login = (data) =>
  instance({
    url: '/register', // 这些是具体的路径 不会被代理掉，也就是第二步的xxxx
    method: 'POST',
    data
  })
