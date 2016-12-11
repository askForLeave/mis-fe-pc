import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import applyList from '../reducers/applyList.js';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import EditModal from '../components/EditModal.jsx';
import DraftTable from '../components/DraftTable.jsx';
import PublishTable from '../components/PublishTable.jsx';

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


    render() {
        const {applyList, applyActions, info} = this.props;
        const addProps = {
            info,
            form: {},
            applyActions,
            type: 'add'
        };
        const tabProps = {
            tabBarExtraContent: <EditModal edit={addProps}/>,
            defaultActiveKey: 'draft',
            onChange: e => this.tabChange(e)
        };

        const draftProps = {
            applyList,
            applyActions,
            info
        };
        const publishTableProps = {
            applyList,
            applyActions,
            info
        };
        return (
            <div className="apply-list-container">
                <Tabs {...tabProps}>
                    <TabPane tab={<span><Icon type="delete" />草稿箱</span>} key="draft">
                        <DraftTable {...draftProps} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="save" />已提交</span>} key="publish">
                        <PublishTable {...publishTableProps}/>
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