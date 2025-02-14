

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
            email: '',
            password: '',
            name: '',
            address: ''

        }
    }

    componentDidMount() {
    }


    toggle = () => {
        this.props.toggleFormParent();
    }

    handleOnchangeInput = (event, id) => {
        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state ', this.state)
        // })

        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'name', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
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
                        onClick={() => { this.handleAddNewUser() }}>
                        Add new
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

