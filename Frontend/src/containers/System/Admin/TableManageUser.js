import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
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
                    <tr >
                        <td>{'item.email'}</td>
                        <td>{'item.name'}</td>
                        <td>{'item.gender'}</td>
                        <td>{'item.address'}</td>
                        <td>{'item.createdAt'}</td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
