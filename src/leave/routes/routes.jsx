import React from 'react';
import {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import App from '../containers/App.jsx';

export default (
    <Route path="/" component={App}>
        {/*首页*/}
        <IndexRedirect to="/index" />
        {/*登录*/}
        <Route path="/login" component={} />
        {/*申请列表*/}
        <Route path="/apply" component={} />
        {/*审核列表*/}
        <Route path="/review" component={} />
        {/*注销登录*/}
        <Route path="/logout" component={} />
    </Route>
);