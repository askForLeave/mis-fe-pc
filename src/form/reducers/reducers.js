/**
 * state控制器，根据actions枚举控制state.（做成什么样）
 */
import $ from 'jquery';
import {combineReducers} from 'redux';
import {
    FETCH_FORM_GET,
    FETCH_FORM_RECEIVE,
    SUB_FORM_POST,
    SUB_FORM_RECEIVE,
    BUSINESS_REJECT,
    HTTP_REJECT
} from '../actions/actions.js';

// 标注state定义
// isLoading 数据请求中
// isSubing 表单提交中
// isValidate 表单校验是否成功
// code 接口返回数据状态
// codeMsg 接口返回msg消息
// errorStatus HTTP接口抛错状态吗
// errorMsg HTTP抛错信息
var state = {
    isLoading: false, // ajaxq请求中
    isSubing: false, // 提交中
    isValidate: false, // 是否校验通过
    formData: {} // for表单数据
};

var defaultState = {
    code: null,
    codeMsg: '',
    errorStatus: null,
    errorMsg: ''
};

function formReducer(state = state, action) {
    switch (action.type) {
        case FETCH_FORM_GET:
            return $.extend(true, {}, state, {
                isLoading: true
            }, defaultState)
        case FETCH_FORM_RECEIVE:
            const pageData = action.res.data;
            return $.extend(true, {}, state, {
                tableData: pageData.data,
                pagination: {
                    current: pageData.currentPage,
                    pageSize: pageData.pageSize,
                    total: pageData.totalCount
                }
            })
        case SUB_FORM_POST:
            return $.extend(true, {}, state, {
                isLoading: true,
                formData: action.formData
            }, defaultState)
        case SUB_FORM_RECEIVE:
            return $.extend(true, {}, state, {
                code: action.res.code,
                codeMsg: action.res.msg,
                formData: action.formData
            })
        case BUSINESS_REJECT:
            return $.extnd(true, {}, state, {
                code: action.res.code,
                codeMsg: action.res.msg
            })
        case HTTP_REJECT:
            return $.extend(true, {}, state, {
                errorStatus: action.textStatus,
                errorMsg: action.errorMsg
            })
        default:
            return state;

    }
}

export default formReducer;
