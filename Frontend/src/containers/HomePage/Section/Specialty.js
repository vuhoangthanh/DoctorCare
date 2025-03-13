import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],

            page: '',
            size: ''
        }
    }
    async componentDidMount() {
        let { page, size } = this.state

        let response = await getAllSpecialty({
            page: page,
            size: size
        });
        if (response && response.error === null) {
            this.setState({
                dataSpecialty: response.data.result ? response.data.result : []
            })
        } else {

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }


    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="home-page.examination" /><span className="highlight"><FormattedMessage id="home-page.specialty" /></span><FormattedMessage id="home-page.from" /></span>
                        {/* <Link className="custom-link" to={`/specialty`}><button className="btn-section"><FormattedMessage id="home-page.more-information" /></button></Link> */}
                        <span className="extra-info"><FormattedMessage id="home-page.text-extra-specialty" /></span>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize specialty-child"
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className="bg-image section-specialty" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className="specialty-name">{item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                        <div className="btn-more">
                            <Link className="custom-link" to={`/specialty`}><button className="btn-section"><FormattedMessage id="home-page.more-information" /><i className="fas fa-long-arrow-alt-right"></i></button></Link>
                        </div>
                    </div>

                </div>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
