const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    host: 'localhost',
    port: 80,
    proxy: {
      '/api': {
        // target: 'http://192.168.131.194:8097/', // 设置代理的目标URL
        target: 'http://110.41.58.26:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将请求中的/api路径替换为空
        }
      }
    }
  }
}
