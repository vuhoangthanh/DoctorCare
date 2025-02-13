import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    state = {

    }

    async componentDidMount() {
        let response = await getAllUsers('');
        if (response && response.error === null) {
            this.setState({
                arrUsers: response.data.result
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    // life cycle
    // Run Component
    // 1. run construct -> init state
    // 2. Did MouseEvent(set state)
    // 3. Render (re-render)

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleUserModal}
                />
                <div className="title">Manage users with ThanhTjd</div>
                <div className="mx-1">
                    <button
                        class="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.name}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.address}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                                <button class="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                                <button class="btn-delete"><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
