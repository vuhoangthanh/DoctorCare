import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/userService';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import './clinic.scss'

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        let response = await getAllClinic();
        if (response && response.error === null) {
            this.setState({
                dataClinics: response.data ? response.data : []
            })
        }

    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let { dataClinics } = this.state;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><span className="highlight">Cơ sở y tế</span> nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className="section-customize clinic-child"
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}>
                                            <div
                                                className="bg-image section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}>
                                            </div>
                                            <div className="clinic-name">{item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
