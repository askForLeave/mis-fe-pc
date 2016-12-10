import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import applyList from '../reducers/applyList.js';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Progress from 'antd/lib/progress';
import moment from 'moment';
import Modal from 'antd/lib/modal';
import Detail from '../components/Detail.jsx';
import EditModal from './EditModal.jsx';

const TabPane = Tabs.TabPane;

class ApplyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'draft'
        };
    }
    componentDidMount() {
        const {applyActions, applyList, info} = this.props;
        applyActions.APPLY_DRAFT_LIST_FETCH({
            page: applyList.page,
            pageSize: applyList.pageSize,
            username: info.username
        });
    }

    tabChange (key) {
        const {applyActions, info, applyList} = this.props;
        if (key === 'draft') {
            this.setState({
                tab: 'draft'
            });
            applyActions.APPLY_DRAFT_LIST_FETCH({
                page: 1,
                pageSize: applyList.pageSize,
                username: info.username
            });
        } else {
            this.setState({
                tab: 'publish'
            });
            applyActions.APPLY_PUBLISH_LIST_FETCH({
                page: 1,
                pageSize: applyList.pageSize,
                username: info.username
            });
        }
    }
    pageChange (page) {
        const {applyActions, applyList, info} = this.props;
        if (this.state.tab === 'draft') {
            applyActions.APPLY_DRAFT_LIST_FETCH({
                page,
                pageSize: applyList.pageSize,
                username: info.username
            });
        } else {
            applyActions.APPLY_PUBLISH_LIST_FETCH({
                page,
                pageSize: applyList.pageSize,
                username: info.username
            });
        }
    }

    delete(record) {
        console.log(record);
        const {applyActions, applyList, info} = this.props;
        Modal.warning({
            title: '警告',
            content: '确认删除？删除后不可恢复',
            onOk: () => {
                applyActions.APPLY_DRAFT_LIST_FETCH({
                    page: applyList.page,
                    pageSize: applyList.pageSize,
                    username: info.username
                });
            },
            onCancel: () => {
                console.log('cancel');
            }
        });
    }
    detail(record) {
        console.log(record);
    }

    processSourceData(data) {

    }

    render() {
        const {applyList, applyActions, info} = this.props;
        const tabChange = e => this.tabChange(e);
        const pageChange = page => this.pageChange(page);
        const addProps = {
            info,
            form: {},
            applyActions,
            type: 'add'
        };
        console.log(addProps);
        const tabProps = {
            tabBarExtraContent: <EditModal edit={addProps}/>,
            defaultActiveKey: 'draft',
            onChange: tabChange
        };
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
                            <Button type="default" shape="circle" icon="delete" onClick={() => this.delete(record)} />
                        </div>
                    );
                }
            }],
            dataSource: applyList.list,
            pagination: {
                total: applyList.total,
                current: applyList.page,
                pageSize: applyList.pageSize,
                onChange: pageChange
            }
        };
        const publishTableProps = {
            columns: [{
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'applyTime'
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
                key: 'startTime'
            }, {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime'
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
                onChange: pageChange
            }
        };
        return (
            <div className="apply-list-container">
                <Tabs {...tabProps}>
                    <TabPane tab={<span><Icon type="delete" />草稿箱</span>} key="draft">
                        <Table {...draftTableProps} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="save" />已提交</span>} key="publish">
                        <Table {...publishTableProps}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        applyList: state.applyList.toJS(),
        info: state.info.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        applyActions: bindActionCreators(applyList.creators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyList);