import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import cache from '@/plugins/cache'
import { tansParams } from '@/utils/qiaopi'
// import router from '@/router'
// 创建axios实例
const service = axios.create({
  method: 'get',
  baseURL: process.env.VUE_APP_API, // .env中的VUE_APP_API参数
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  // 防止数据重复提交
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
    const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
    if (requestSize >= limitSize) {
      console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
      return config
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const surl = sessionObj.url // 请求地址
      const sdata = sessionObj.data // 请求数据
      const stime = sessionObj.time // 请求时间
      const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
      if (sdata === requestObj.data && requestObj.time - stime < interval && surl === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${surl}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  // console.log(config)
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use(res => {
  // console.log(111)
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
  // console.log(res)
  if (code === 200) {
    // 请求成功不弹出提示
    // Message.success(message)
  }
  return Promise.resolve(res.data)
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
