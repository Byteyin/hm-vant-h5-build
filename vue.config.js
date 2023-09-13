const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            blue: '#FA6D1D'
          }
        }
      }
    }
  },
  // 设置获取.js,.css文件时，是以相对地址为基准的。 https://cli.vuejs.org/zh/config/#publicpath
  publicPath: './'
})
