/**
 * Created by yangmutong on 2016/12/6.
 */
import immutable from 'immutable';
import actionReducer from '../../common/actionReducer';
import fetch from '../../common/fetch';

let initialState = immutable.fromJS({
    name: '',
    username: '',
    department: '',
    annualTotal: 0,
    annualLeft: 0,
    manager: '',
    type: {
        '1': {
            name: '年假',
            description: '描述'
        },
        '2': {
            name: '婚假',
            description: '描述'
        },
        '3': {
            name: '产假/陪产假',
            description: '描述'
        },
        '4': {
            name: '病假',
            description: '描述'
        },
        '5': {
            name: '丧假',
            description: '描述'
        },
        '6': {
            name: '公假',
            description: '描述'
        },
        '7': {
            name: '事假',
            description: '描述'
        }
    },
    status: {
        '1': '草稿',
        '2': '待审核',
        '3': '审核通过',
        '4': '驳回'
    }
});

export default actionReducer(initialState, {
    USER_INFO_FETCH: {
        creator(username) {
            const that = this;
            return (dispatch, getState) => {
                fetch('/leave/apply/info', {
                    data: {
                        username
                    }
                }).then(function (data) {
                    dispatch(that.USER_INFO_RECEIVE(data));
                });
            }
        }
    },
    USER_INFO_RECEIVE: {
        creator(data) {
            return {
                payload: data
            }
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    }
});