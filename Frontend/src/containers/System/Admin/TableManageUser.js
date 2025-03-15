import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
import UserRedux from './UserRedux';
import moment from 'moment';

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

    handleDeleteUser = (user, page, size) => {

        this.props.deleteAUserRedux(user.id, page, size);
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
        let { page, size } = this.props
        return (
            <React.Fragment>
                <table id="tableManageUser" className="table table-bordered table-hover  table-rounded">
                    <thead className="table-light">
                        <tr>
                            <th className="first">Stt</th>
                            <th>Email</th>
                            <th><FormattedMessage id="manage-user.first-name" /></th>
                            <th><FormattedMessage id="manage-user.last-name" /></th>
                            <th><FormattedMessage id="manage-user.gender" /></th>
                            <th><FormattedMessage id="manage-user.address" /></th>
                            <th><FormattedMessage id="manage-user.created-at" /></th>
                            <th><FormattedMessage id="manage-user.action" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td className="first">{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.address}</td>
                                        <td>{moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => { this.handleDeleteUser(item, page, size) }}
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
        deleteAUserRedux: (id, page, size) => dispatch(actions.deleteAUser(id, page, size))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
