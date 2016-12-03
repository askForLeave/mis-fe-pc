/**
 * 构建view
 */
import $ from 'jquery';
import React, {Component} from 'react';
import { Form, Input, Select, Checkbox, Radio, Button, Table, Alert, message } from 'antd';
import {connect} from 'react-redux';
import {fetchForm, subForm} from '../actions/actions.js';
import validators from '../validators.js';

const Item = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class App extends Component {
    // 渲染完成后调用
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchForm());
    }
    submitForm(e) {
        e.preventDefault();
        const { dispatch, formData } = this.props;
        this.props.form.validateFields((error, values) => {
            if (!error) {
                // const params = $.extend(formData, this.props.form.getFieldsValue());
                const params = this.props.form.getFieldsValue();
                dispatch(subForm(params));
            }
        })

    }
    handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const { dispatch } = this.props;
        dispatch(fetchForm({
            page: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize
            }
        }))
    }
    handleHttpReject(errorStatus, errorMsg) {
        if (errorStatus) {
            message.error(errorMsg);
        }
    }
    handleBusinessMsg(code, codeMsg) {
        if (code === null || code === undefined) {
            return;
        }
        if (code === 0) {
            message.success('操作成功！');
        } else {
            message.error(codeMsg);
        }

    }
    render() {
        const {formData, tableData, pagination, isLoading, isSubing, code, codeMsg, errorStatus, errorMsg} = this.props;
        const {getFieldProps} = this.props.form;
        // 布局
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        // Checkbox
        const checkboxOptions = [
            {label: '睡觉', value: 'sleep'},
            {label: '户外', value: 'out'},
            {lable: '不可选', value: 'no', disabled: true}
        ];
        // 表头
        const columns = [
            {
                title: '姓名',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '性别',
                key: 'gender',
                dataIndex: 'gender',
                render: (text, record) => (
                    <div>{record.name}|{text ? '男' : '女'}</div>
                )
            }
        ];

        this.handleBusinessMsg(code, codeMsg);
        this.handleHttpReject(errorStatus, errorMsg);

        return (
            <Form horizontal onSubmit={this.submitForm.bind(this)} >
                <Item {...formItemLayout} label="用户名：">
                    <p className="ant-form-text">{formData.userName}</p>
                </Item>
                <Item {...formItemLayout} label="年龄：">
                    <Input placeholder="请输入年龄" {...getFieldProps('age', validators.age)}  />
                </Item>
                <Item {...formItemLayout} label="邮箱：">
                    <Input placeholder="请输入邮箱" {...getFieldProps('email', validators.email)}  />
                </Item>
                <Item {...formItemLayout} label="城市：">
                    <Select defaultValue={formData.city} {...getFieldProps('city')}>
                        <Option value="beijing">北京</Option>
                        <Option value="shanghai">上海</Option>
                    </Select>
                </Item>
                <Item {...formItemLayout} label="性别：">
                    <RadioGroup {...getFieldProps('gender')}>
                        <Radio value="1">男</Radio>
                        <Radio value="0">女</Radio>
                    </RadioGroup>
                </Item>
                <Item {...formItemLayout} label="爱好：">
                    <CheckboxGroup options={checkboxOptions} {...getFieldProps('hobby')} />
                </Item>
                <Item {...formItemLayout} label="备注：">
                    <Input type="textarea" placeholder="说一些你想说的" {...getFieldProps('desc')} />
                </Item>
                <Item {...formItemLayout} label="表格：">
                    <Table columns={columns} dataSource={tableData} onChange={this.handleTableChange.bind(this)} pagination={pagination} />
                </Item>
                <Item wrapperCol={{span: 16, offset: 6}}>
                    <Button type="primary" htmlType="submit" loading={isSubing}>提交</Button>
                </Item>
            </Form>
        )
    }
}

function select(state) {
    return state;
}

// 在form表单业务中必须 要有mapPropsToFields参数
App = Form.create({
    mapPropsToFields: function(props) {
        const formData = {};
        $.each(props.formData, (key, value) => {
            formData[key] = {
                value: value
            };
        });
        return formData;
    }
})(App);

export default connect(select)(App);
