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
    manager: ''
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