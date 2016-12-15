import React from 'react';
import {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import App from '../containers/App.jsx';
import Index from '../containers/Index.jsx';
import ApplyList from '../containers/ApplyList.jsx';
import ReviewList from '../containers/ReviewList.jsx';
import Help from '../containers/Help.jsx';
import Add from '../containers/Add.jsx';
export default (
    <Route path="/" component={App}>
        {/*首页*/}
        <IndexRedirect to="/index" />
        <Route path="/index" component={Index} />
        {/*/!*登录*!/*/}
        {/*<Route path="/login" component={} />*/}
        {/*申请列表*/}
        <Route path="/applyList" component={ApplyList} />
        {/*审核列表*/}
        <Route path="/reviewList" component={ReviewList} />
        {/*帮助页面*/}
        <Route path="/help" component={Help} />
        {/*加班申请*/}
        <Route path="/addList" component={Add} />
    </Route>
);