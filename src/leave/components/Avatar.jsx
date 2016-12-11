import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';
export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect(item) {
        if (item.key === 'logout') {
            location.href = '/logout';
        }
    }
    render() {
        const {info} = this.props;
        const menu = (
            <Menu onSelect={this.handleSelect.bind(this)}>
                <Menu.Item key="logout">
                    <Tag color="#87d068" >注销登录</Tag>
                </Menu.Item>
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