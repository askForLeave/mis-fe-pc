import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore.js';
import App from './App.jsx';
import $ from 'jquery';

const store = configureStore({formData: {userName: "测试数据"}});

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
