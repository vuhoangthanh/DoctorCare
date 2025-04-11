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
import Footer from '../../HomePage/Footer';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            size: 4,
            filter: '',
            clinics: [],
            pageCount: 2,

            address: '',
            name: '',
            filterName: '',
            filterAddress: '',
        }
    }
    async componentDidMount() {
        this.handleGetClinics({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filterName,
            filterAddress: this.state.filterAddress
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async handleGetClinics(data) {
        let response = await getAllClinic({
            page: data.page,
            size: data.size,
            filterName: data.filterName,
            filterAddress: data.filterAddress
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
            size: this.state.size,
            filterName: this.state.filterName,
            filterAddress: this.state.filterAddress
        });
    };
    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });

    }

    handleSearchClinic = () => {
        this.setState({
            filterName: this.state.name,
            filterAddress: this.state.address,
            // filterPosition: this.state.selectedPosition
        }, async () => {
            await this.handleGetClinics({
                page: this.state.page,
                size: this.state.size,
                filterName: this.state.filterName,
                filterAddress: this.state.filterAddress
            });
        })
    }
    handleRefreshClinic = () => {
        this.setState({
            filterName: '',
            filterAddress: '',
            name: '',
            address: ''
        }, async () => {
            await this.handleGetClinics({
                page: this.state.page,
                size: this.state.size,
                filterName: this.state.filterName,
                filterAddress: this.state.filterAddress
            });
        })
    }
    render() {
        let { language } = this.props;
        let { clinics, pageCount } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="clinic-container">
                    <div className="clinic-body">
                        <div className="title-clinic">
                            <div className="banner-title">
                                <div className="link-navigation">
                                    <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                                    <span>Cơ sở y tế</span>
                                </div>
                                <div className="title-clinic">
                                    <div className="title-clinic-up">Cơ sở y tế</div>
                                    <div className="title-clinic-down">Tìm và đặt lịch tại các cơ sở y tế chất lượng cao trong hệ thống của chúng tôi</div>
                                </div>
                            </div>
                        </div>
                        <div className="container father-clinic">
                            <div className="row">
                                <div className="col-12 filter-clinic">
                                    <span>Địa chỉ</span>
                                    <input type="text" placeholder="Nhập thông tin..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                        value={this.state.address}
                                    />
                                    <span>Tên cơ sở y tế</span>
                                    <input type="text" placeholder="Nhập thông tin..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "name") }}
                                        value={this.state.name}
                                    />
                                    <button onClick={() => this.handleSearchClinic()}>Tìm kiếm</button>
                                    <button className="refresh-clinic" onClick={() => this.handleRefreshClinic()}>Làm mới</button>

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
                <Footer />
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
