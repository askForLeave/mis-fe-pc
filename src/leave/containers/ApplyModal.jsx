import React, {Component} from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

class ApplyModal extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    render() {
        const modalProps = {

        };
        return (
            <div className="apply-modal">
                <Modal>

                </Modal>
            </div>
        );
    }
}

function mapPropsToField(props) {
    return props;
}
ApplyModal = Form.create({mapPropsToFields})(ApplyModal);

export default ApplyModal;