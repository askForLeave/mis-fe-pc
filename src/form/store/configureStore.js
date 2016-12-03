import {createStore, applyMiddleware} from 'redux';
import thunkMidddleware from 'redux-thunk';
import formReducer from '../reducers/reducers.js';

const createStoreWithMiddleware = applyMiddleware(thunkMidddleware)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(formReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
}
