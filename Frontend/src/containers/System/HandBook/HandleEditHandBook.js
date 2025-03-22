import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import _ from 'lodash';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEditHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            contentHtml: '',
            contentMarkdown: '',
            imageBase64: '',

            listSpecialty: [],
            selectedSpecialty: '',

            page: '',
            size: '',
            filter: ''
        }
    }
    async componentDidMount() {
        this.props.getRequiredDoctorInfo({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filter,
            filterAddress: this.state.filter
        });
        this.handleCallData();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { responseSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectSpecialty = this.buildDataInputSelect(responseSpecialty, 'SPECIALTY')


            this.setState({
                listSpecialty: dataSelectSpecialty,
            })
        }

        if (prevProps.currentHandBook !== this.props.currentHandBook) {
            this.handleCallData();
        }

    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'SPECIALTY') {
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
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    toggle = () => {
        this.props.toggleFormParent();
    }

    handleChangeSelectSpecialty = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }


    handleCallData = () => {
        let handBook = this.props.currentHandBook
        console.log("kk", handBook)
        if (handBook && !_.isEmpty(handBook)) {
            this.setState({
                id: handBook.id,
                title: handBook.title,
                imageBase64: handBook.thumbnail,
                contentHtml: handBook.contentHtml,
                contentMarkdown: handBook.contentMarkdown,
                selectedSpecialty: {
                    value: handBook.specialtyData.id,
                    label: handBook.specialtyData.name
                }
            })
        }
    }
    handleEditHandBook = async () => {
        this.props.editHandBook({
            id: this.state.id,
            title: this.state.title,
            thumbnail: this.state.imageBase64,
            contentHtml: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    render() {
        let { language } = this.props;
        let { listSpecialty } = this.state;
        console.log("statestate", this.state)
        return (
            <Modal
                isOpen={this.props.isOpen}
                // isOpen={true}
                toggle={() => { this.toggle() }}
                className={'modal-clinic-container'}
                size="xl"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit new clinic</ModalHeader>
                <ModalBody>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label className="required"><FormattedMessage id="admin.hand-book.title" /></label>
                            <input type="text" className="form-control"
                                value={this.state.title}
                                onChange={(event) => this.handleOnChangeInput(event, 'title')} />
                        </div>
                        <div className="col-6">
                            <label className="required"><FormattedMessage id="admin.hand-book.thumbnail" /></label>
                            <input type="file"
                                className="form-control"
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                        <div className="col-6 form-group">
                            <label className="required"><FormattedMessage id="admin.hand-book.specialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectSpecialty}
                                options={listSpecialty}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                name="selectedSpecialty"
                            // styles={customStyles}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <div className="manage-clinic-editor">
                                <MdEditor
                                    style={{
                                        height: '300px', borderRadius: "8px",
                                        overflow: "hidden"
                                    }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button
                        color="primary"
                        className="px-3 add"
                        onClick={() => { this.handleEditHandBook() }}>
                        <FormattedMessage id="admin.hand-book.btn-edit" />
                    </Button>{' '}
                    <Button color="secondary" className="px-3 close" onClick={() => { this.toggle() }}>
                        <FormattedMessage id="admin.hand-book.btn-close" />
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfo: (data) => dispatch(actions.getRequiredDoctorInfo(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditHandBook);
