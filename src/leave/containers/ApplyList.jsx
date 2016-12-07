import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import applyList from '../reducers/applyList.js';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';

const TabPane = Tabs.TabPane;

class ApplyList extends Component {
    constructor(props) {
        super(props);
    }
    render() {


        return (
            <div className="apply-list-container">
                <Tabs defaultActiveKey="draft">
                    <TabPane tab={<span><Icon type="delete" />草稿箱</span>} key="draft">
                        Tab 1
                    </TabPane>
                    <TabPane tab={<span><Icon type="save" />已提交</span>} key="publish">
                        Tab 2
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        applyList: state.applyList.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        applyActions: bindActionCreators(applyList.creators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyList);