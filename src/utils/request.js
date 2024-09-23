import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://110.41.58.26:8080/'// API基础路径
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取存储在localStorage或Vuex中的token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
