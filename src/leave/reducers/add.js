/**
 * Created by yangmutong on 2016/12/15.
 */
import immutable from 'immutable';
import actionReducer from '../../common/actionReducer';
import fetch from '../../common/fetch';

let initialState = immutable.fromJS({
    list: [],
    page: 1,
    pageSize: 10,
    total: 0
});

export default actionReducer(initialState, {
    ADD_OLD_LIST_FETCH: {

    },

    ADD_OLD_LIST_RECEIVE: {

    },


})

