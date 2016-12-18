import React, {Component} from 'react';
import Table from 'antd/lib/table';
import moment from 'moment';
import Detail from './Detail.jsx';
moment.locale('zh-cn');

export default class AddPublishTable extends Component {
    constructor(props) {
        super(props);
    }

    pageChange(page) {
        const {addActions, addList, info} = this.props;
        addActions.ADD_PUBLISH_LIST_FETCH({
            page,
            pageSize: addList.pageSize,
            username: info.username
        });
    }

    render() {
        const {addList, info} = this.props;
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
                title: '审核原因',
                dataIndex: 'reviewReason',
                key: 'reviewReason'
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    const props = {
                        record: record,
                        info: info
                    };
                    return (
                        <Detail {...props} />
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
            <Table {...publishTableProps} />
        );
    }

}