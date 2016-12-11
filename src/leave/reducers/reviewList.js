/**
 * Created by yangmutong on 2016/12/6.
 */
import immutable from 'immutable';
import fetch from '../../common/fetch';
import actionReducer from '../../common/actionReducer';
import message from 'antd/lib/message';

let initialState = immutable.fromJS({
    list: [],
    page: 1,
    pageSize: 10,
    total: 0
});

export default actionReducer(initialState, {
    REVIEW_TODO_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/review/todoList', {
                    data: params
                }).then(function (res) {
                    dispatch(that.REVIEW_TODO_LIST_RECEIVE(res));
                });
            }
        }
    },
    REVIEW_TODO_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },
    REVIEW_DONE_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/review/doneList', {
                    data: params
                }).then(function (res) {
                    dispatch(that.REVIEW_DONE_LIST_RECEIVE(res));
                });
            }

        }
    },
    REVIEW_DONE_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },
    REVIEW_ACTION_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/review/action', {
                    data: params
                }).then(function (res) {
                    dispatch(that.REVIEW_ACTION_RECEIVE(res));
                });
            }
        }
    },
    REVIEW_ACTION_RECEIVE: {
        creator(res) {
            message.info('审核成功');
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().reviewList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.REVIEW_TODO_LIST_FETCH(params));
            }
        }
    }
});