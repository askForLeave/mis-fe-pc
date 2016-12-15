import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Add extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="leave-add-list">
                TODO
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        info: state.info.toJS()
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(mapStateToProps)(Add);