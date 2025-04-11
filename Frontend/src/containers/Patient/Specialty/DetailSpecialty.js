import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialty, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import Footer from '../../HomePage/Footer';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            expanded: false
        }
    }
    async componentDidMount() {

        // if (!this.state.dataDetailSpecialty || _.isEmpty(!this.state.dataDetailSpecialty)) return null;


        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;


            let response = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            });

            let responseProvince = await getAllCodeService('PROVINCE');

            if (response && response.error === null && responseProvince.error === null) {
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

                let dataProvince = responseProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    dataDetailSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : ''
                })
            }
        }
    }

    setExpanded = (test) => {
        this.setState({
            expanded: test
        })
    }

    getDataDetailSPecialty = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value

            let response = await getDetailSpecialty({
                id: id,
                location: location
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
                    dataDetailSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    handleOnchangeSelect = (event) => {
        this.getDataDetailSPecialty(event);
    }
    render() {
        let { language } = this.props;
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        console.log(dataDetailSpecialty)
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="link-navigation row">
                    <div className="col-12">
                        <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                        <Link className="custom-link-navigation" to={`/specialty`}>Chuyên khoa/</Link>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <span>{dataDetailSpecialty.name}</span>
                        }</div>
                </div>
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            < div className={`content ${this.state.expanded ? "expanded" : ""}`} dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHtml }}>
                            </div>
                        }
                        <span className="toggle-btn" onClick={() => this.setExpanded(!this.state.expanded)}>
                            {this.state.expanded ? "Thu gọn" : "Xem thêm..."}
                        </span>
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}
                        </select>
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
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
