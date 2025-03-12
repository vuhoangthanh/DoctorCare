import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService'
import { toast } from "react-toastify";
import * as actions from "../../../store/actions"
import Pagination from '../Pagination/Pagination';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            listSpecialties: [],

            page: 1,
            size: 4,
            pageCount: 2
        }
    }
    async componentDidMount() {
        this.props.fetchAllScheduleTimeRedux({
            page: this.state.page,
            size: this.state.size
        });
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            this.setState({
                listSpecialties: this.props.allRequiredDoctorInfo.responseSpecialty,
                pageCount: this.props.allRequiredDoctorInfo.pageCountSpecialty.pages
            })
        }
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
    handleSaveSpecialty = async () => {
        let response = await createNewSpecialty({
            name: this.state.name,
            image: this.state.imageBase64,
            descriptionHtml: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown

        })
        if (response && response.error === null) {
            toast.success("Save Specialty success!");
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })

        } else {
            toast.error("Save Specialty error!");

        }
    }

    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        this.props.fetchAllScheduleTimeRedux({
            page: +event.selected + 1 ? +event.selected + 1 : this.state.page,
            size: this.state.size
        });
    };
    render() {
        let { language } = this.props;
        let { listSpecialties, pageCount } = this.state;
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="container">
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label className="required">Tên chuyên khoa</label>
                            <input type="text" className="form-control"
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                        </div>
                        <div className="col-6">
                            <label className="required">Ảnh chuyên khoa</label>
                            <input type="file" className="form-control"
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                        <div className="col-12 mt-3">
                            <div className="manage-specialty-editor">
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
                        <div className="col-12">
                            <button className="btn-save-specialty"
                                onClick={() => this.handleSaveSpecialty()}>Save</button>
                        </div>

                    </div>

                    <div className="row table-specialties">
                        <div className="col-6">
                            <div className="title-table"><span>Danh sách chuyên khóa</span></div>
                        </div>
                        <div className="col-6 line-search">
                            <div className="inp-search">
                                <input type="text" />
                            </div>
                            <div className="btn-search">
                                <button
                                    onClick={() => this.handleSearch()}>Tìm kiếm</button>
                            </div>
                        </div>
                        <div className="12">
                            <table class="table table-bordered table-hover  table-rounded">
                                <thead class="table-light">
                                    <tr>
                                        <th className="first col1">Stt</th>
                                        <th className="col2">Name</th>
                                        <th className="col3">Image</th>
                                        <th className="col5">Create at</th>
                                        <th className="col6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSpecialties && listSpecialties.length > 0 ?
                                        listSpecialties.map((item, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="first">{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <div className="bg-image"
                                                                style={{ backgroundImage: `url(${item.image})` }}>
                                                            </div>
                                                        </td>
                                                        <td>{moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                        <td><button
                                                            onClick={() => this.handleEditSpecialty(item)}
                                                            className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                                            <button
                                                                onClick={() => { this.handleDeleteSpecialty(item) }}
                                                                className="btn-delete"><i className="fas fa-trash-alt"></i></button></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                        :
                                        <td>No data</td>
                                    }


                                </tbody>
                            </table>
                        </div>
                        <div className="col-12">
                            <Pagination
                                pageCount={pageCount}
                                handlePageClick={this.handlePageClick} // Không cần arrow function
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTimeRedux: (data) => dispatch(actions.getRequiredDoctorInfo(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
