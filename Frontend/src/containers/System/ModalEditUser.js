

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            name: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                name: user.name,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFormParent();
    }

    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            />
                        </div>

                        <div className="input-container">
                            <label>Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "name") }}
                                value={this.state.name}
                            />
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
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container">
                            <label>Avatar</label>
                            <input type="file" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleSaveUser() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

