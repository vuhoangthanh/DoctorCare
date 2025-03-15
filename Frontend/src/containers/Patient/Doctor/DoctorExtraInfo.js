import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { getExtraInfoDoctorById } from '../../../services/userService'
import { LANGUAGES } from "../../../utils"
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let response = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (response && response.error === null) {
                this.setState({
                    extraInfo: response.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let response = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (response && response.error === null) {
                this.setState({
                    extraInfo: response.data
                })
            }
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { language } = this.props;
        let { isShowDetailInfo, extraInfo } = this.state;

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className="address">{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                </div>
                <div className="content-down">



                    {isShowDetailInfo === false ?
                        <div className="short-info">
                            <span className="title-price"><FormattedMessage id="patient.extra-info-doctor.price" /></span>
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className="currency"
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />
                            }
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className="currency"
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }
                            <span className="detail" onClick={() => this.showHideDetailInfo(true)}>
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </div>
                        :
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                        }
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>

                            <div className="payment">
                                <FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfo.paymentTypeData.valueVi : ''
                                }
                                {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfo.paymentTypeData.valueEn : ''
                                }
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />

                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
