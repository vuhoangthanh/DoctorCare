import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import './ManagePatient.scss'
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from "react-toastify";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {}
        }
    }
    async componentDidMount() {

        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();


        let response = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (response && response.error === null) {
            this.setState({
                dataPatient: response.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patient.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        let response = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language
        })
        if (response && response.error === null) {
            console.log("dataChild", dataChild, dataModal)
            toast.success("Send Remedy success!")
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            toast.success("Send Remedy erorr!")
        }
    }

    render() {

        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        Quản lý lý bệnh nhân khám bệnh
                    </div>
                    <div className="manage-patient-body row">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            // minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table >
                                <tbody>
                                    <tr>
                                        <th>Stt</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                            let genderVi = item.patient.genderData && item.patient.genderData.valueVi ? item.patient.genderData.valueVi : '';
                                            let genderEn = item.patient.genderData && item.patient.genderData.valueEn ? item.patient.genderData.valueEn : '';
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patient.firstName}</td>
                                                    <td>{item.patient.address}</td>
                                                    <td>{language === LANGUAGES.VI ? genderVi : genderEn}</td>
                                                    <td>
                                                        <button className="mp-btn-confirm"
                                                            onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center" }}>no data</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);


