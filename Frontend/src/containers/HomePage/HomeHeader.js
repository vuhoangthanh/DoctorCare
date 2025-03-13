import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils"
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <span className="header-logo">
                                <svg width="200" height="70" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
                                    <text x="10" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#36A9E1">Doctors</text>
                                    <text x="160" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#2D3E50">care</text>
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
                            <div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={(event) => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={(event) => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner == true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm kiếm ..." />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-flask"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="curve-header-parent">
                            <svg fill="white" className="curve-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 256.3"><path d="M1920 0c-89.9 15.9-179 36.3-266.9 61.3-69.9 19.9-85.6 27.5-216.5 67.4-117.9 35.9-176.9 53.9-228.8 65.4-35.1 7.8-138.8 29.4-275.7 34.7-188.7 7.4-331.4-20.3-371.8-28.6-90.5-18.7-153.6-40.7-253.3-75.6C179.2 79.9 74.9 34.8 0 0v256.3h1920V0z"></path></svg>
                        </div>

                    </div>
                }

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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
