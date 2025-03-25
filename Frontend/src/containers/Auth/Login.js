import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link, withRouter } from 'react-router-dom';
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.statusCode > 200) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.statusCode === 200) {
                this.props.userLoginSuccess(data.data.user, data.data)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
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
                                        value={this.state.username}
                                        onChange={(event) => this.handleOnChangeUsername(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <div className="password-input">
                                        <input
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={this.state.password}
                                            onChange={(event) => { this.handleOnChangePassword(event) }}
                                            onKeyDown={(event) => this.handleKeyDown(event)}
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

                                <div className="forgot-password">
                                    <Link to="/forgot-password"><span>Forgot your password?</span></Link>
                                </div>

                                <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>

                                <div className="social-login">
                                    <span>Or Login with:</span>
                                    <div className="social-icons">
                                        <i className="fab fa-google"></i>
                                        <i className="fab fa-facebook-f"></i>
                                        <i className="fab fa-instagram"></i>
                                        <i className="fab fa-twitter"></i>
                                        <i className="fab fa-linkedin-in"></i>
                                    </div>
                                </div>

                                <div className="register-link">
                                    Don't have an account?
                                    <Link to="/register"> Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor, token) => dispatch(actions.userLoginSuccess(userInfor, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);