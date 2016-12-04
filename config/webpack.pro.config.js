var webpack = require('webpack');
var make = require('./webpack.base.config.js');

// 业务开发目录
var DEV_DIR = './src';
// build 输出目录
var OUTPUT_DIR = '../output';

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
                // 压缩html文件
                // https://github.com/kangax/html-minifier#options-quick-reference
                originalConfig.minify = {
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                };
                return originalConfig;
            default:

        }
    }
};


var webpackConfig = make(DEV_DIR, OUTPUT_DIR, customEnv);

webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        DOMAIN: 'leave.tju.edu.com',
        'process.env': {
            'NODE_ENV': '"production"'
        }
    }),
    // 添加压缩JS,CSS插件
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]);

module.exports = webpackConfig;
