import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'yangmutong'
        };
    }
    handleClick (e) {
        console.log(e);
        const {routerActions:{push}} = this.props;
        push(e.key);
    }
    render() {
        const title = [
            <span><Icon type="edit" /><span>请假申请</span></span>,
            <span><Icon type="inbox" /><span>请假审核</span></span>
        ];
        const handleClick = e => this.handleClick(e);
        const menuProps = {
            mode: 'inline',
            onClick: handleClick
        };
        const {children, routing} = this.props;
        return (
            <div className="leave-container">
                <header id="header" className="leave-header">
                    <Row>
                        <Col span={6} className="leave-logo">假</Col>
                        <Col span={18}></Col>
                    </Row>
                </header>
                <div className="leave-main" id="main">
                    <Row>
                        <Col lg={4} md={6} sm={24} className="leave-side-bar" id="side-bar">
                            <Menu {...menuProps}>
                                <SubMenu key="leaveaApply" title={title[0]}>
                                    <Item key="applyList">请假列表</Item>
                                </SubMenu>
                                <SubMenu key="leaveReview" title={title[1]}>
                                    <Item key="reviewList">审核列表</Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                        <Col lg={20} md={18} sm={24} className="leave-content" id="content">
                            {children}
                        </Col>
                    </Row>
                </div>
                <footer id="footer" className="leave-footer">
                    &copy; TJU
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        routing: state.routing
    };
}
function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);