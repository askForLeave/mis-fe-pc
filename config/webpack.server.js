var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.dev.config.js');
var complier = webpack(config, function(err, stats) {
    err && console.error(err);
    !err && console.log('webpack stats: ', stats);
});

var argv = require('yargs')
    .option('p', {
        alias: 'port',
        default: 8080,
        type: 'number'
    })
    .argv;

// 业务开发目录
var DEV_DIR = './src';
// build目录
var OUTPUT_DIR = './dist';
// URL映射mock数据地址
var mockPathMap = {};

var app = new WebpackDevServer(complier, {
    contentBase: OUTPUT_DIR,
    inline: true,
    hot: false,
    quiet: true,
    noInfo: true,
    setup: function(app) {
        // 拦截mockPathMap对于路由映射到mock数据
        app.all('*', function(req, res, next) {
            var mockFile = mockPathMap[req.originalUrl];
            if (mockFile) {
                res.sendFile(mockFile, {
                    root: path.resolve(__dirname, '../'),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }, function(err) {
                    err && console.log(err);
                });
            } else {
                next();
            }
        });
    }
});

// 提取server.conf配置信息
fs.readdir(DEV_DIR, function(err, files) {
    if (err) {
        console.error(err);
    } else {
        files.forEach(function(fileName) {
            var serverConfPath = DEV_DIR + '/' + fileName + '/server.conf';
            // 判断文件是否存在
            fs.exists(serverConfPath, function(exists) {
                if (exists) {
                    fs.readFile(serverConfPath, function(err, data) {
                        if (err) {
                            console.error(err);
                        } else {
                            var conf = data.toString().trim();
                            var confAry = conf.match(/.+/mg);
                            confAry.forEach(function(confline) {
                                var conflineAry = confline.split(/\s+/g);
                                conflineAry[1] && (mockPathMap[conflineAry[0]] = conflineAry[1]);
                            });
                        }
                    });
                }
            })

        });

    }
});

app.listen(argv.p, function() {
    console.log('服务启动成功：', argv.p);
});
