const path = require('path')
const webpack = require('webpack')
//px自动生成rem
const pxtorem = require('postcss-pxtorem')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const Config = require('./config')
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/svgs'), // 2. 自己私人的 svg 存放目录
]

module.exports = {
	entry: ["@babel/polyfill", "./src/app.js"], //相对路径 babel-polyfill转义es6兼容ie浏览器
  output: {
    path: path.resolve(__dirname, 'build'), //打包文件的输出路径
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/' // 打包上线时，引用的js路径头部
  },
  module: {
    rules: [ //配置加载器
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'happypack/loader?id=happyBabel',
          
        }]
      }, {
        test: /\.(sc|sa|c)ss$/,
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
        // 文件解析
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        options: {
          include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
        }
      }, {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, //1w字节以下大小的图片会自动转成base64
        }
      }
    ]
  },
  plugins: [
  	new htmlWebpackPlugin({
      title: Config.title, //开发环境下项目title
      template: 'index.html', //指定模板路径
      filename: 'index.html', //生成的html存放路径，相对于 output.path
      hash: true, // 防止缓存，在引入的文件后面加hash
      inject: true // 是否将js放在body的末尾
    }),
    new HappyPack({
	    //用id来标识 happypack处理那里类文件
	    id: 'happyBabel',
	    //如何处理  用法和loader 的配置一样
	    loaders: [{
        loader: 'babel-loader',
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
	    }],
	    //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
	    threadPool: happyThreadPool,
	    //允许 HappyPack 输出日志
	    verbose: true,
		}),
		// css单独提取
		// new MiniCssExtractPlugin({
	 //    filename: "[name].css",
	 //    chunkFilename: "[id].css"
		// })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".less", ".css", ".scss"], //后缀名自动补全
    alias: {
      component: __dirname + '/src/component',
      actions: __dirname + '/src/actions',
      static: __dirname + '/src/static',
      utils: __dirname + '/src/utils'
    },
  },
  performance: false // 关闭性能提示
}