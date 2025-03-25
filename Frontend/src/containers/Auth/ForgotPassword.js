import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './ForgotPassword.scss'
import { Link, withRouter } from 'react-router-dom';
import { sendCodeForgotPassword, postForgotPassword } from '../../services/userService'
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: false,
            password: '',
            email: '',
            repeatPassword: '',
            code: '',

            isShowLoading: false
        }
    }
    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
        console.log("ll", this.state)
    }

    handleSendEmail = async () => {
        this.setState({
            isShowLoading: true
        })

        if (this.checkValid()) {

            let response = await sendCodeForgotPassword({
                email: this.state.email
            })
            if (response && response.error === null) {
                this.setState({
                    otp: true,
                    isShowLoading: false
                })
            }
        }
    }

    handleChangePassword = async () => {
        let response = await postForgotPassword({
            email: this.state.email,
            password: this.state.password,
            code: this.state.code
        })
        if (response && response.error === null) {
            toast.success("Change password success!");
            if (this.props.history) {
                this.props.history.push(`/login`)
            }
        } else {
            toast.error("Change password error!");
        }
    }


    checkValid = () => {
        let { email, password, repeatPassword, code } = this.state;
        if (password !== repeatPassword) {
            this.setState({
                errMessage: "Vui lòng nhập mật khẩu giống nhau!"
            })
            return false;
        }
        return true;
    }
    render() {
        let { language } = this.props;
        let { otp } = this.state;

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content">
                            <div className="login-left">
                                <h2>Doctores Care – Your Trusted Healthcare Companion.</h2>
                                <div className="login-illustration">
                                    <img src="/api/placeholder/400/320" alt="Learning Illustration" />
                                </div>
                            </div>
                            <div className="login-right">
                                <h3>Login</h3>
                                <div className="login-form">
                                    <div className="form-group">
                                        <label>UserName:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your username"
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <div className="password-input">
                                            <input
                                                type={this.state.isShowPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={this.state.password}
                                                onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                            />
                                            <span onClick={() => { this.handleShowHidePassword() }}>
                                                <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Repeat Password:</label>
                                        <div className="password-input">
                                            <input
                                                type={this.state.isShowPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={this.state.repeatPassword}
                                                onChange={(event) => this.handleOnchangeInput(event, 'repeatPassword')}
                                            />
                                            <span onClick={() => { this.handleShowHidePassword() }}>
                                                <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    {otp === true ?
                                        <div>
                                            <div className="form-group">
                                                <label>OTP:</label>
                                                <div className="password-input">
                                                    <input
                                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                                        placeholder="Enter your password"
                                                        value={this.state.code}
                                                        onChange={(event) => { this.handleOnchangeInput(event, 'code') }}
                                                    />
                                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                                        <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                                    </span>
                                                </div>
                                            </div>

                                            {this.state.errMessage && (
                                                <div className="error-message">
                                                    {this.state.errMessage}
                                                </div>
                                            )}
                                            <button className="btn-login" onClick={() => { this.handleChangePassword() }}>Save change</button>
                                        </div>
                                        :
                                        <>
                                            {this.state.errMessage && (
                                                <div className="error-message">
                                                    {this.state.errMessage}
                                                </div>
                                            )}
                                            <button className="btn-login" onClick={() => { this.handleSendEmail() }}>Confirm</button>
                                        </>
                                    }



                                    {/* <div className="social-login">
                                    <span>Or Login with:</span>
                                    <div className="social-icons">
                                        <i className="fab fa-google"></i>
                                        <i className="fab fa-facebook-f"></i>
                                        <i className="fab fa-instagram"></i>
                                        <i className="fab fa-twitter"></i>
                                        <i className="fab fa-linkedin-in"></i>
                                    </div>
                                </div> */}

                                    <div className="register-link">
                                        Don't have an account?
                                        <Link to="/register"> Sign up</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
