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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { responsePayment, responsePrice, responseProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(responsePrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(responsePayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(responseProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

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
        }, () => {
            console.log('html1', this.state.contentHtml)
            console.log('markdown1', this.state.contentMarkdown)
        }
        )
    }

    handleSaveContentMarkdown = () => {
        if (!this.state.selectedDoctor.value) {
            toast.error("Missing parameter");
        } else {
            let { hasOldData } = this.state
            console.log('html', this.state.contentHtml)
            console.log('markdown', this.state.contentMarkdown)
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
                    note: this.state.note
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
                    note: this.state.note
                });
            }
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state

        let response = await getDetailInfoDoctor(selectedDoctor.value);
        if (response && response.data && response.data.markdown) {
            let markdown = response.data.markdown;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '';

            if (response.data.doctorInfo) {

                addressClinic = response.data.doctorInfo.addressClinic;
                nameClinic = response.data.doctorInfo.nameClinic;
                note = response.data.doctorInfo.note;
                paymentId = response.data.doctorInfo.paymentId;
                priceId = response.data.doctorInfo.priceId;
                provinceId = response.data.doctorInfo.provinceId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
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
                selectedProvince: selectedProvince
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
        console.log('fd', selectedOption, stateName)
    }

    handleOnChangeText = (event, id) => {
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

        }
        return result;
    }
    render() {
        let { hasOldData } = this.state
        console.log('state', this.state)


        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left">

                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label> <FormattedMessage id="admin.manage-doctor.intro" /></label>
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
                            <label> <FormattedMessage id="admin.manage-doctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name="selectedPrice"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label> <FormattedMessage id="admin.manage-doctor.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name="selectedPayment"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label> <FormattedMessage id="admin.manage-doctor.payment" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name="selectedProvince"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label> <FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic} />
                        </div>
                        <div className="col-4 form-group">
                            <label> <FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label> <FormattedMessage id="admin.manage-doctor.note" /></label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
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
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        editDetailDoctorRedux: (data) => dispatch(actions.editDetailDoctor(data)),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
