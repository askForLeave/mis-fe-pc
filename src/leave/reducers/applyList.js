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
    APPLY_DRAFT_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/draftList', {
                    data: params
                }).then(function (res) {
                    dispatch(that.APPLY_DRAFT_LIST_RECEIVE(res));
                });
            }

        }
    },
    APPLY_DRAFT_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },
    APPLY_PUBLISH_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/publishList', {
                    data: params
                }).then(function (res) {
                    dispatch(that.APPLY_PUBLISH_LIST_RECEIVE(res));
                });
            }

        }
    },
    APPLY_PUBLISH_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },
    APPLY_INFO_DELETE_FETCH: {
        creator(id) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/delete', {
                    data: {
                        id
                    }
                }).then(function (res) {
                    dispatch(that.APPLY_INFO_DELETE_RECEIVE(res, id));
                });
            }

        }
    },
    APPLY_INFO_DELETE_RECEIVE: {
        creator(res, id) {
            message.info('删除成功');
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().applyList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.APPLY_DRAFT_LIST_FETCH(params));
            }
        }
    },
    APPLY_INFO_ADD_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch, getState) => {
                fetch('/leave/apply/add', {
                    data: params
                }).then(function (res) {
                    dispatch(that.APPLY_INFO_ADD_RECEIVE());
                });
            }
        }
    },
    APPLY_INFO_ADD_RECEIVE: {
        creator() {
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().applyList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.APPLY_DRAFT_LIST_FETCH(params));
            }
        }
    },
    APPLY_INFO_UPDATE_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch, getState) => {
                fetch('/leave/apply/modify', {
                    data: params
                }).then(function (res) {
                    dispatch(that.APPLY_INFO_UPDATE_RECEIVE());
                });
            }
        }
    },
    APPLY_INFO_UPDATE_RECEIVE: {
        creator() {
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().applyList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.APPLY_DRAFT_LIST_FETCH(params));
            }
        }
    }


});
