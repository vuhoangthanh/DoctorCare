import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './AllDoctor.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getClinicById, getAllDoctorService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import Pagination from '../../System/Pagination/Pagination';

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            size: 4,
            filter: '',
            doctors: [],
            pageCount: 2,

            arrDoctorId: []
        }
    }
    async componentDidMount() {
        this.handleGetClinics({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async handleGetClinics(data) {
        let response = await getAllDoctorService({
            page: data.page,
            size: data.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        })
        console.log(response)

        if (response && response.error === null) {
            let data = response.data.result
            let arrDoctorId = [];
            if (data && !_.isEmpty(response.data.result)) {
                let arr = data;
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.id)
                    })
                }
            }

            this.setState({
                arrDoctorId: arrDoctorId,
            })
            this.setState({
                doctors: response.data.result,
                pageCount: response.data.meta.pages
            })
        }
    }
    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        await this.handleGetClinics({
            page: +event.selected + 1 ? +event.selected + 1 : this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        });
    };
    render() {
        let { language } = this.props;
        let { doctors, pageCount, arrDoctorId } = this.state;
        return (
            <div className="all-doctor-container">
                <HomeHeader />

                <div className="banner-title">
                    <div className="link-navigation">
                        <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                        <span>Bác sĩ</span>
                    </div>
                    <div className="title-all-doctor">
                        <div className="title-clinic-up">Bác sĩ</div>
                        <div className="title-clinic-down">Tìm và đặt lịch với các bác sĩ có chuyên môn cao trong hệ thống của chúng tôi</div>
                    </div>
                </div>

                <div className="all-doctor-body">
                    <div className="col-12 filter-clinic">
                        <input type="text" placeholder="Nhập thông tin..." />
                        <button >Tìm kiếm</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
