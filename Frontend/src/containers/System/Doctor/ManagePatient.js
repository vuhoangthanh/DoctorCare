import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import './ManagePatient.scss'
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        this.getDataPatient(user, formattedDate);
    }

    getDataPatient = async (user, formattedDate) => {
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
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formattedDate = new Date(currentDate).getTime();

            this.getDataPatient(user, formattedDate);
        })
    }

    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

    }
    render() {

        let { language } = this.props;
        let { dataPatient } = this.state;
        console.log(dataPatient)
        return (

        
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
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patient.firstName}</td>
                                                <td>{item.patient.address}</td>
                                                <td>{item.patient.genderData && item.patient.genderData.valueVi ? item.patient.genderData.valueVi : ''}</td>
                                                <td>
                                                    <button className="mp-btn-confirm"
                                                        onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                                    <button className="mp-btn-remedy"
                                                        onClick={() => this.handleBtnRemedy()}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        no data
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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


