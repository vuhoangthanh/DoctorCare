import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import './ModalAddClinic.scss'
import { emitter } from '../../../utils/emitter';
import { createNewClinic } from '../../../services/userService'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalAddClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
        }
    }
    async componentDidMount() {
        this.listenToEmitter();
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
        console.log("image", this.state)
    }
    toggle = () => {
        this.props.toggleFormParent();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: '',
            })
        })
    }
    handleSaveClinic = async () => {
        console.log("this", this.state)
        this.props.handleSaveClinic({
            name: this.state.name,
            image: this.state.imageBase64,
            address: this.state.address,
            descriptionHtml: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        });

    }
    render() {
        let { language } = this.props;
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    // isOpen={true}
                    toggle={() => { this.toggle() }}
                    className={'modal-clinic-container'}
                    size="xl"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Add new clinic</ModalHeader>
                    <ModalBody>
                        <div className="add-new-specialty row">
                            <div className="col-6 form-group">
                                <label className="required">Tên phòng khám</label>
                                <input type="text" className="form-control"
                                    value={this.state.name}
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                            </div>
                            <div className="col-6">
                                <label className="required">Ảnh chuyên khoa</label>
                                <input type="file"
                                    className="form-control"
                                    onChange={(event) => this.handleOnChangeImage(event)} />
                            </div>
                            <div className="col-6 form-group">
                                <label className="required">Địa chỉ phòng khám</label>
                                <input type="text" className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
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
                                        value={this.state.descriptionMarkdown}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button
                            color="primary"
                            className="px-3 add"
                            onClick={() => { this.handleSaveClinic() }}>
                            Add new
                        </Button>{' '}
                        <Button color="secondary" className="px-3 close" onClick={() => { this.toggle() }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddClinic);
