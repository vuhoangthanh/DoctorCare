import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty, createNewClinic } from '../../../services/userService'
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: ''
        }
    }
    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


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
            descriptionMarkdown: text,
            descriptionHTML: html
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
    handleSaveClinic = async () => {
        let response = await createNewClinic({
            name: this.state.name,
            image: this.state.imageBase64,
            address: this.state.address,
            descriptionHtml: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown

        })
        if (response && response.error === null) {
            toast.success("Save Specialty success!");
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })

        } else {
            toast.error("Save Specialty error!");

        }
    }
    render() {
        let { language } = this.props;
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input type="text" className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className="col-6">
                        <label>Ảnh chuyên khoa</label>
                        <input type="file" className="form-control"
                            onChange={(event) => this.handleOnChangeImage(event)} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input type="text" className="form-control"
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                    </div>
                    <div className="col-12 mt-3">
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty"
                            onClick={() => this.handleSaveClinic()}>Save</button>
                    </div>

                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
