import waite from './loading.js';
import { notification } from 'antd';
import { param } from '../util';

/**
 * fetch封装请求函数
 * @param  {function} dispatch redux的store的dispatch函数
 * @return {function}           返回一个
 */
export default (url = '', options) => {
    let defaultOptions = {
        method: 'POST',
        type: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        data: {},
        loading: true
    };
    options = Object.assign(defaultOptions, options);
    switch (options.method) {
        case 'GET':
            url = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + param(options.data);
            delete options.data;
            break;
        case 'POST':
            options.body = param(options.data);
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            break;
        default:
    }
    return new Promise((outResolve, outReject) => {
        options.loading && waite.open();
        fetch(url, options)
            .then((req) => {
                return new Promise((resolve, reject) => {
                    if (req.status >= 200 & req.status <= 300 || req.status == 304) {
                        resolve(req);
                    }
                    else if (req.status == 404) {
                        reject('请求地址不存在');
                    }
                    else {
                        reject('网络错误');
                    }
                });
            })
            .then((req) => req.json())
            .then((json) => {
                return new Promise((resolve, reject) => {
                    if (json.errno == '0') {
                        resolve(json.data);
                    }
                    else {
                        if (json.errno == '1003') {
                            notification.open({
                                message: '您没有活动平台操作权限',
                                description: '如有需要，请联系管理员，添加权限，chengenpeng@baidu.com',
                                duration: 0
                            });
                            setTimeout(() => options.loading && waite.close(), 200);
                        }
                        else {
                            reject(json.errmsg || '没有错误提示,请检查返回数据格式');
                        }
                    }
                });
            })
            .then((data) => {
                outResolve(data);
            })
            .catch((error) => {
                notification.error({
                    message: '请求错误',
                    description: error
                });
            })
            .then(() => {
                setTimeout(() => options.loading && waite.close(), 200);
            });
    });
};
