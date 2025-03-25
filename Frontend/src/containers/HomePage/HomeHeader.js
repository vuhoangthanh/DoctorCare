import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils"
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reloadKey: 0,
        };
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("before", this.props)
        console.log("1", prevProps.isLoggedIn)
        console.log("2", this.props.isLoggedIn)
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            console.log("after", this.props)
            this.setState({
                reloadKey: this.state.reloadKey + 1,
            })
        }
    }

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    handleScroll = () => {
        if (window.scrollY > 300) {
            this.setState({ visible: true });
        } else {
            this.setState({ visible: false });
        }
    };

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    handleLogout = () => {
        this.props.processLogout();
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }
    render() {
        let { processLogout, language } = this.props;
        console.log("fds1", this.props)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <span className="header-logo" onClick={() => this.returnToHome()}>
                                <svg width="200" height="70" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
                                    <text x="10" y="50" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#36A9E1">Doctors</text>
                                    <text x="160" y="50" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#2D3E50">care</text>
                                </svg>
                            </span>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                    <div className="subs-title"><FormattedMessage id="home-header.search-doctor" /></div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                    <div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                    <div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                    <div className="subs-title"><FormattedMessage id="home-header.check-health" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">{this.props.isLoggedIn === "false" ?
                                <> <Link to={`/login`} className="link-login-header" >Login </Link>  <button > <Link to={`/register`} className="link-register-header" >Đăng ký  </Link></button></>
                                :
                                <><button onClick={() => this.handleLogout()}>LogOut</button></>}
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={(event) => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={(event) => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner == true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="text-banner">
                                <h1 className="h1-text">
                                    <span>Online <br />
                                        Booking system for
                                    </span>
                                    <span className="devider"> Medical Clinics</span>
                                </h1>
                            </div>
                            <div className="btn-register-banner">
                                <Link to={`/all-doctor`} className="menu-link" >
                                    <button><i class="fas fa-calendar-alt"></i><span>Đặt lịch ngay</span></button>
                                </Link>

                            </div>
                        </div>

                        <div className="curve-header-parent">
                            <svg fill="white" className="curve-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 256.3"><path d="M1920 0c-89.9 15.9-179 36.3-266.9 61.3-69.9 19.9-85.6 27.5-216.5 67.4-117.9 35.9-176.9 53.9-228.8 65.4-35.1 7.8-138.8 29.4-275.7 34.7-188.7 7.4-331.4-20.3-371.8-28.6-90.5-18.7-153.6-40.7-253.3-75.6C179.2 79.9 74.9 34.8 0 0v256.3h1920V0z"></path></svg>
                        </div>

                    </div>
                }
                <button
                    className="back-to-top show"
                    // className={`back-to-top ${this.state.visible ? "show" : ""}`}
                    onClick={this.scrollToTop}
                >
                    <i class="fas fa-chevron-up"></i>
                </button>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire 1 action của redux(action name changeLanguageApp)
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
