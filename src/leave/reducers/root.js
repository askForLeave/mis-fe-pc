/**
 * Created by yangmutong on 2016/12/4.
 */
import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import info from './info.js';
import applyList from './applyList.js';
import reviewlist from './reviewList.js';

const rootReducer = combineReducers({
    routing,
    info: info.reducer,
    applyList: applyList.reducer,
    reviewList: reviewlist.reducer
});

export default rootReducer;