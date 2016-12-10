import React, {Component} from 'react';
import Table from 'antd/lib/table';
import moment from 'moment';
import Detail from './Detail.jsx';
moment.locale('zh-cn');

export default class PublishTable extends Component {
    constructor(props) {
        super(props);
    }

    pageChange(page) {
        const {applyActions, applyList, info} = this.props;
        applyActions.APPLY_PUBLISH_LIST_FETCH({
            page,
            pageSize: applyList.pageSize,
            username: info.username
        });
    }

    render() {
        const {applyList, info} = this.props;
        const publishTableProps = {
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
                key: 'type'
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
                key: 'status'
            }, {
                title: '审核原因',
                dataIndex: 'reviewReason',
                key: 'reviewReason'
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record, index) => {
                    const props = {
                        record: record,
                        info: info
                    };
                    return (
                        <Detail {...props} />
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
            <Table {...publishTableProps} />
        );
    }

}