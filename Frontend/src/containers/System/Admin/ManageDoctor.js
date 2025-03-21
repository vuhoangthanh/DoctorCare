import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
import UserRedux from './UserRedux';
import './ManageDoctor.scss'
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailInfoDoctor, addDetailDoctorService } from "../../../services/userService"
import { toast } from "react-toastify";
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            ClinicId: '',
            specialtyId: '',

            page: '',
            size: '',
            filter: ''

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterPosition: this.state.filter
        });
        this.props.getRequiredDoctorInfo({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        });
        console.log("mmmmm", this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors.result, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
            console.log("listhos", this.state.lisDoctors)
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { responsePayment, responsePrice, responseProvince, responseSpecialty, responseClinic } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(responsePrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(responsePayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(responseProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(responseSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(responseClinic, 'CLINIC')


            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors.result, 'USERS')

            let { responsePayment, responsePrice, responseProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(responsePrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(responsePayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(responseProvince, 'PROVINCE')

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,

            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html
        })
    }

    handleSaveContentMarkdown = () => {
        if (!this.state.selectedDoctor.value) {
            toast.error("Missing parameter");
        } else {
            let { hasOldData } = this.state
            if (hasOldData !== true) {
                this.props.saveDetailDoctorRedux({
                    contentHtml: this.state.contentHtml,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value,

                    priceId: this.state.selectedPrice.value,
                    paymentId: this.state.selectedPayment.value,
                    provinceId: this.state.selectedProvince.value,
                    nameClinic: this.state.nameClinic,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note,
                    clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
                    specialtyId: this.state.selectedSpecialty.value,

                })
                this.setState({
                    hasOldData: true
                })
            } else {
                this.props.editDetailDoctorRedux({
                    contentHtml: this.state.contentHtml,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value,

                    priceId: this.state.selectedPrice.value,
                    paymentId: this.state.selectedPayment.value,
                    provinceId: this.state.selectedProvince.value,
                    nameClinic: this.state.nameClinic,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note,
                    clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
                    specialtyId: this.state.selectedSpecialty && this.state.selectedSpecialty.value ? this.state.selectedSpecialty.value : '',
                });
            }
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state



        let response = await getDetailInfoDoctor(selectedDoctor.value);

        if (response && response.data && response.data.markdown) {
            let markdown = response.data.markdown;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedClinic = '', selectedSpecialty = '';

            if (response.data.doctorInfo) {

                addressClinic = response.data.doctorInfo.addressClinic;
                nameClinic = response.data.doctorInfo.nameClinic;
                note = response.data.doctorInfo.note;
                paymentId = response.data.doctorInfo.paymentId;
                priceId = response.data.doctorInfo.priceId;
                provinceId = response.data.doctorInfo.provinceId;
                specialtyId = response.data.doctorInfo.specialtyId;
                clinicId = response.data.doctorInfo.clinicId;

                selectedPayment = listPayment.find(item => {
                    console.log("payment", item.value)
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHtml: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedClinic: selectedClinic,
                selectedSpecialty: selectedSpecialty

            })
        } else {
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        console.log("text", event, id)
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {}

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
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
    render() {
        console.log("fdsa", this.props)

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



        let { hasOldData, listSpecialty, listClinic } = this.state

        return (
            <div className="manage-doctor-container">
                <div className="container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className="all-info">
                        <div className="more-info">
                            <div className="content-left">

                                <label className="required"><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    styles={customStyles}
                                />
                            </div>
                            <div className="content-right">
                                <label className="required"> <FormattedMessage id="admin.manage-doctor.intro" /></label>
                                <textarea
                                    onChange={(event) => this.handleOnChangeText(event, 'description')}
                                    value={this.state.description}
                                    className="form-control" >

                                </textarea>
                            </div>

                        </div>

                        <div className="more-info-extra">
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.price" /></label>
                                    <Select
                                        value={this.state.selectedPrice}
                                        onChange={this.handleChangeSelectDoctorInfo}
                                        options={this.state.listPrice}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                        name="selectedPrice"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.payment" /></label>
                                    <Select
                                        value={this.state.selectedPayment}
                                        onChange={this.handleChangeSelectDoctorInfo}
                                        options={this.state.listPayment}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                        name="selectedPayment"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.province" /></label>
                                    <Select
                                        value={this.state.selectedProvince}
                                        onChange={this.handleChangeSelectDoctorInfo}
                                        options={this.state.listProvince}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                        name="selectedProvince"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                        value={this.state.nameClinic} />

                                </div>
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                        value={this.state.addressClinic}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label className="required"> <FormattedMessage id="admin.manage-doctor.note" /></label>
                                    <input className="form-control"
                                        onChange={(event) => this.handleOnChangeText(event, 'note')}
                                        value={this.state.note}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 form-group">
                                <label className="required"> <FormattedMessage id="admin.manage-doctor.specialty" /></label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={listSpecialty}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    name="selectedSpecialty"
                                    styles={customStyles}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label className="required"> <FormattedMessage id="admin.manage-doctor.clinic" /></label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={listClinic}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    name="selectedClinic"
                                    styles={customStyles}
                                />
                            </div>
                        </div>
                        <div className="manage-doctor-editor">
                            <MdEditor
                                style={{
                                    height: '300px', borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                                className="markdown"
                            />
                        </div>

                        <button
                            onClick={() => this.handleSaveContentMarkdown()}
                            className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                        >
                            {hasOldData === true ?
                                <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: (data) => dispatch(actions.fetchAllDoctors(data)),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        editDetailDoctorRedux: (data) => dispatch(actions.editDetailDoctor(data)),
        getRequiredDoctorInfo: (data) => dispatch(actions.getRequiredDoctorInfo(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
