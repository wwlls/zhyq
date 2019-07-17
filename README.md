## 构建 Start

```
npm install		# 安装依赖模块
```

```
npm run dev		# 运行开发环境，默认监听9000端口
```

```
npm run build		# 正式打包，用于生产环境

```
node server		# 打包以后进行自测

```
删除node_modules所有包命令 
先下载 npm install rimraf -g
接着 rimraf node_modules

```
node-sass安装失败，可用淘宝镜像下载

npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install node-sass --save-dev