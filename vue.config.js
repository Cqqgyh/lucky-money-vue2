const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/dev-api': {// 匹配所有以 '/dev-api'开头的请求路径
        target: 'http://rb.atguigu.cn/',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/dev-api': ''}
      },
    }
  }
})
