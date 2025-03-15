import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './Register.scss'
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../services/userService'
import { toast } from "react-toastify";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccount: false,

            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: 'F',
            address: '',
            email: '',
            password: ''
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
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log("state", this.state)
    }
    handleOnchangeSelect = (event) => {
        this.setState({
            gender: event.target.value
        })
    }
    handleRegister = async () => {
        let response = await register({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phoneNumber,
            gender: this.state.gender,
            address: this.state.address,
        })
        if (response && response.error === null) {
            toast.success("Register success!");
            if (this.props.history) {
                this.props.history.push(`/login`)
            }
        } else {
            toast.error("Register error!");
        }
    }

    render() {
        let { language } = this.props;
        let { password, email, address, phoneNumber, gender, firstName, lastName } = this.state
        return (
            <div className="register-background">
                <div className="register-container">
                    <div className="register-content row account" hidden={!this.state.showAccount}>
                        <div className="col-12 text-register">Register</div>
                        <div className="col-12 form-group register-input">
                            <label>Nhập email</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }} />
                        </div>
                        <div className="col-12 form-group register-input">
                            <label>Nhập password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Nhập password"
                                value={password}
                                onChange={(event) => { this.onChangeInput(event, 'password') }} />
                        </div>
                        <div className="col-12 next">
                            <span className="redirect-info" onClick={() => this.redirectAccount(this.state.showAccount)}><i class="fas fa-chevron-left"></i></span>
                            <button className="btn-register" onClick={() => this.handleRegister()}>Đăng ký</button>
                        </div>

                    </div>
                    <div className="register-content row info" hidden={this.state.showAccount}>
                        <div className="col-12 text-register">Register</div>
                        <div className="col-6 form-group register-input">
                            <label>Họ</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập họ"
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Tên</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên"
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                        </div>
                        <div className="col-6 form-group register-input">
                            <label>Số điện thoại</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
                                value={phoneNumber}
                                onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Giới tính</label>
                            <select className="form-control"
                                onChange={(event) => this.handleOnchangeSelect(event)}>
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                            </select>
                        </div>
                        <div className="col-12 form-group register-input">
                            <label>Địa chỉ</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập địa chỉ"
                                value={address}
                                onChange={(event) => { this.onChangeInput(event, 'address') }} />
                        </div>
                        <div className="col-12 next">
                            <Link to={`/login`} className="menu-link" >
                                <span className="text-login">Đăng nhập</span>

                            </Link>
                            <span className="redirect-account" onClick={() => this.redirectAccount(this.state.showAccount)}>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        </div>

                    </div>
                </div>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
