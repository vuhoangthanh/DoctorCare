import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link, withRouter } from 'react-router-dom';
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
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
        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login" >Login</div>
                        <div className="col-12 form-group login-input">
                            <label>UserName:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Enter your password"
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}><i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-6">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-6 register">
                            <Link to={"/register"} className="register-link">
                                <span>Register</span>
                            </Link>

                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor, token) => dispatch(actions.userLoginSuccess(userInfor, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
