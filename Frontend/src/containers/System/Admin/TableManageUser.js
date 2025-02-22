import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
import UserRedux from './UserRedux';


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })

        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser = (user) => {
        console.log('check edit', user)
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let arrUsers = this.state.usersRedux
        return (
            <table id="tableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.address}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditUser(item)}
                                            className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => { this.handleDeleteUser(item) }}
                                            className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
