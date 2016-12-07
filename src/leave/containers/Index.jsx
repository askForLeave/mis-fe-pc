import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import info from '../reducers/info.js';
import Card from 'antd/lib/card';
import Calendar from 'antd/lib/calendar';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Progress from 'antd/lib/progress';
import moment from 'moment';
class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: 'yangmutong',
            loading: true
        };
    }
    componentWillMount() {
        this.props.infoActions.USER_INFO_FETCH(this.state.username);
        this.setState({
            loading: false
        });
    }

    dateCellRender(value) {
        const {info} = this.props;
        if (moment().isSame(value, 'day')) {
            return (
                <ul className="events">
                    <li>
                        <span className="event-warning">●</span>
                        剩余年假： {info.annualLeft}
                    </li>
                    <li>
                        <span className="event-info">●</span>
                        总计年假： {info.annualTotal}
                    </li>
                    <li>
                        <span className="event-danger">●</span>
                        已用年假： {info.annualTotal - info.annualLeft}
                    </li>
                </ul>
            );
        } else {
            return '';
        }

    }

    render () {
        const {info} = this.props;
        const cardProps = {
            loading: this.state.loading,
            title: '个人信息'
        };
        const dateCellRender = value => this.dateCellRender(value);
        const calendarProps = {
            defaultValue: moment().locale('zh-cn'),
            dateCellRender: dateCellRender
        };
        const progressProps = {
            type: 'circle',
            percent: (info.annualLeft / info.annualTotal) * 100,
            format: () => {
                return '剩余' + info.annualLeft + '天';
            },
            status: 'active'
        };
        return (
            <div className="info-container">
                <header className="info-title">
                    <h3>欢迎使用请假系统</h3>
                </header>
                <main className="info-main">
                    <Card {...cardProps} style={{width: 540}}>
                        <Row gutter={32}>
                            <Col lg={12} md={12} sm={24}>
                                <ul>
                                    <li>姓名：{info.name}</li>
                                    <li>部门：{info.department}</li>
                                    <li>部门主管：{info.manager}</li>
                                    <li>剩余带薪年假: {info.annualLeft}</li>
                                    <li>总计带薪年假：{info.annualTotal}</li>
                                </ul>
                            </Col>
                            <Col lg={12} md={12} sm={24}>
                                <Progress {...progressProps} width={100} />
                            </Col>
                        </Row>
                    </Card>
                    <Calendar className="info-calendar" {...calendarProps}>

                    </Calendar>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        info: state.info.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {
        infoActions: bindActionCreators(info.creators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);