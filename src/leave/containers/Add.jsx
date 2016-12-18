import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import add from '../reducers/add.js';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import EditAdd from '../components/EditAdd.jsx';
import AddDraftTable from '../components/AddDraftTable.jsx';
import AddPublishTable from '../components/AddPublishTable.jsx';

const TabPane = Tabs.TabPane;
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'draft'
        };
    }
    componentDidMount() {
        const {addActions, addList, info} = this.props;
        addActions.ADD_DRAFT_LIST_FETCH({
            page: addList.page,
            pageSize: addList.pageSize,
            username: info.username
        });
    }

    tabChange (key) {
        const {addActions, addList, info} = this.props;
        if (key === 'draft') {
            this.setState({
                tab: 'draft'
            });
            addActions.ADD_DRAFT_LIST_FETCH({
                page: 1,
                pageSize: addList.pageSize,
                username: info.username
            });
        } else {
            this.setState({
                tab: 'publish'
            });
            addActions.ADD_PUBLISH_LIST_FETCH({
                page: 1,
                pageSize: addList.pageSize,
                username: info.username
            });
        }
    }

    render() {
        const {addActions, addList, info} = this.props;
        const addProps = {
            info,
            form: {},
            addActions,
            type: 'add'
        };
        const tabProps = {
            tabBarExtraContent: <EditAdd edit={addProps}/>,
            defaultActiveKey: 'draft',
            onChange: e => this.tabChange(e)
        };

        const draftProps = {
            addList,
            addActions,
            info
        };
        const publishTableProps = {
            addList,
            addActions,
            info
        };
        return (
            <div className="add-list-container">
                <Tabs {...tabProps}>
                    <TabPane tab={<span><Icon type="delete" />草稿箱</span>} key="draft">
                        <AddDraftTable {...draftProps} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="save" />已提交</span>} key="publish">
                        <AddPublishTable {...publishTableProps}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        info: state.info.toJS(),
        addList: state.addList.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addActions: bindActionCreators(add.creators, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Add);