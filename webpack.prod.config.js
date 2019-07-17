const path = require('path');
var webpack = require('webpack');
var pxtorem = require('postcss-pxtorem'); //px自动生成rem
const htmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
// const CleanWebpackPlugin = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 代码压缩插件，webpack本身自带了，引入这个是为了配置参数
var Config = require('./config');
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/svgs'), // 2. 自己私人的 svg 存放目录
]

module.exports = {
  entry: ["@babel/polyfill", "./src/app.js"], //相对路径 babel-polyfill转义es6兼容ie浏览器
  output: {
    path: path.resolve(__dirname, 'build'),
    // filename: 'boundle.js'
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].bundle.js',
    publicPath: '/' // 打包上线时，引用的js路径头部
  },
  devtool: 'source-map',
  module: {
    rules: [ //配置加载器
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              [
                'import', {
                  libraryName: 'antd-mobile',
                  style: 'css'
                }
              ],
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader',
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer'),
                pxtorem({
                  rootValue: 75,
                  propWhiteList: [],
                })
              ]
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer'),
                pxtorem({
                  rootValue: 75,
                  propWhiteList: [],
                })
              ]
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        options: {
          include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
        }
      }, {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000, //1w字节以下大小的图片会自动转成base64
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(["build"]), // 打包前删除上一次打包留下的旧代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true // 是否删除代码中所有的console
        }
      }
    }),
    new htmlWebpackPlugin({
      template: 'index.html', //指定模板路径
      title: Config.title, //生成环境下项目title
      minify: { //对 html 文件进行压缩
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true, // 防止缓存，在引入的文件后面加hash
      inject: true // 是否将js放在body的末尾
    }),
    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".scss"], //后缀名自动补全
    alias: {
      component: __dirname + '/src/component',
      actions: __dirname + '/src/actions',
      static: __dirname + '/src/static',
      utils: __dirname + '/src/utils'
    },
  },
  // devServer: {
  //   historyApiFallback: true,
  //   inline: true,
  //   contentBase: './build/',
  //   port: Config.port, 
  //   proxy: {
  //     "/mall": {
  //       target: Config.api,
  //       changeOrigin: true,
  //       changeOrigin: true, //是否跨域
  //       secure: false, // 如果是https接口，需要配置这个参数
  //       //ws: true,    // 是否代理websockets
  //       // "pathRewrite": { //这个是个正则匹配
  //       //     "^/api": "/"
  //       // }
  //     }
  //   },
  // },
}