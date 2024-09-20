const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyMiddleware = createProxyMiddleware({
  target: 'http://127.0.0.1:8080/', // 设置目标服务器的地址，即要跨域访问的后端接口地址
  changeOrigin: true // 将主机标头的原点改为目标URL
})

module.exports = proxyMiddleware
