import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import { hashHistory } from 'react-router';
import fetch from '../../common/fetch';
export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect(item) {
        const {info} = this.props;

        if (item.key === 'logout') {
            fetch('/leave/auth/logout', {
                data: {
                    username: info.username
                }
            }).then(res => {
                if(!res) {
                    message.info('注销成功');
                    location.href = '/log/log.html';
                }
            });
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