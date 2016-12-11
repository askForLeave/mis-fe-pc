import React, {Component} from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import message from 'antd/lib/message';
import moment from 'moment';

import _ from 'underscore';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
moment.locale('zh-cn');

class ReviewModal extends Component {
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
        const {review, form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    id: review.record.id,
                    status: values.status,
                    reviewReason: values.reviewReason
                };
                review.reviewActions.REVIEW_ACTION_FETCH(params);
            } else {
                message.error("请填写完整的表单信息");
            }
        });

        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }


    render() {
        const {review} = this.props;
        const {getFieldDecorator} = this.props.form;
        const modalProps = {
            title: '请假审核',
            visible: this.state.visible,
            onOk: () => this.handleOk(),
            onCancel: () => this.handleCancel(),
            maskClosable: false
        };
        const formProps = {
            vertical: true
        };
        return (
            <div className="review-leave-modal">
                <Button type="primary" onClick={() => this.handleClick()}>审核</Button>
                <Modal {...modalProps}>
                    <Row>
                        <Col span={24}>请假人员：{review.record.applyUserName}</Col>
                        <Col span={24}>假期类型：{review.info.type[review.record.type].name}</Col>
                        <Col span={24}>开始时间：{moment.unix(review.record.startTime).format('YYYY/MM/DD HH:mm:ss')}</Col>
                        <Col span={24}>结束时间：{moment.unix(review.record.endTime).format('YYYY/MM/DD HH:mm:ss')}</Col>
                        <Col span={24}>请假原因：{review.record.reason}</Col>
                    </Row>
                    <br/>
                    <Form {...formProps}>
                        <FormItem label="审核结果">
                            {getFieldDecorator('status', {
                                rules: [{
                                    required: true,
                                    message: '请选择是否通过'
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value="3">通过</Radio>
                                    <Radio value="4">驳回</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem label="原因">
                            {getFieldDecorator('reviewReason', {
                                rules: [{
                                    type: 'string',
                                    required: true,
                                    message: '请填写通过或驳回原因'
                                }]
                            })(
                                <Input placeholder="请填写通过或驳回原因" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

ReviewModal = Form.create()(ReviewModal);

export default ReviewModal;