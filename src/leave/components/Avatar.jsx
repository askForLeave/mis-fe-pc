import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import { hashHistory } from 'react-router';
export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect(item) {
        if (item.key === 'logout') {
            location.href = '/logout';
        } else {
            hashHistory.push('/help');
        }
    }
    render() {
        const {info} = this.props;
        const menu = (
            <Menu onSelect={this.handleSelect.bind(this)}>
                <Menu.Item key="logout"><Icon type="logout" />注销登录</Menu.Item>
                <Menu.Item key="help"><Icon type="question-circle-o" />帮助</Menu.Item>
            </Menu>
        );
        const dropdownProps = {
            overlay: menu
        };
        return (
            <Dropdown {...dropdownProps}>
                <Icon type="user" className="leave-avatar" />
            </Dropdown>
        );
    }
}