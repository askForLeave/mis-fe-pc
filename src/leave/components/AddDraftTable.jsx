import React, {Component} from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import moment from 'moment';
import EditAdd from './EditAdd.jsx';
moment.locale('zh-cn');

export default class AddDraftTable extends Component {
    constructor(props) {
        super(props);
    }
    pageChange (page) {
        const {addActions, addList, info} = this.props;
        addActions.ADD_DRAFT_LIST_FETCH({
            page,
            pageSize: addList.pageSize,
            username: info.username
        });
    }

    deleteApply(record) {
        const {addActions} = this.props;
        Modal.warning({
            title: '警告',
            content: '确认删除？删除后不可恢复',
            onOk: () => {
                addActions.ADD_DELETE_FETCH({
                    id: record.id
                });
            },
            onCancel: () => {
                console.log('cancel');
            }
        });
    }
    render() {
        const {addActions, addList, info} = this.props;
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
                title: '申请人',
                dataIndex: 'applyUserName',
                key: 'applyUserName'
            }, {
                title: '部门',
                dataIndex: 'department',
                key: 'department'
            }, {
                title: '加班时间',
                dataIndex: 'startTime',
                key: 'startTime',
                render: (text) => {
                    return (
                        <span>{moment.unix(text).format('YYYY/MM/DD')}</span>
                    );
                }
            }, {
                title: '审核人',
                dataIndex: 'reviewer',
                key: 'reviewer'
            }, {
                title: '加班原因',
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
                render: (text, record) => {
                    const updateProps = {
                        form: record,
                        info,
                        addActions,
                        type: 'update'
                    };
                    return (
                        <div>
                            <EditAdd edit={updateProps}/>
                            <Button type="default" shape="circle" icon="delete" onClick={() => this.deleteApply(record)} />
                        </div>
                    );
                }
            }],
            dataSource: addList.list,
            pagination: {
                total: addList.total,
                current: addList.page,
                pageSize: addList.pageSize,
                onChange: page => this.pageChange(page)
            }
        };

        return (
            <Table {...draftTableProps} />
        );
    }
}