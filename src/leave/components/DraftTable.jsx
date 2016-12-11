import React, {Component} from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import moment from 'moment';
import EditModal from './EditModal.jsx';
moment.locale('zh-cn');

export default class DraftTable extends Component {
    constructor(props) {
        super(props);
    }
    pageChange (page) {
        const {applyActions, applyList, info} = this.props;
        applyActions.APPLY_DRAFT_LIST_FETCH({
            page,
            pageSize: applyList.pageSize,
            username: info.username
        });
    }

    deleteApply(record) {
        const {applyActions} = this.props;
        Modal.warning({
            title: '警告',
            content: '确认删除？删除后不可恢复',
            onOk: () => {
                applyActions.APPLY_INFO_DELETE_FETCH({
                    id: record.id
                });
            },
            onCancel: () => {
                console.log('cancel');
            }
        });
    }

    render() {
        const {applyList, applyActions, info} = this.props;

        const draftTableProps = {
            columns: [{
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'applyTime',
                render: (text) => {
                    return (
                        <span>{moment.unix(text).format('YYYY/MM/DD HH:mm:ss')}</span>
                    );
                }
            }, {
                title: '假期类型',
                dataIndex: 'type',
                key: 'type',
                render: (text) => {
                    return (
                        <span>{info.type[text].name}</span>
                    );
                }
            }, {
                title: '申请人',
                dataIndex: 'applyUserName',
                key: 'applyUserName'
            }, {
                title: '部门',
                dataIndex: 'department',
                key: 'department'
            }, {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                render: (text) => {
                    return (
                        <span>{moment.unix(text).format('YYYY/MM/DD HH:mm:ss')}</span>
                    );
                }
            }, {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                render: (text) => {
                    return (
                        <span>{moment.unix(text).format('YYYY/MM/DD HH:mm:ss')}</span>
                    );
                }
            }, {
                title: '审核人',
                dataIndex: 'reviewer',
                key: 'reviewer'
            }, {
                title: '原因',
                dataIndex: 'reason',
                key: 'reason'
            }, {
                title: '当前状态',
                dataIndex: 'status',
                key: 'status',
                render: (text) => {
                    return (
                        <span>{info.status[text]}</span>
                    );
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record, index) => {
                    const updateProps = {
                        form: record,
                        info,
                        applyActions,
                        type: 'update'
                    };
                    return (
                        <div>
                            <EditModal edit={updateProps}/>
                            <Button type="default" shape="circle" icon="delete" onClick={() => this.deleteApply(record)} />
                        </div>
                    );
                }
            }],
            dataSource: applyList.list,
            pagination: {
                total: applyList.total,
                current: applyList.page,
                pageSize: applyList.pageSize,
                onChange: page => this.pageChange(page)
            }
        };

        return (
            <Table {...draftTableProps} />
        );
    }
}