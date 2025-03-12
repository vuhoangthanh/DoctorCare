import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/userService';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import './clinic.scss'
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],

            page: '',
            size: ''
        }
    }
    async componentDidMount() {
        let { page, size } = this.state
        let response = await getAllClinic({
            page: page,
            size: size
        });
        if (response && response.error === null) {
            this.setState({
                dataClinics: response.data && response.data.result ? response.data.result : []
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
        let { language } = this.props;
        return (
            <>
                <div className="curve-clinic">
                    <span>
                        <svg fill="#d8f4ff" class="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 145.1"><path d="M0 0v27.6l43.6 14.3c138.4 34.9 279 60.8 420.8 77.6 35.5 4.2 162.5 18.6 330.9 22.5 59.1 1.3 198.1 10.2 377.9-10.2 218.5-24.9 191-29.9 320.7-30.6 137-.8 304.9 14.7 345.2 18.4 33.9 3.1 61.9 6.1 81 8.2V0H0z"></path></svg>
                    </span>
                </div>
                <div className="section-share section-medical-facility">

                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section clinic">
                                {language === LANGUAGES.VI ?
                                    <><FormattedMessage id="home-page.clinic" /><span className="highlight"><FormattedMessage id="home-page.modern" /></span></>
                                    :
                                    <><span className="highlight"><FormattedMessage id="home-page.modern" /></span><FormattedMessage id="home-page.clinic" /></>}

                            </span>
                            <span className="extra-info clinic"><FormattedMessage id="home-page.text-extra-clinic" /></span>

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
                            <div className="btn-more1">
                                <Link className="custom-link" to={`/clinic`}> <span className="btn-section"><FormattedMessage id="home-page.more-information" /></span><i class="fas fa-long-arrow-alt-right"></i></Link>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
