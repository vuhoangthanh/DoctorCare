import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getClinicById } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;


            let response = await getClinicById({
                id: id
            });

            if (response && response.error === null) {
                let data = response.data
                let arrDoctorId = [];
                if (data && !_.isEmpty(response.data)) {
                    let arr = data.doctorInfos;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    setExpanded = (test) => {
        this.setState({
            expanded: test
        })
    }
    render() {
        let { language } = this.props;
        let { arrDoctorId, dataDetailClinic } = this.state;
        return (
            <div className="detail-clinic-container">
                <HomeHeader />
                <div className="link-navigation row">
                    <div className="col-12">
                        <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                        <Link className="custom-link-navigation" to={`/clinic`}>Cơ sở y tế/</Link>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <span>{dataDetailClinic.name}</span>
                        }
                    </div>
                </div>
                <div className="detail-clinic-body">
                    <div className="description-clinic">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div className="clinic-name">{dataDetailClinic.name}</div>
                                < div className={`content ${this.state.expanded ? "expanded" : ""}`} dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHtml }}>
                                </div>
                            </>
                        }
                        <span className="toggle-btn" onClick={() => this.setExpanded(!this.state.expanded)}>
                            {this.state.expanded ? "Thu gọn" : "Xem thêm..."}
                        </span>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
