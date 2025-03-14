import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './Register.scss'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccount: false
        }
    }
    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    redirectAccount = (showAccount) => {
        this.setState({
            showAccount: !showAccount
        })
        console.log(this.state.showAccount)
    };

    render() {
        let { language } = this.props;
        return (
            <div className="register-background">
                <div className="register-container">
                    <div className={this.state.showAccount === true ? "register-content row account" : "register-content row"}>
                        <div className="col-12 text-register">Register</div>
                        <div className="col-6 form-group register-input">
                            <label>Nhập email</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập email" />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Nhập email</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập email" />
                        </div>

                    </div>
                    <div className={this.state.showAccount === false ? "register-content row info" : "register-content row"}>
                        <div className="col-12 text-register">Register</div>
                        <div className="col-6 form-group register-input">
                            <label>Họ</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập họ" />
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Tên</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên" />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Số điện thoại</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại" />
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Giới tính</label>
                            <select className="form-control">
                                <option>Nam</option>
                                <option>Nữ</option>
                            </select>
                        </div>
                        <div className="col-12 form-group register-input">
                            <label>Địa chỉ</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập địa chỉ" />
                        </div>
                        <div className="col-12 next">
                            <span className="text-login">Đăng nhập</span>
                            <span className="redirect" onClick={() => this.redirectAccount(this.state.showAccount)}>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
