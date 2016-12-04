import React, {Components} from 'react';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';

class App extends Components {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello world</div>
        );
    }
}

export default connect()(App);