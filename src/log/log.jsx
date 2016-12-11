import React, {Component} from 'react';
import {render} from 'react-dom';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import fetch from '../common/fetch';

import 'antd/dist/antd.less';
import './log.less';

const FormItem = Form.Item;

class LogPane extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('/leave/auth/login', {
                    data: {
                        username: values.username,
                        passwd: values.password
                    }
                }).then((res) => {
                    if (!res.errno) {
                        location.href = '/leave/leave.html?username=' + res.username;
                    } else {
                        message.error(res.errmsg);
                    }
                });
            }
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入用户密码!' }],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );

    }
}

LogPane = Form.create()(LogPane);

render (
    <LogPane />,
    document.getElementById('main')
);