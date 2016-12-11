import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import reviewList from '../reducers/reviewList.js';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import TodoTable from '../components/TodoTable.jsx';
import DoneTable from '../components/DoneTable.jsx';

const TabPane = Tabs.TabPane;

class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'todo'
        };
    }

    tabChange (key) {
        const {reviewActions, info, reviewList} = this.props;
        if (key === 'todo') {
            this.setState({
                tab: 'todo'
            });
            reviewActions.REVIEW_TODO_LIST_FETCH({
                page: 1,
                pageSize: reviewList.pageSize,
                username: info.username
            });
        } else {
            this.setState({
                tab: 'done'
            });
            reviewActions.REVIEW_DONE_LIST_FETCH({
                page: 1,
                pageSize: reviewList.pageSize,
                username: info.username
            });
        }
    }
    render() {
        const {reviewActions, info, reviewList} = this.props;
        const tabProps = {
            defaultActiveKey: 'todo',
            onChange: e => this.tabChange(e)
        };

        const todoProps = {
            info,
            reviewList,
            reviewActions
        };
        const doneProps = {
            info,
            reviewList,
            reviewActions
        };
        return (
            <div className="review-list-container">
                <Tabs {...tabProps}>
                    <TabPane tab={<span><Icon type="delete" />未审核</span>} key="todo">
                        <TodoTable {...todoProps} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="save" />已审核</span>} key="done">
                        <DoneTable {...doneProps} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        const {reviewActions, reviewList, info} = this.props;
        reviewActions.REVIEW_TODO_LIST_FETCH({
            page: reviewList.page,
            pageSize: reviewList.pageSize,
            username: info.username
        });
    }

}

function mapStateToProps(state) {
    return {
        reviewList: state.reviewList.toJS(),
        info: state.info.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        reviewActions: bindActionCreators(reviewList.creators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);