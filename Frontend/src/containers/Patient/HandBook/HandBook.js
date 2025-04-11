import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import "./HandBook.scss"
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllHandBook } from '../../../services/userService'
import { filter } from 'lodash';
import { Link } from 'react-router-dom';
import Pagination from '../../System/Pagination/Pagination';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { withRouter } from 'react-router';
import Footer from '../../HomePage/Footer';

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '1',
            size: '10',
            filter: '',
            filterSpecialty: '',
            filterTitle: '',
            pageCount: '',
            listSpecialty: [],
            selectedSpecialty: '',
            handBook: [],
        }
    }
    async componentDidMount() {
        this.props.getRequiredDoctorInfo({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        });
        this.handleCallData();
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { responseSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectSpecialty = this.buildDataInputSelect(responseSpecialty, 'SPECIALTY')


            this.setState({
                listSpecialty: dataSelectSpecialty,
            })
        }

    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelectSpecialty = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {}

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;

    }
    handleCallData = async () => {
        let response = await getAllHandBook({
            page: this.state.page,
            size: this.state.size,
            filterTitle: this.state.filterTitle,
            filterSpecialty: this.state.filterSpecialty
        })

        if (response && response.error === null) {
            this.setState({
                handBook: response.data.result,
                pageCount: response.data.meta.pages
            })
        }

    }
    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1,
        }, () => {
            this.handleCallData();
        })

    };
    handleSearch = () => {
        this.setState({
            filterSpecialty: this.state.selectedSpecialty.label
        }, () => {
            this.handleCallData();
        })
    }
    handleRefresh = () => {
        this.setState({
            filterSpecialty: '',
            filterTitle: '',
            selectedSpecialty: ''
        }, () => {
            this.handleCallData();
        })
    }
    handleSearch = () => {
        this.setState({
            filterSpecialty: this.state.selectedSpecialty.label
        }, () => {
            this.handleCallData();
        })
    }

    handleOnClickHandBook = (handBook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handBook.id}`)
        }
    }
    render() {
        let { language } = this.props;
        let { handBook, pageCount, listSpecialty } = this.state;
        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                minHeight: "35px",
                height: "35px",
                borderRadius: "7px",
                border: state.isFocused ? "1px soli #6366f1" : "1px solid #dee2e6",
                boxShadow: state.isFocused ? "0 0 5px rgba(34, 102, 170, 0.5)" : "none",
                transition: "0.3s",
                outLine: "none",
                "&:hover": {
                    border: "2px solid #6366f1",

                },
            }),
            valueContainer: (provided) => ({
                ...provided,
                height: "32px",
                padding: "0 5px",
            }),
            input: (provided) => ({
                ...provided,
                margin: "0px",
            }),
            indicatorsContainer: (provided) => ({
                ...provided,
                height: "32px",
            }),
            menu: (provided) => ({
                ...provided,
                fontSize: "14px",  // Cỡ chữ trong dropdown
                backgroundColor: "#fff",
            }),
            option: (provided, state) => ({
                ...provided,
                fontSize: "14px", // Cỡ chữ
                color: state.isSelected ? "#ffffff" : "#333333", // Màu chữ
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: state.isSelected ? "#06adef" : "#ffffff", // Màu nền

                "&:hover": {
                    backgroundColor: "#06adef",
                    color: "white"
                },
                singleValue: (provided) => ({
                    ...provided,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "14px",  // Cỡ chữ của giá trị đã chọn
                    textIndent: "5px", // Màu chữ của giá trị đã chọn
                }),
            }),
        };
        console.log("state", this.state)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="link-navigation">
                    <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                    <span>Cẩm nang</span>
                </div>
                <div className="container mt-4 all-handbook-container">
                    <div className="row ">
                        <div className="col-12 line-filter">
                            <div>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectSpecialty}
                                    options={listSpecialty}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    name="selectedSpecialty"
                                    className="select-specialty"
                                    styles={customStyles}
                                />
                            </div>
                            <div>
                                <input
                                    value={this.state.filterTitle}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterTitle')}
                                    type="text"
                                    placeholder="Nhập thông tin tìm kiếm..." />
                            </div>
                            <div>
                                <button onClick={() => this.handleSearch()}>Tìm kiếm</button>
                            </div>
                            <div>
                                <button className="refresh"
                                    onClick={() => this.handleRefresh()}>Làm lại
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {handBook && handBook.length > 0 && (
                            <>

                                <div className="col-md-7 mb-4 handbook-first">
                                    <div className="card shadow-sm"
                                        onClick={() => this.handleOnClickHandBook(handBook[0])}>
                                        <div
                                            className="card-img-top first"
                                            style={{ backgroundImage: `url(${handBook[0].thumbnail})` }}
                                        ></div>
                                        <div className="card-body">
                                            <span className="name-specialty">{handBook[0].specialtyData.name}</span>
                                            <h5 className="card-title">{handBook[0].title}</h5>
                                            <span className="author"><span>Ngày đăng:</span> {moment(handBook[0].createdAt).format('DD/MM/YYYY - HH:mm:ss')} <br /><span>Tác giả:</span> {handBook[0].createdBy}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-5 d-flex flex-column ">
                                    {handBook.slice(1, 3).map((item) => (
                                        <div key={item.id} className="mb-3 parent-handbook">
                                            <div className="card shadow-sm handbook-right" onClick={() => this.handleOnClickHandBook(item)}>
                                                <div className="card-body second">
                                                    <span className="name-specialty">{item.specialtyData.name}</span>
                                                    <h5 className="card-title h6">{item.title}</h5>
                                                    <span className="author"><span>Ngày đăng:</span> {moment(item.createdAt).format('DD/MM/YYYY - HH:mm:ss')} <br /><span>Tác giả:</span> {item.createdBy}</span>
                                                </div>
                                                <div
                                                    className="card-img-top second"
                                                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                                                >
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div className="row mt-3">
                                    {handBook.slice(3).map((item) => (
                                        <div key={item.id} className="col-md-3 mb-3 ">
                                            <div className="card shadow-sm under" onClick={() => this.handleOnClickHandBook(item)}>
                                                <div
                                                    className="card-img-top thirst"
                                                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                                                ></div>
                                                <div className="card-body">
                                                    <span className="name-specialty">{item.specialtyData.name}</span>
                                                    <h5 className="card-title under">{item.title}</h5>
                                                    <span className="author"><span>Ngày đăng:</span> {moment(item.createdAt).format('DD/MM/YYYY - HH:mm:ss')} <br /><span>Tác giả:</span>  {item.createdBy}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={this.handlePageClick} // Không cần arrow function
                    />
                </div >

                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfo: (data) => dispatch(actions.getRequiredDoctorInfo(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
