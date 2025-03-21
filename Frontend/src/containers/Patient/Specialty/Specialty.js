import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getAllSpecialty } from '../../../services/userService';
import Pagination from '../../System/Pagination/Pagination';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            size: 4,
            filter: '',
            specialties: [],
            pageCount: 2,

            name: '',
            filterName: ''
        }
    }
    async componentDidMount() {
        this.handleGetSpecialties({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filterName

        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async handleGetSpecialties(data) {
        let response = await getAllSpecialty({
            page: data.page,
            size: data.size,
            filterName: data.filterName
        })

        if (response && response.error === null) {
            this.setState({
                specialties: response.data.result,
                pageCount: response.data.meta.pages
            })
        }
    }

    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        this.handleGetSpecialties({
            page: +event.selected + 1 ? +event.selected + 1 : this.state.page,
            size: this.state.size,
            filterName: this.state.filterName
        });
    };
    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });

    }

    handleSearchSpecialty = () => {
        this.setState({
            filterName: this.state.name,
        }, async () => {
            await this.handleGetSpecialties({
                page: this.state.page,
                size: this.state.size,
                filterName: this.state.filterName
            });
        })
    }
    handleRefreshSpecialty = () => {
        this.setState({
            filterName: '',
            name: ''
        }, async () => {
            await this.handleGetSpecialties({
                page: this.state.page,
                size: this.state.size,
                filterName: this.state.filterName
            });
        })
    }
    render() {
        let { language } = this.props;
        let { specialties, pageCount } = this.state;
        console.log("sf", specialties, pageCount)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="specialty-container">


                    <div className="specialty-body">
                        <div className="banner-title">
                            <div className="link-navigation">
                                <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                                <span>Chuyên khoa</span>
                            </div>
                            <div className="title-specialty">
                                <div className="title-specialty-up">Chuyên khoa</div>
                                <div className="title-specialty-down">Tìm và đặt lịch tại các chuyên khoa chất lượng cao trong hệ thống của chúng tôi</div>
                            </div>
                        </div>
                        <div className="container father-specialty">
                            <div className="row">
                                <div className="col-12 filter-specialty">
                                    <input type="text" placeholder="Nhập thông tin..."
                                        onChange={(event) => { this.handleOnchangeInput(event, "name") }}
                                        value={this.state.name} />
                                    <button onClick={() => this.handleSearchSpecialty()}>Tìm kiếm</button>
                                    <button className="refresh-specialty" onClick={() => this.handleRefreshSpecialty()}>Làm mới</button>
                                </div>
                            </div>
                            <div className="row list-specialty">
                                {specialties && specialties.length > 0 &&
                                    specialties.map((item, index) => {
                                        return (
                                            <div className="col-12 each-specialty" key={index}>
                                                <div className="col-3 image-specialty">
                                                    <div className="background-image" >
                                                        <div className="image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-5 info-specialty">
                                                    <div className="name-specialty">{item.name}</div>
                                                    <div className="description-specialty" dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}>{item.address}</div>
                                                </div>
                                                <div className="col-4 btn-booking">
                                                    <Link to={`/detail-specialty/${item.id}`}> <button>Đặt lịch ngay</button></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
