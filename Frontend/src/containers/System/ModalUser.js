

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }


    toggle = () => {
        this.props.toggleFormParent();
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <label>Name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Phone</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Age</label>
                            <input type="date" />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select>
                                <option>MALE</option>
                                <option>FEMALE</option>
                            </select>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Avatar</label>
                            <input type="file" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.toggle() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

