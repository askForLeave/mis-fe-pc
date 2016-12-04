import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore.js';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from '../routes/routes.jsx';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>
        );
    }
}