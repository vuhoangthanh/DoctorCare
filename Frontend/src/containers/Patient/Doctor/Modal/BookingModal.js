import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import Select from 'react-select';
import moment from 'moment'
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import { postPatientBookAppoint } from '../../../../services/userService'
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
import { emitter } from '../../../../utils/emitter';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.props.fetchGender();
        this.listenToEmitter();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;

                result.push(object);
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                let data = this.props.genders;
                let language = this.props.language;
            }

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {

            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;

                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }

        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.sate };

        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {

            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} - ${date}`
        }
        return ``
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name
        }
        return ``
    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        this.setState({
            isShowLoading: true
        })
        let response = await postPatientBookAppoint({
            email: this.state.email,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        }, () => {
            this.listenToEmitter();
        })
        this.setState({
            isShowLoading: false
        })
        if (response && response.error === null) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new appointment error!");
        }
    }
    toggle = () => {
        this.props.toggleFormParent();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
            })
        })
    }
    render() {
        let { language, isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'>
                <Modal
                    isOpen={isOpenModal}
                    toggle={() => { this.toggle() }}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className="right" onClick={closeBookingModal}><i className="fas fa-times"></i></span>
                        </div>
                        <div className="booking-modal-body">

                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowPrice={true}
                                    isShowLinkDetail={false}
                                />
                            </div>

                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    ></input>
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            ><FormattedMessage id="patient.booking-modal.btn-confirm" /></button>
                            <button className="btn-booking-cancel" onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.btn-cancel" /></button>
                        </div>
                    </div>
                </Modal >
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
