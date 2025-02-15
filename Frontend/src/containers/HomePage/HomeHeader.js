import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg'

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <div><b>Chuyên khoa</b></div>
                                    <div className="subs-titletitle">Tìm bác sĩ theo chuyên khoa</div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b>Cơ sở y tế</b></div>
                                    <div className="subs-titletitle">Chọn bệnh viên phòng khám</div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b>Bác sĩ</b></div>
                                    <div className="subs-titletitle">Chọn bác sĩ giỏi</div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <div><b>Gói khám</b></div>
                                    <div className="subs-titletitle">Khám sức khỏe tổng quát</div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i> Hỗ trợ</div>
                            <div className="language-vn">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm ..." />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child">Khám Chuyên Khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child">Khám Từ Xa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child">Khám Tổng Quát</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-flask"></i></div>
                                <div className="text-child">Khám Xét Nghiệm Y HọcHọc</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                <div className="text-child">Khám Sức Khỏe Tinh Thần</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                                <div className="text-child">Khám Nha Khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
