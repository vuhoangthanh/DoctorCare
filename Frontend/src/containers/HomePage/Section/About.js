import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";




class About extends Component {


    render() {

        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Channel ThanhTjd học ReactJs
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <div className="video">
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/oJnhtosaPlA"
                                title="Vietsub || Hiểu Ta - Nga Lâu (OST Kiếm Lai)"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                    <div className="content-right">
                        <p>
                            “The fact that SimplyBook.me was HIPAA compliant—which is an absolute must-have as a medical practice—as well as reasonably priced, easy to use, infinitely customizable, had a feature for seemingly every need, and was easy to integrate into our website was what sold us on SimplyBook.me,” states Jared.
                        </p>
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
