import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import Menu from 'antd/lib/menu';

class Index extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>Hello world index</div>
        );
    }
}

export default connect()(Index);