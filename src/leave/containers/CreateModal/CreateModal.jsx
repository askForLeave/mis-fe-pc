import React, {Component} from 'react';
import {Modal, Button, Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import './CreateModal.less';

class CreateModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const modalProps = {

        };
        return (
            <Modal {...modalProps} />
        );
    }
}
export default CreateModal;
