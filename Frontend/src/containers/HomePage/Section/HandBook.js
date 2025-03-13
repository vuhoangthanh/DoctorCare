import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";




class HandBook extends Component {


    render() {

        return (
            <>
                <div className="curve-handbook">
                    <svg className="review-article--shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1919 354"><g data-name="lay-2"><path d="M1919 0H0v354a1159 1159 0 01312-107c100.46-19 174.31-18.87 307-18 56.07.37 143.31 2.3 469 31 115.32 10.16 230.93 17.34 346 30 31.46 3.46 158.44 17.63 322 11 112.61-4.56 143.25-15 163-32.25z" fill="#fff" data-name="lay-1"></path></g></svg>                </div>
                <div className="section-share section-handbook">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cẩm nang <span className="highlight">phổ biến</span></span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 2</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 3</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 4</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 5</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cẩm nang 6</div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
