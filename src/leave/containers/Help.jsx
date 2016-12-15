import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tabs from 'antd/lib/tabs';

const TabPane = Tabs.TabPane;

class Help extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {info} = this.props;
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span>{info.type['1'].name}</span>} key="1">
                    <div className="help-container">
                        <p>
                            {info.type['1'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['2'].name}</span>} key="2">
                    <div className="help-container">
                        <p>
                            {info.type['2'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['3'].name}</span>} key="3">
                    <div className="help-container">
                        <p>
                            {info.type['3'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['4'].name}</span>} key="4">
                    <div className="help-container">
                        <p>
                            {info.type['4'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['5'].name}</span>} key="5">
                    <div className="help-container">
                        <p>
                            {info.type['5'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['6'].name}</span>} key="6">
                    <div className="help-container">
                        <p>
                            {info.type['6'].description}
                        </p>
                    </div>
                </TabPane>
                <TabPane tab={<span>{info.type['7'].name}</span>} key="7">
                    <div className="help-container">
                        <p>
                            {info.type['7'].description}
                        </p>
                    </div>
                </TabPane>
            </Tabs>
        );
    }
}


function mapStateToProps(state) {
    return {
        info: state.info.toJS()
    };
}

export default connect(mapStateToProps)(Help);

