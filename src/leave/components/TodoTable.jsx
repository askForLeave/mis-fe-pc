import React, {Component} from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import moment from 'moment';
import ReviewModal from './ReviewModal.jsx';
moment.locale('zh-cn');

export default class TodoTable extends Component {
    constructor(props) {
        super(props);
    }

    pageChange(page) {
        const {reviewActions, reviewList, info} = this.props;
        reviewActions.REVIEW_TODO_LIST_FETCH({
            page,
            pageSize: reviewList.pageSize,
            username: info.username
        });
    }
    render() {
        const {reviewList, reviewActions, info} = this.props;
        const todoTableProps = {
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
                render: (text, record) => {
                    const reviewProps = {
                        record,
                        info,
                        reviewActions
                    };
                    return (
                        <ReviewModal review={reviewProps}/>
                    );
                }
            }],
            dataSource: reviewList.list,
            pagination: {
                total: reviewList.total,
                current: reviewList.page,
                pageSize: reviewList.pageSize,
                onChange: page => this.pageChange(page)
            }
        };
        return (
            <Table {...todoTableProps} />
        );
    }
}