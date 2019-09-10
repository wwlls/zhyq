const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const Config = require('./config')

module.exports = merge(commonConfig, {
  mode: 'development', //编译开发环境代码
  
  devtool: 'cheap-module-eval-soure-map',
  
  plugins: [
    new OpenBrowserPlugin({
      url: `http://localhost:${Config.port}/home`
    }),
    
    // 热加载
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
  ],
  devServer: {
    historyApiFallback: true, //把historyApiFallback设置为true那么所有的路径都执行index.html
    inline: true, //当源文件改变时会自动刷新页面
    contentBase: './build/', //从项目的根目录提供服务
    host: "localhost", // 可以使用手机访问
    port: Config.port,
    overlay: {
      errors: true // 错误提示
    },
    proxy: {
      "/api": { //context =====  "/api"
        target: Config.api,
        changeOrigin: true, //是否跨域
        secure: false, // 如果是https接口，需要配置这个参数
        //ws: true,    // 是否代理websockets
        "pathRewrite": { //这个是个正则匹配
            "^/api": "/"
        }
      }
    },
  }
})