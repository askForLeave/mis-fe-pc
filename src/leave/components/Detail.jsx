import React, {Component} from 'react';
import Modal from 'antd/lib/modal';
import Timeline from 'antd/lib/timeline';
import Button from 'antd/lib/button';
import moment from 'moment';

export default class Detail extends Component {
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
        const {record, info} = this.props;
        const modalProps = {
            visible: this.state.visible,
            title: '申请详情',
            onOk: () => this.handleOk(),
            onCancel: () => this.handleCancel(),
        };
        let result = '';
        if (record.status === 2) {
            result = (
                <Timeline.Item color="green">
                    已提交审核，请等待主管审核完成
                </Timeline.Item>
            );
        } else if (record.status === 3) {
            result = (
                <Timeline.Item>
                    <p>审核人员：{record.reviewer}</p>
                    <p>审核结果：审核已经通过</p>
                    <p>审核时间：{moment.unix(record.reviewTime).format('YYYY/MM/DD HH:mm:ss')}</p>
                 </Timeline.Item>
             );
        } else if (record.status === 4) {
            result = (
                <Timeline.Item color="red">
                    <p>审核人员：{record.reviewer}</p>
                    <p>审核结果：审核被驳回</p>
                    <p>驳回原因：{record.reviewReason}</p>
                    <p>驳回时间：{moment.unix(record.reviewTime).format('YYYY/MM/DD HH:mm:ss')}</p>
                </Timeline.Item>
            );
        }

        return (
            <div>
                <Button shape="circle" icon="question-circle-o" onClick={() => this.handleClick()}/>
                <Modal {...modalProps}>
                    <Timeline>
                        <Timeline.Item color="green">创建时间: {moment.unix(record.applyTime).format('YYYY/MM/DD HH:mm:ss')}</Timeline.Item>
                        <Timeline.Item color="green">提交时间: {moment.unix(record.applyTime).format('YYYY/MM/DD HH:mm:ss')}</Timeline.Item>
                        {result}
                    </Timeline>
                </Modal>
            </div>
        );
    }
}
