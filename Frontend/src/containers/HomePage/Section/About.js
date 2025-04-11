import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";




class About extends Component {


    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Trải nghiệm đặt lịch khám bệnh tiện lợi
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <div className="video">
                            <iframe width="100%" height="330px"
                                className="it"
                                src="https://www.youtube.com/embed/5pG7iAAairk"
                                title="Hướng dẫn đặt lịch khám bệnh tại Bệnh viện Nhi Đồng Thành Phố"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullscreen>

                            </iframe>
                        </div>
                    </div>

                    <div className="content-right">
                        <h2 className="text-xl font-semibold mb-2 mt-2 text-first">Tại sao nên đặt lịch khám online?</h2>
                        <p className="text-base leading-relaxed">
                            Việc tích hợp hệ thống đặt lịch trực tuyến giúp người dùng tiết kiệm thời gian,
                            chủ động chọn lịch khám, và dễ dàng quản lý thông tin hồ sơ sức khỏe cá nhân.
                            Dễ sử dụng, nhanh chóng và bảo mật – đây là tiêu chí hàng đầu của chúng tôi.
                        </p>
                        <div className="text-third">
                            "Chúng tôi DoctorsCare vì sự đơn giản, dễ tích hợp, và đáp ứng đủ mọi nhu cầu."
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
