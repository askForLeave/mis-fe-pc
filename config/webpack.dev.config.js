var webpack = require('webpack');
var make = require('./webpack.base.config.js');

// 业务开发目录
var DEV_DIR = './src';
// build 输出目录
var OUTPUT_DIR = '../dist';

var customEnv = {
    // 入口文件加工
    makeEntry: function (entryStr, fileName) {
        return entryStr;
    },
    // 出口文件加工
    makeOutput: function (outPutConfig) {
        return outPutConfig;
    },
    // 插件加工
    makePlugins: function (pluginKey, originalConfig) {
        switch (pluginKey) {
            case 'HtmlWebpackPlugin':
                // 添加热部署文件
                // originalConfig.chunks.unshift('devServer'); // 添加一个devServer块
                return originalConfig;
            default:

        }
    }
};

var webpackConfig = make(DEV_DIR, OUTPUT_DIR, customEnv);

// 热部署模块
webpackConfig.entry['devServer'] = ['webpack-dev-server/client?http://127.0.0.1:8080'];

webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name: 'devServer',
        chunks: ['devServer'],
        minChunks: Infinity
    }),
    // 变量替换插件
    new webpack.DefinePlugin({
        '__EVN_DOMAIN': JSON.stringify('127.0.0.1:8080')
    })
]);


module.exports = webpackConfig;
