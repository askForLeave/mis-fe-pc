/**
 * 动作枚举，动作预定义（做什么）
 */
import $ from 'jquery';
import '../../common/iAjax.js';

// 加载表单数据
export const FETCH_FORM_GET = 'FETCH_FORM_GET';
// 接收表单数据响应
export const FETCH_FORM_RECEIVE = 'FETCH_FORM_RECEIVE';
// 提交表单数据
export const SUB_FORM_POST = 'SUB_FORM_POST';
// 提交表单数据响应
export const SUB_FORM_RECEIVE = 'SUB_FORM_RECEIVE';
// 改变表单数据
export const CHANGE_FORM_DATA = 'CHANGE_FORM_DATA';
// 业务响应code非0
export const BUSINESS_REJECT = 'BUSINESS_REJECT';
// ajax http 响应非200，304错误
export const HTTP_REJECT = 'HTTP_REJECT';

// xhr响应失败
function doHttpReject(textStatus, errorMsg) {
    return {
        type: HTTP_REJECT,
        textStatus,
        errorMsg
    }
}
// 业务响应非0 code
function doBusinessReject(res) {
    return {
        type: BUSINESS_REJECT,
        res
    }
}

// 发起form数据请求
function doFetchForm(params) {
    return {
        type: FETCH_FORM_GET,
        params
    }
}
// form数据响应成功
function doFetchFormReceive(res) {
    return {
        type: FETCH_FORM_RECEIVE,
        res
    }
}

// 发起提交form数据请求
function doSubForm(formData) {
    return {
        type: SUB_FORM_POST,
        formData
    }
}
// 提交fomr数据响应
function doSubFormReceive(res, formData) {
    return {
        type: SUB_FORM_RECEIVE,
        res,
        formData
    }
}

// 请求表格数据
export function fetchForm(params) {
    return dispatch => {
        dispatch(doFetchForm(params));
        return $.iPost('/detail/async', params)
            .done(res => {
                if (res.code === 0) {
                    dispatch(doFetchFormReceive(res));
                } else {
                    dispatch(doBusinessReject(res));
                }

            })
            .fail((jqXhr, textStatus, errorMsg) => dispatch(doHttpReject(textStatus, errorMsg)))
    }
}
// 提交form数据
export function subForm(formData) {
    return dispatch => {
        dispatch(doSubForm(formData));
        return $.iPost('/form/post', formData)
            .done(res => {
                if (res.code === 0) {
                    dispatch(doSubFormReceive(res, formData));
                } else {
                    dispatch(doBusinessReject(res, formData));
                }

            })
            .fail((jqXhr, textStatus, errorMsg) => dispatch(doHttpReject(textStatus, errorMsg)))
    }
}
