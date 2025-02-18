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
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/oJnhtosaPlA" title="Vietsub || Hiểu Ta - Nga Lâu (OST Kiếm Lai)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div className="content-right">
                        <p>hêllroeo</p>
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
