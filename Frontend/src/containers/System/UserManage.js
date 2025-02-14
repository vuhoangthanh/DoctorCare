import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService';
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
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
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

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log("hello", response)
            if (response && response.error !== null) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    // life cycle
    // Run Component
    // 1. run construct -> init state
    // 2. Did MouseEvent(set state)
    // 3. Render (re-render)

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title">Manage users with ThanhTjd</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.name}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.address}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
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
