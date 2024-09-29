import axios from 'axios'
import { Message } from 'element-ui'
// import router from '@/router'
// 创建axios实例
const service = axios.create({
  method: 'get',
  baseURL: '/api', // .env中的VITE_APP_API参数
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000 // 超时时间
})
service.interceptors.request.use((config) => {
  // console.log(config)
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
}
)
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const message = res.data.msg || '未知错误'
  if (code !== 200) {
    Message.error(message)
    // console.log(message)
    if (code === 401) { // 登录状态已过期.处理路由重定向
      // router.push('/login')
      // TODO: 重新登录
      Message.error('登录状态已过期，请重新登录')
    }
  }
  return res.data
}, error => {
  let { message } = error
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        // router.push('/login')
        message = error.response.data.msg || '未授权的访问'
        break
      case 405:
        message = '请求错误'
    }
  }
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常'
  }
  Message.error(message)
  return Promise.reject(error)
}
)
export default service
