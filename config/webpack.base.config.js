var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var webpackConfig = {
        entry: {
            // 公用模块入口
            lib: ['react', 'react-dom', 'react-redux', 'react-router', 'immutable', 'react-router-redux', 'antd/dist/antd.css']
        },
        output: {},
        plugins: [
            // 公共模块提取
            new webpack.optimize.CommonsChunkPlugin({
                name: 'lib',
                minChunks: Infinity
            }),

            // css文件提取
            new ExtractTextPlugin('[name]/[name].[chunkhash].css')
        ],
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    // plugins: ['transform-runtime'],
                    presets: [
                        'es2015',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                        'stage-3',
                        'react'
                    ]
                }
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            }]
        },
        // css自动添加前缀
        postcss: [autoprefixer({
            browsers: ['IOS > 7', 'Android > 4']
        })]

    }
    // 生成入口配置
function makeEntry(devDir, fileName, customEnv) {
    webpackConfig.entry[fileName] = customEnv.makeEntry(
        devDir + '/' + fileName + '/' + fileName + '.jsx', fileName
    );
}
// 输出配置
function makeOutput(outputDir, customEnv) {
    webpackConfig.output = customEnv.makeOutput({
        path: path.resolve(__dirname, outputDir),
        filename: '[name]/[name].app.[chunkhash].js'
    });
}
// 生成插件配置配置
function makePlugins(devDir, fileName, customEnv) {
    var htmlPath = fileName + '/' + fileName + '.html'
        // 生成 HtmlWebpackPlugin 配置
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin(
            customEnv.makePlugins(
                'HtmlWebpackPlugin', {
                    cache: false,
                    title: fileName,
                    filename: htmlPath,
                    template: devDir + '/' + htmlPath,
                    chunks: ['lib', fileName]
                }, fileName
            )
        )
    );
}
/**
 * devDir 业务开发目录
 * outputDir  build输出目录
 * customEnv  不同环境配置加工实现
 */
module.exports = function(devDir, outputDir, customEnv) {
    var files = fs.readdirSync(devDir);
    // 遍历devDir下一级文件夹，生成相关entry,plugins配置
    files.forEach(function(fileName) {
        var htmlPath = path.resolve(__dirname, '.' + devDir + '/' + fileName + '/' + fileName + '.html');
        console.log(htmlPath);
        try {
            // 判断文件是否存在
            var stat = fs.statSync(htmlPath);
            if (stat.isFile()) {
                console.log('当前文件夹：' + fileName);

                // 生成入口文件配置
                makeEntry(devDir, fileName, customEnv);

                // 成才HtmlWebpackPlugin
                makePlugins(devDir, fileName, customEnv);
            }
        } catch (e) {
            console.error(e.message);
        }
    });

    makeOutput(outputDir, customEnv);

    return webpackConfig;
};
