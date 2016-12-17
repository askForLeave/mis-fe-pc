import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import info from '../reducers/info.js';
import Avatar from '../components/Avatar.jsx';
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'yangmutong'
        };
    }
    componentWillMount() {
        this.props.infoActions.USER_INFO_FETCH(this.state.username);
    }
    handleClick (e) {
        const {routerActions:{push}} = this.props;
        push(e.key);
    }
    render() {
        const {children, routing, info} = this.props;
        const title = [
            <span><Icon type="edit" /><span>请假申请</span></span>,
            <span><Icon type="inbox" /><span>审核管理</span></span>,
            <span><Icon type="plus-circle-o" /><span>加班申请</span></span>,
            <span><Icon type="question" /><span>帮助信息</span></span>
        ];
        const handleClick = e => this.handleClick(e);
        const menuProps = {
            mode: 'inline',
            onClick: handleClick,
            selectedKeys: [this.props.location.pathname.substring(1)]
        };
        return (
            <div className="leave-container">
                <header id="header" className="leave-header">
                    <Row>
                        <Col span={6} className="leave-logo">
                            <a href="#index">假</a>
                        </Col>
                        <Col span={12}></Col>
                        <Col span={6}>
                            <Avatar info={info}/>
                        </Col>
                    </Row>
                </header>
                <div className="leave-main" id="main">
                    <Row>
                        <Col lg={4} md={6} sm={24} className="leave-side-bar" id="side-bar">
                            <Menu {...menuProps}>
                                <SubMenu key="apply" title={title[0]}>
                                    <Item key="applyList">请假列表</Item>
                                </SubMenu>
                                <SubMenu key="review" title={title[1]}>
                                    <Item key="reviewList">审核列表</Item>
                                </SubMenu>
                                <SubMenu key="add" title={title[2]}>
                                    <Item key="addList">加班申请</Item>
                                </SubMenu>
                                <SubMenu key="helpList" title={title[3]}>
                                    <Item key="help">帮助信息</Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                        <Col lg={20} md={18} sm={24} className="leave-content" id="content">
                            {children}
                        </Col>
                    </Row>
                </div>
                <footer id="footer" className="leave-footer">
                    <div className="leave-footer-copy">&copy; TJU</div>
                    <div className="leave-footer-power">Powered by team</div>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        routing: state.routing,
        info: state.info.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        infoActions: bindActionCreators(info.creators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);