import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import { putVerifyBookingAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            status: 0
        }
    }
    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get("doctorId")
            let response = await putVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })

            if (response && response.statusCode === 200) {
                this.setState({
                    statusVerify: true,
                    status: response.statusCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    status: response && response.statusCode ? response.statusCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { language } = this.props;
        let { statusVerify, status } = this.state;

        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>Loading data...</div>
                        :
                        <div>
                            {status === 200 ?
                                <div className="info-booking">
                                    Xác nhận lịch hẹn thành công !
                                </div>
                                :
                                <div className="info-booking">
                                    Lịch hẹn đã được xác nhận !
                                </div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
