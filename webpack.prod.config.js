const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
// 每次打包前清除旧的build文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 代码压缩插件，webpack本身自带了，引入这个是为了配置参数
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") 
// 引入 PWA 插件
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production', //编译生产环境代码
  devtool: 'cheap-module-source-map',
  optimization: {
    usedExports: true,   //清除到代码中无用的js代码，只支持import方式引入，不支持commonjs的方式引入
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包前删除上一次打包留下的旧代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true // 是否删除代码中所有的console
        }
      }
    }),
    // PWA配置，生产环境才需要
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
})