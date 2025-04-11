import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getHandBookById, getHandBookBySpecialty } from '../../../services/userService'
import './DetailHandBook.scss'
import { withRouter } from 'react-router';
import Footer from '../../HomePage/Footer';

class DetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandBook: {},

            handBookRelate: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let response = await getHandBookById({
                id: id
            });


            if (response && response.error === null) {
                await this.handleCallHandBookRelate(response.data.specialtyId);

                this.setState({
                    dataDetailHandBook: response.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let id = this.props.match.params.id;

            let response = await getHandBookById({ id });


            if (response && response.error === null) {
                await this.handleCallHandBookRelate(response.data.specialtyId);

                this.setState({
                    dataDetailHandBook: response.data,
                })
            }
        }
    }


    handleCallHandBookRelate = async (id) => {
        let response = await getHandBookBySpecialty({
            id: id
        })

        if (response && response.error === null) {
            this.setState({
                handBookRelate: response.data
            })
        }
    }
    handleOnClickHandBook = (handBook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handBook.id}`)
        }
    }
    render() {
        let { language } = this.props;
        let { dataDetailHandBook, handBookRelate } = this.state;
        console.log("fsd", this.state.handBookRelate)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="detail-handbook-container">
                    <div className="link-navigation row">
                        <div className="col-12">
                            <Link className="custom-link-navigation" to={`/home`}><i className="fas fa-home"></i> Trang chủ/</Link>
                            <Link className="custom-link-navigation" to={`/handbook`}>Cẩm nang/</Link>
                            {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                                &&
                                <span>{dataDetailHandBook.title}</span>
                            }
                        </div>
                    </div>
                    <div className="detail-handbook-body container">
                        <div className="row">
                            <div className="col-9 handbook-main">
                                <div className="title">
                                    {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                                        &&
                                        <span>{dataDetailHandBook.title}</span>
                                    }
                                </div>
                                <div className="author">
                                    {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                                        &&
                                        <>

                                            <span>Ngày tạo: {moment(dataDetailHandBook.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</span><br />
                                            <span>Tác giả: {dataDetailHandBook.createdBy}</span>
                                        </>
                                    }
                                </div>
                                <div className="content-handbook">
                                    {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                                        &&
                                        < div dangerouslySetInnerHTML={{ __html: dataDetailHandBook.contentHtml }}>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-3 handbook-relate">
                                <div className="title-relate">
                                    <span>Cẩm nang liên quan</span>
                                </div>
                                <div className="list-handbook-relate">
                                    {handBookRelate && handBookRelate.length > 0 ?
                                        handBookRelate.slice(0, 4).map((item, index) => {
                                            return (
                                                <div className="handbook" key={index} onClick={() => this.handleOnClickHandBook(item)}>
                                                    <div className="img-handbook" style={{ backgroundImage: `url(${item.thumbnail})` }}></div>
                                                    <div className="handbook-body">
                                                        <div className="title-handbook">
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <div className="author">
                                                            <span> {moment(item.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</span><br />
                                                            <span>{item.createdBy}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        "Không có bài viết liên quan"
                                    }

                                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailHandBook));
