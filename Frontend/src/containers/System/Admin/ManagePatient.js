import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDate, postSendRemedy, deleteBooking } from '../../../services/userService';
import './ManagePatient.scss'
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {

        this.getDataPatient();
    }

    getDataPatient = async () => {

        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();


        let response = await getAllPatientForDate({
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
        this.setState({
            isShowLoading: true
        })
        let response = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            date: new Date(this.state.currentDate).getTime()
        })
        if (response && response.error === null) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send Remedy success!")
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error("Send Remedy erorr!")
        }
    }
    handleBtnDelete = async (item) => {

        let response = await deleteBooking({
            id: item.id
        })
        if (response && response.error === null) {
            this.getDataPatient();
            toast.success("Delete schedule success!")
        } else {
            toast.error("Delete schedule error!")
        }
    }

    render() {
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className="manage-patient-container container">
                        <div className="m-p-title">
                            <FormattedMessage id="manage-patient.title" />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-12 form-group line-search">
                                <label>   <FormattedMessage id="manage-patient.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control datepicker"
                                    value={this.state.currentDate}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <div className="title-table">
                                    <span>   <FormattedMessage id="manage-patient.title-table" /></span>
                                </div>
                                <table id="tableManageUser" className="table table-bordered table-hover  table-rounded">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="first">   <FormattedMessage id="manage-patient.no" /></th>
                                            <th>   <FormattedMessage id="manage-patient.no" /></th>
                                            <th>   <FormattedMessage id="manage-patient.name" /></th>
                                            <th>   <FormattedMessage id="manage-patient.address" /></th>
                                            <th>   <FormattedMessage id="manage-patient.gender" /></th>
                                            <th>   <FormattedMessage id="manage-patient.action" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let genderVi = item.patient.genderData && item.patient.genderData.valueVi ? item.patient.genderData.valueVi : '';
                                                let genderEn = item.patient.genderData && item.patient.genderData.valueEn ? item.patient.genderData.valueEn : '';
                                                return (
                                                    <tr key={index}>
                                                        <td className="first">{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patient.firstName}</td>
                                                        <td>{item.patient.address}</td>
                                                        <td>{language === LANGUAGES.VI ? genderVi : genderEn}</td>
                                                        <td>
                                                            <button className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                            <button className="mp-btn-delete"
                                                                onClick={() => this.handleBtnDelete(item)}>Xoá</button>
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
                </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);


