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
import _ from 'underscore';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
moment.locale('zh-cn');
class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            description: props.edit.type === 'add' ? '' : props.edit.info.type[props.edit.form.type].description
        };
    }

    componentWillUnmount() {
        this.setState({
            description: ''
        });
    }

    handleClick() {
        this.setState({
            visible: true
        });
    }

    handleSelect(value) {
        const {edit} = this.props;
        this.setState({
            description: edit.info.type[value].description
        });
    }

    handleOk() {
        const {edit, form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                if (values.type == 1 && this.getDayRange() > edit.info.annualLeft) {
                    message.error('剩余年假时间不足');
                } else if (values.time[0].isBefore(moment().hour(0).minute(0).second(0))) {
                    message.error('请假开始时间必须大于当前时间');
                } else {
                    const params = {
                        username: edit.info.username,
                        startTime: values.time[0].unix(),
                        endTime: values.time[1].unix(),
                        type: values.type,
                        reason: values.reason,
                        submitStatus: values.submitStatus
                    };
                    if (edit.type === 'add') {
                        edit.applyActions.APPLY_INFO_ADD_FETCH(params);
                    } else {
                        params.id = edit.form.id;
                        edit.applyActions.APPLY_INFO_UPDATE_FETCH(params);
                    }
                    this.setState({
                        visible: false
                    });
                }
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
                <Button type="primary" icon="plus" onClick={() => this.handleClick()}>新增请假申请</Button>
            );
        } else if (edit.type === 'update') {
            return (
                <Button type="primary" icon="edit" shape="circle" onClick={() => this.handleClick()} />
            );
        }
    }

    disabledDate(current) {
        return current && current.valueOf() < Date.now() || (current.get('day') === 6 || current.get('day') === 0);
    }

    getDayRange() {
        const {form} = this.props;
        if (form.getFieldValue('time')) {
            const start = form.getFieldValue('time')[0];
            const end = form.getFieldValue('time')[1];
            let tmp = moment(start.valueOf());
            let count = 1;
            while (tmp.isBefore(end)) {
                if (!(tmp.get('day') === 6 || tmp.get('day') === 0)) {
                    count += 1;
                }
                tmp = tmp.add(1, 'day');
            }
            return count;
        }
        return '0';
    }

    render() {
        const {edit} = this.props;
        const {getFieldDecorator} = this.props.form;
        const modalProps = {
            title: '请假申请',
            visible: this.state.visible,
            onOk: () => this.handleOk(),
            onCancel: () => this.handleCancel(),
            maskClosable: false
        };
        const formProps = {
            vertical: true
        };
        const typeOptions = _.map(edit.info.type, (value, key) => {
            return <Option key={key} value={key}>{value.name}</Option>
        });
        return (
            <div className="edit-leave-modal">
                {this.renderButton()}
                <Modal {...modalProps} >
                    <Form {...formProps}>
                        <FormItem label="请假类型">
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true,
                                    message: '请选择请假类型'
                                }]
                            })(
                                <Select placeholder="选择一种假期" onSelect={value => this.handleSelect(value)}>
                                    {typeOptions}
                                </Select>
                            )}
                            <p>{this.state.description}</p>
                        </FormItem>
                        <FormItem
                            label="假期范围"
                        >
                            {getFieldDecorator('time', {
                                rules: [{
                                    type: 'array',
                                    required: true,
                                    message: '请选择起止时间'
                                }]
                            })(
                                <RangePicker disabledDate={this.disabledDate.bind(this)} />
                            )}
                            <p>请假天数：{this.getDayRange()}</p>
                        </FormItem>
                        <FormItem label="请假原因">
                        {getFieldDecorator('reason', {
                            rules: [{
                                type: 'string',
                                required: true,
                                message: '请填写请假原因'
                            }]
                        })(
                            <Input placeholder="请输入请假原因" />
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
                type: '' + edit.form.type,
                time: [moment.unix(edit.form.startTime), moment.unix(edit.form.endTime)],
                reason: edit.form.reason
            });
        }
    }
}

EditModal = Form.create()(EditModal);

export default EditModal;
