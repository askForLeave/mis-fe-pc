/**
 * Created by yangmutong on 2016/12/15.
 */
import immutable from 'immutable';
import actionReducer from '../../common/actionReducer';
import fetch from '../../common/fetch';
import message from 'antd/lib/message';

let initialState = immutable.fromJS({
    list: [],
    page: 1,
    pageSize: 10,
    total: 0
});

export default actionReducer(initialState, {
    ADD_DRAFT_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/draftList', {
                    data: params
                }).then( (res) => {
                    dispatch(that.ADD_DRAFT_LIST_RECEIVE(res));
                });
            }

        }
    },

    ADD_DRAFT_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },

    ADD_PUBLISH_LIST_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/publishList', {
                    data: params
                }).then((res) => {
                    dispatch(that.ADD_PUBLISH_LIST_RECEIVE(res));
                });
            }

        }
    },

    ADD_PUBLISH_LIST_RECEIVE: {
        creator(res) {
            return {
                payload: res
            };
        },
        updater(state, action) {
            return state.merge(action.payload);
        }
    },

    ADD_DELETE_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch) => {
                fetch('/leave/apply/delete', {
                    data: params
                }).then((res) => {
                    dispatch(that.ADD_DELETE_RECEIVE());
                });
            }

        }
    },

    ADD_DELETE_RECEIVE: {
        creator(id) {
            message.info('删除成功');
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().addList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.ADD_DRAFT_LIST_FETCH(params));
            }
        }
    },

    ADD_ADD_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch, getState) => {
                fetch('/leave/apply/add', {
                    data: params
                }).then((res) => {
                    dispatch(that.ADD_ADD_RECEIVE());
                });
            }
        }
    },
    ADD_ADD_RECEIVE: {
        creator() {
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().addList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.ADD_DRAFT_LIST_FETCH(params));
            }
        }
    },

    ADD_UPDATE_FETCH: {
        creator(params) {
            const that = this;
            return (dispatch, getState) => {
                fetch('/leave/apply/modify', {
                    data: params
                }).then((res) => {
                    dispatch(that.ADD_UPDATE_RECEIVE());
                });
            }
        }
    },

    ADD_UPDATE_RECEIVE: {
        creator() {
            const that = this;
            return (dispatch, getState) => {
                const tmp = getState().addList.toJS();
                const params = {
                    username: getState().info.toJS().username,
                    page: tmp.page,
                    pageSize: tmp.pageSize
                };
                dispatch(that.ADD_DRAFT_LIST_FETCH(params));
            }
        }
    }

})

