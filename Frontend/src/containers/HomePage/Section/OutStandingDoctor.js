import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";
import * as action from '../../../store/actions'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            {language === 'vi' ? <><FormattedMessage id="home-page.outstanding-doctor" /><span className="highlight"><FormattedMessage id="home-page.skilled" /></span></>
                                : <><span className="highlight"><FormattedMessage id="home-page.skilled" /></span><FormattedMessage id="home-page.outstanding-doctor" /></>}

                        </span>
                        <span className="extra-info doctor"><FormattedMessage id="home-page.text-extra-doctor" /></span>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${item.avatar})` }}>
                                                    </div>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        <div className="btn-more">
                            <button className="btn-section"><FormattedMessage id="home-page.more-information" /><i class="fas fa-long-arrow-alt-right"></i></button>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(action.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
