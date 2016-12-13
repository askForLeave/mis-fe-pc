### 项目使用介绍
----

#### 目录介绍

- config
    - config目录存放打包配置文件
    - webpack.base.config.js文件为打包基础配置项
    - webpack.dev.config.js文件为开发环境配置项
    - webpack.pro.config.js文件为上线打包配置项
    - webpack.server.js文件为mock服务配置
- mock
    - mock目录存放本地开发mock假数据
- src
    - src目录存放业务开发代码，每个模块一个文件夹，每个文件夹下必现有一个**server.conf**文件用来存放接口与假数据对应关系。
    - src/common目录下存放此工程模块的下通用业务组件

#### 如何启动项目

安装npm包：npm install

运行**npm run dev**编译当前业务文件到./dist目录下，编译完成后运行**npm start**启动mock服务，然后打开[http://127.0.0.1:8080/](http://127.0.0.1:8080/)访问即可。默认8080端口 如果想修改端口运行**npm start -- -p 8088**
