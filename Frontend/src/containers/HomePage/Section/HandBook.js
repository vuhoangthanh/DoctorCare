import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { getAllHandBook } from '../../../services/userService'
import moment from 'moment'
import { withRouter } from 'react-router';

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handBook: [],
        }
    }

    async componentDidMount() {
        this.handleCallData();
    }

    handleCallData = async () => {
        let response = await getAllHandBook({
            page: '',
            size: '',
            filterTitle: '',
            filterSpecialty: ''
        })

        if (response && response.error === null) {
            this.setState({
                handBook: response.data.result,
            })
        }

    }

    handleViewDetailHandBook = (handbook) => {
        console.log("helf", handbook)
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }
    render() {
        let { handBook } = this.state;
        console.log("hel", this.state.handBook)
        return (
            <>
                <div className="curve-handbook">
                    <svg className="review-article--shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1919 354"><g data-name="lay-2"><path d="M1919 0H0v354a1159 1159 0 01312-107c100.46-19 174.31-18.87 307-18 56.07.37 143.31 2.3 469 31 115.32 10.16 230.93 17.34 346 30 31.46 3.46 158.44 17.63 322 11 112.61-4.56 143.25-15 163-32.25z" fill="#fff" data-name="lay-1"></path></g></svg>                </div>
                <div className="section-share section-handbook">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section"><span className="highlight">Cẩm nang</span> sức khỏe - Kiến thức hữu ích cho cuộc sống </span>

                            <span className="extra-info handbook">Cẩm nang sức khỏe cung cấp những thông tin hữu ích giúp bạn chăm sóc sức khỏe toàn diện, từ phòng ngừa bệnh tật đến duy trì lối sống lành mạnh. Với nội dung chính xác, dễ hiểu và thiết thực, chúng tôi mang đến cho bạn những kiến thức cần thiết để bảo vệ sức khỏe cho bản thân và gia đình.

                            </span>
                        </div>
                        <div className="section-body">
                            <div className="row">
                                {handBook && handBook.length > 0 && (
                                    <>
                                        <div className="col-md-7 mb-4 ">
                                            <div className="card" onClick={() => this.handleViewDetailHandBook(handBook[0])}>
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
                                                <div key={item.id} className="mb-3 parent-handbook" onClick={() => this.handleViewDetailHandBook(item)}>
                                                    <div className="card  handbook-right">
                                                        <div className="card-body">
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



                                    </>
                                )}
                            </div>
                            <div className="btn-more">
                                <Link className="custom-link" to={`/handbook`}>
                                    <button className="btn-section"><FormattedMessage id="home-page.more-information" /><i className="fas fa-long-arrow-alt-right"></i></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
