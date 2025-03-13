import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService, getAllUsersPage } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination/Pagination';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},

            page: 1,
            size: 5,
            pageCount: '',
            total: 0
        }
    }


    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async (page1) => {
        let response = await getAllUsersPage({
            page: page1 ? page1 : this.state.page,
            size: this.state.size
        });
        if (response && response.error === null) {
            this.setState({
                arrUsers: response.data.result,
                pageCount: response.data.meta.pages,
                total: response.data.meta.total
            })
        }
    }
    handleAddNewUser = () => {
        console.log("hello", this.state)
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.error !== null) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.error !== null) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.error !== null) {
                alert(response.error)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
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

    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        await this.getAllUsersFromReact(+event.selected + 1)
    };

    render() {
        let arrUsers = this.state.arrUsers;
        let { pageCount, total } = this.state;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFormParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title">Manage users with ThanhTjd</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-5 mx-1">
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Fist name</th>
                                <th>Last name</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.address}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                {pageCount > 0 &&
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={this.handlePageClick} // Không cần arrow function
                    />
                }
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
