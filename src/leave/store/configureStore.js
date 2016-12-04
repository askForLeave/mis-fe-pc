/**
 * Created by yangmutong on 2016/12/4.
 */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import rootReducer from '../reducers/index.js';
import formatAntdForm from '../middlewares/formatAntdForm';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    formatAntdForm,
    routerMiddleware(hashHistory) // react-router-redux中间件
)(createStore);

export default function configureStore(initialState = {}) {
    return createStoreWithMiddleware(
        rootReducer,
        initialState,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );
}
