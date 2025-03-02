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

import Select from 'react-select';
// import {}

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
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
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { responsePayment, responsePrice, responseProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(responsePrice)
            let dataSelectPayment = this.buildDataInputSelect(responsePayment)
            let dataSelectProvince = this.buildDataInputSelect(responseProvince)

            this.setState({
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
        let { hasOldData } = this.state
        console.log('html', this.state.contentHtml)
        console.log('markdown', this.state.contentMarkdown)
        if (hasOldData !== true) {
            this.props.saveDetailDoctorRedux({
                contentHtml: this.state.contentHtml,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedDoctor.value,
            })
        } else {
            this.props.editDetailDoctorRedux({
                contentHtml: this.state.contentHtml,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedDoctor.value,
            });
        }

    }
    HandleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let response = await getDetailInfoDoctor(selectedDoctor.value);
        let { hasOldData } = this.state;
        if (response && response.data && response.data.markdown) {
            let markdown = response.data.markdown;
            this.setState({
                contentHtml: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        // console.log(`Option selected`, response)
        // console.log(`state`, this.state)
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    render() {
        let arrUsers = this.state.usersRedux
        let { hasOldData } = this.state



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
                            onChange={this.HandleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="content-right">
                        <label> <FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            className="form-control" >

                        </textarea>
                    </div>

                </div>

                <div className="more-info-extra">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Chọn giá</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                onChange={this.HandleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={'Chọn giá'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                onChange={this.HandleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={'Chọn phương thức thanh toán'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn tỉnh thành</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                onChange={this.HandleChangeSelect}
                                options={this.state.listProvince}
                                placeholder={'Chọn tỉnh thành'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Tên phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Ghi chú</label>
                            <input className="form-control" />
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
