import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './Clinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Pagination from '../../System/Pagination/Pagination';
import { getAllClinic } from '../../../services/userService';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            size: 4,
            clinics: [],
            pageCount: 2
        }
    }
    async componentDidMount() {
        this.handleGetClinics({
            page: this.state.page,
            size: this.state.size
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async handleGetClinics(data) {
        let response = await getAllClinic({
            page: data.page,
            size: data.size
        })

        if (response && response.error === null) {
            this.setState({
                clinics: response.data.result,
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
            size: this.state.size
        });
    };

    render() {
        let { language } = this.props;
        let { clinics, pageCount } = this.state;
        console.log("sf", clinics, pageCount)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="clinic-container">
                    <div className="link-navigation row">
                        <div className="col-12">
                            <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                            <span>Cơ sở y tế</span>
                        </div>
                    </div>

                    <div className="clinic-body">
                        <div className="title-clinic">
                            <div className="title-clinic-up">Cơ sở y tế</div>
                            <div className="title-clinic-down">Tìm và đặt lịch tại các cơ sở y tế chất lượng cao trong hệ thống của chúng tôi</div>
                        </div>
                        <div className="container father-clinic">
                            <div className="row">
                                <div className="col-12 filter-clinic">
                                    <input type="text" placeholder="Nhập thông tin..." />
                                    <button >Tìm kiếm</button>
                                </div>
                            </div>
                            <div className="row list-clinic">
                                {clinics && clinics.length > 0 &&
                                    clinics.map((item, index) => {
                                        return (
                                            <div className="col-12 each-clinic" key={index}>
                                                <div className="col-3 image-clinic">
                                                    <div className="background-image" >
                                                        <div className="image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-5 info-clinic">
                                                    <div className="name-clinic">{item.name}</div>
                                                    <div className="address-clinic">{item.address}</div>
                                                </div>
                                                <div className="col-4 btn-booking">
                                                    <Link to={`/detail-clinic/${item.id}`}> <button>Đặt lịch ngay</button></Link>


                                                </div>
                                            </div>
                                        )
                                    })

                                }
                                <Pagination
                                    pageCount={pageCount}
                                    handlePageClick={this.handlePageClick} // Không cần arrow function
                                />
                            </div>
                        </div>
                    </div>

                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
