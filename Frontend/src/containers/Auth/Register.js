import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import { register } from '../../services/userService'
import './Register.scss'
import logo from '../../assets/images/login_image.png';
import HomeHeader from '../HomePage/HomeHeader';

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

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnchangeSelect = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    redirectAccount = (showAccount) => {
        this.setState({
            showAccount: !showAccount
        })
    };

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
        let { password, email, address, phoneNumber, gender, firstName, lastName } = this.state
        return (
            <>
                <HomeHeader isShowBanner={false} />ss

                <div className="register-background">
                    <div className="register-container">
                        <div className="register-content">
                            <div className="login-left">
                                <h2>Doctors Care – Your Trusted Healthcare Companion.</h2>
                                <div className="login-illustration">
                                    <img src={logo} alt="Learning Illustration" />
                                </div>
                            </div>
                            <div className="register-right">
                                <div className="register-content row account" hidden={!this.state.showAccount}>
                                    <div className="col-12 text-register">Register</div>
                                    <div className="col-12 form-group register-input">
                                        <label>Email</label>
                                        <input type="text" placeholder="Enter your email" value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} />
                                    </div>
                                    <div className="col-12 form-group register-input">
                                        <label>Password</label>
                                        <input type="password" placeholder="Enter your password" value={password} onChange={(event) => { this.onChangeInput(event, 'password') }} />
                                    </div>
                                    <div className="col-12 next">
                                        <span className="redirect-info" onClick={() => this.redirectAccount(this.state.showAccount)}>
                                            <i className="fas fa-chevron-left"></i>
                                        </span>
                                        <button className="btn-register" onClick={() => this.handleRegister()}>Register</button>
                                    </div>
                                </div>

                                <div className="register-content row info" hidden={this.state.showAccount}>
                                    <div className="col-12 text-register">Register</div>
                                    <div className="col-6 form-group register-input">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Enter last name" value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                                    </div>

                                    <div className="col-6 form-group register-input">
                                        <label>First Name</label>
                                        <input type="text" placeholder="Enter first name" value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                    </div>
                                    <div className="col-6 form-group register-input">
                                        <label>Phone Number</label>
                                        <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                                    </div>

                                    <div className="col-6 form-group register-input">
                                        <label>Gender</label>
                                        <select value={gender} onChange={(event) => this.handleOnchangeSelect(event)}>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-12 form-group register-input">
                                        <label>Address</label>
                                        <input type="text" placeholder="Enter address" value={address} onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                    </div>
                                    <div className="col-12 next">
                                        <Link to={`/login`} className="text-login">
                                            Login
                                        </Link>
                                        <span className="redirect-account" onClick={() => this.redirectAccount(this.state.showAccount)}>
                                            <i className="fas fa-chevron-right"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};
export default withRouter(connect(mapStateToProps)(Register));