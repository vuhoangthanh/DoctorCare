import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES, dateFormat } from "../../../utils"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import { toast } from "react-toastify";
import _, { range } from 'lodash';
import { saveBulkScheduleDoctor, getAllDoctorService, getScheduleDoctorByDate } from '../../../services/userService'


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: [],
            currentDate: '',
            currentDateSearch: new Date(new Date().setHours(0, 0, 0, 0)),
            rangeTime: [],
            schedules: [],
            result: {},

            page: '',
            size: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux({
            page: this.state.page,
            size: this.state.size
        });
        this.props.fetchAllScheduleTimeRedux();
        this.handleGetTimeByDoctorAndDate(this.state.listDoctors);

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors.result)
            this.setState({
                listDoctors: dataSelect
            }, () => {
                // Gọi lại hàm sau khi listDoctors đã cập nhật
                this.handleGetTimeByDoctorAndDate(this.state.listDoctors);
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })

                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }
    buildDataInputSelect = (data) => {
        let result = []
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    HandleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleOnChangeDatePickerSearch = (date) => {
        this.setState({
            currentDateSearch: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = []

        if (!currentDate) {
            toast.error("Invalid date!");
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();
        // console.log(new Date(1743526800000).toISOString());

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;

                    result.push(object)
                })
            } else {
                toast.error("Invalid selected schedule!");
            }
        }

        let response = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });
        if (response && response.error === null) {
            toast.success("Save info success!");
        } else {
            toast.error("Save info error");
            console.log("error:", response)
        }
    }

    handleGetDoctor = async () => {
        let response = await getAllDoctorService();
        if (response && response.data) {

        }
    }
    handleGetTimeByDoctorAndDate = async (doctors) => {
        // await this.props.fetchAllDoctorsRedux();
        console.log("ds", this.state.currentDateSearch)
        let formattedDate = new Date(this.state.currentDateSearch).getTime();
        let result = []
        if (doctors && doctors.length > 0) {
            for (let item of doctors) {
                let response = await getScheduleDoctorByDate(item.value, formattedDate);
                if (response && response.data) {
                    result.push(response.data)
                    // console.log("fds", result)
                }
            }
        }
        this.setState({
            result: result
        })
        // console.log("fds111", this.state.result)


    }
    handleSearch = () => {
        this.handleGetTimeByDoctorAndDate(this.state.listDoctors)
    }
    render() {
        let { rangeTime, listDoctors, result, currentDateSearch } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                minHeight: "32px",
                height: "32px",
                borderRadius: "7px",
                border: state.isFocused ? "2px solid #2266aa" : "1px solid #ced4da",
                boxShadow: state.isFocused ? "0 0 5px rgba(34, 102, 170, 0.5)" : "none",
                transition: "0.3s",
                "&:hover": {
                    border: "2px solid #2266aa",
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

        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row register-schedule">
                        <div className="col-6 form-group">
                            <label className="required"><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.HandleChangeSelect}
                                options={this.state.listDoctors}
                                styles={customStyles}
                            />
                        </div>
                        <div className="col-6">
                            <label className="required"><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control date-picker-action"
                                value={this.state.currentDate}
                                minDate={yesterday}
                                id="date-picker-action"
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className="col-12">
                            <button
                                className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                    <div className="row list-schedule">
                        <div className="col-6">
                            <div className="title-table"><span><FormattedMessage id="manage-schedule.title-table" /></span></div>
                        </div>
                        <div className="col-6 line-search">
                            <div className="inp-search">
                                <DatePicker
                                    onChange={this.handleOnChangeDatePickerSearch}
                                    className="date-picker"
                                    value={this.state.currentDateSearch}

                                />
                            </div>
                            <div className="btn-search">
                                <button
                                    onClick={() => this.handleSearch()}><FormattedMessage id="manage-schedule.search" /></button>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <table id="tableManageUser" className="table table-bordered table-hover  table-rounded">
                                <thead className="table-light">
                                    <tr>
                                        <th className="first"><FormattedMessage id="manage-schedule.no" /></th>
                                        <th><FormattedMessage id="manage-schedule.name" /></th>
                                        <th><FormattedMessage id="manage-schedule.date" /></th>
                                        <th><FormattedMessage id="manage-schedule.time" /></th>
                                        <th><FormattedMessage id="manage-schedule.create-at" /></th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listDoctors && listDoctors.length > 0 &&
                                        listDoctors.map((item, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>{item.value}</td>
                                                        <td>{item.label}</td>
                                                        <td></td>

                                                        {(() => {
                                                            let createdAtValue = "";

                                                            const filteredResults = Array.isArray(result) && result.length > 0
                                                                ? result.flatMap(arr => (Array.isArray(arr) ? arr : []))
                                                                    .filter(item1 => item1.doctorId === item.value)
                                                                : [];

                                                            if (filteredResults.length > 0) {
                                                                createdAtValue = moment(filteredResults[0].createdAt).format('DD/MM/YYYY HH:mm:ss');
                                                            } else {
                                                                createdAtValue = ""
                                                            }

                                                            return (
                                                                <>
                                                                    <td>
                                                                        {filteredResults.length > 0 ? filteredResults.map((item1, index1) => (
                                                                            <button key={index1}>{item1.timeTypeData.valueVi}</button>
                                                                        ))
                                                                            :
                                                                            <span className="no-schedule">Không có lịch</span>
                                                                        }
                                                                    </td>
                                                                    <td>{createdAtValue}</td>
                                                                </>
                                                            );
                                                        })()}
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: (data) => dispatch(actions.fetchAllDoctors(data)),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
