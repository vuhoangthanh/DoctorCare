import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
import UserRedux from './UserRedux';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Pagination from '../Pagination/Pagination';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            page: 1,
            size: 10,
            pageCount: '',
            total: 0
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux({
            page: this.state.page,
            size: this.state.size
        });
        this.setState({
            pageCount: this.props.meta.pages
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
        if (prevProps.meta !== this.props.meta) {
            this.setState({
                pageCount: this.props.meta.pages
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

    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        this.props.currentPageChange(+event.selected + 1)
        this.props.fetchUserRedux({
            page: +event.selected + 1 ? +event.selected + 1 : this.state.page,
            size: this.state.size
        });
    };



    render() {
        let arrUsers = this.state.usersRedux
        let { pageCount } = this.state
        return (
            <React.Fragment>
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
                <div>
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={this.handlePageClick} // Không cần arrow function
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        meta: state.admin.meta,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: (data) => dispatch(actions.fetchAllUsersStart(data)),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
