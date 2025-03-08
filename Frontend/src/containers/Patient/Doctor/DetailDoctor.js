import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInfoDoctor } from '../../../services/userService'
import { LANGUAGES } from "../../../utils"
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../SocialPlugin/LikeAndShare'
import Comment from '../SocialPlugin/Comment'

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })

            let response = await getDetailInfoDoctor(id);
            if (response && response.error === null) {
                this.setState({
                    detailDoctor: response.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state
        let nameVi = '', nameEn = '';

        let currentURL = process.env.REACT_APP_IS_LOCALHOST === 1 ?
            window.location.href : "https://bookingcare.vn/";

        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.avatar ? detailDoctor.avatar : ''})` }}>

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.description
                                    &&
                                    <span>
                                        {detailDoctor.markdown.description}
                                    </span>
                                }
                            </div>
                            <div className="like-share-plugin">
                                <LikeAndShare
                                    dataHref={currentURL}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.contentHtml
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdown.contentHtml }}>
                            </div>
                        }
                    </div>
                    <div className="comment-doctor">
                        <Comment
                            dataHref={currentURL}
                            width={"100%"}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
