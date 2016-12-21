import React, {Component} from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
moment.locale('zh-cn');
class EditAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleClick() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        const {edit, form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    username: edit.info.username,
                    startTime: values.time.unix(),
                    endTime: values.time.unix(),
                    type: 10,
                    reason: values.reason,
                    submitStatus: values.submitStatus
                };
                if (edit.type === 'add') {
                    message.info("添加成功");
                    edit.addActions.ADD_ADD_FETCH(params);
                } else {
                    message.info("更新成功");
                    params.id = edit.form.id;
                    edit.addActions.ADD_UPDATE_FETCH(params);
                }
                this.setState({
                    visible: false
                });
            }
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    renderButton() {
        const {edit} = this.props;
        if (edit.type === 'add') {
            return (
                <Button type="primary" icon="plus" onClick={() => this.handleClick()}>新增加班申请</Button>
            );
        } else if (edit.type === 'update') {
            return (
                <Button type="primary" icon="edit" shape="circle" onClick={() => this.handleClick()} />
            );
        }
    }

    disabledDate(current) {
        return current && ( (current.isBefore(moment().subtract(14, 'days')) || current.isAfter(moment())) || (current.get('day') !== 6 && current.get('day') !== 0));
    }

    render() {
        const {edit} = this.props;
        const {getFieldDecorator} = this.props.form;
        const modalProps = {
            title: '加班申请',
            visible: this.state.visible,
            onOk: () => this.handleOk(),
            onCancel: () => this.handleCancel(),
            maskClosable: false
        };
        const formProps = {
            vertical: true
        };
        return (
            <div className="edit-leave-modal">
                {this.renderButton()}
                <Modal {...modalProps} >
                    <Form {...formProps}>
                        <p>加班说明：加班只能申请过去两周内的周六日</p>
                        <FormItem
                            label="加班日期"
                        >
                            {getFieldDecorator('time', {
                                rules: [{
                                    type: 'object',
                                    required: true,
                                    message: '请选择加班干时间'
                                }]
                            })(
                                <DatePicker format="YYYY-MM-DD" disabledDate={this.disabledDate.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem label="加班原因">
                            {getFieldDecorator('reason', {
                                rules: [{
                                    type: 'string',
                                    required: true,
                                    message: '请填写加班原因'
                                }]
                            })(
                                <Input placeholder="请输入加班原因" />
                            )}
                        </FormItem>
                        <FormItem
                            label="提交至"
                        >
                            {getFieldDecorator('submitStatus', {
                                rules: [{
                                    required: true,
                                    message: '请选择提交至草稿箱或者审核'
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value="1">草稿箱</Radio>
                                    <Radio value="2">提交审核</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {form, edit} = nextProps;
        if (edit.type === 'update') {
            form.setFieldsInitialValue({
                time: moment.unix(edit.form.startTime),
                reason: edit.form.reason
            });
        }
    }
}

EditAdd = Form.create()(EditAdd);

export default EditAdd;
