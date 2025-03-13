import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty, putSpecialty, deleteSpecialty } from '../../../services/userService'
import { toast } from "react-toastify";
import * as actions from "../../../store/actions"
import Pagination from '../Pagination/Pagination';
import ModalAddSpecialty from './ModalAddSpecialty';
import ModalEditSpecialty from './ModalEditSpecialty';
import { emitter } from '../../../utils/emitter';
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

            filterName: '',

            specialtyEdit: {},
            isOpenModalSpecialty: false,
            isOpenModalEditSpecialty: false,

            page: 1,
            size: 4,
            pageCount: 2
        }
    }
    async componentDidMount() {
        this.handleCallSpecialty();
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            this.setState({
                listSpecialties: this.props.allRequiredDoctorInfo.responseSpecialty,
                pageCount: this.props.allRequiredDoctorInfo.pageCountSpecialty.pages
            })
        }
    }

    toggleSpecialtyModal = () => {
        this.setState({
            isOpenModalSpecialty: !this.state.isOpenModalSpecialty,
        })
    }

    handleShowModal = () => {
        this.setState({
            isOpenModalSpecialty: true,
        })
    }

    toggleSpecialtyEditModal = () => {
        this.setState({
            isOpenModalEditSpecialty: !this.state.isOpenModalEditSpecialty,
        })
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleCallSpecialty = () => {
        this.props.fetchAllScheduleTimeRedux({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filterName
        }, () => {
            this.setState({
                pageCount: this.props.allRequiredDoctorInfo.pageCountSpecialty.pages
            })
        });
    }

    handleEditSpecialty = (specialty) => {
        this.setState({
            isOpenModalEditSpecialty: true,
            specialtyEdit: specialty
        })
    }

    handleSaveSpecialty = async (specialty) => {
        let response = await createNewSpecialty(specialty)

        if (response && response.error !== null) {
            toast.error(response.message);
        } else {
            toast.success("Save specialty success");
            this.handleCallSpecialty();
            this.setState({
                isOpenModalSpecialty: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        }
    }

    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        })
        this.props.fetchAllScheduleTimeRedux({
            page: +event.selected + 1 ? +event.selected + 1 : this.state.page,
            size: this.state.size,
            filterName: this.state.filterName
        });
    };

    handleEditSpecialty = (specialty) => {
        this.setState({
            isOpenModalEditSpecialty: true,
            specialtyEdit: specialty
        })
    }

    doEditSpecialty = async (specialty) => {
        try {
            let response = await putSpecialty(specialty);
            if (response && response.error !== null) {
                toast.error("Edit specialty error");
            } else {
                toast.success("Edit specialty success");
                this.handleCallSpecialty();
                this.setState({
                    isOpenModalEditSpecialty: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteSpecialty = async (specialty) => {
        let response = await deleteSpecialty({ id: specialty.id })
        if (response && response.error === null) {
            toast.success("Delete specialty success");
            this.props.fetchAllScheduleTimeRedux({
                page: this.state.page,
                size: this.state.size,
                filterName: this.state.filterName
            });
        } else {
            toast.error("Delete specialty error");
        }

    }
    handleSearch = () => {
        this.handleCallSpecialty();
    }
    handleRefreshFilter = () => {
        this.setState({
            filterName: ''
        }, () => {
            this.handleCallSpecialty();
        })

    }
    render() {
        let { language } = this.props;
        let { listSpecialties, pageCount } = this.state;
        return (
            <>
                < ModalAddSpecialty
                    isOpen={this.state.isOpenModalSpecialty}
                    toggleFormParent={this.toggleSpecialtyModal}
                    handleSaveSpecialty={this.handleSaveSpecialty}
                />
                <ModalEditSpecialty
                    isOpen={this.state.isOpenModalEditSpecialty}
                    toggleFormParent={this.toggleSpecialtyEditModal}
                    currentSpecialty={this.state.specialtyEdit}
                    editSpecialty={this.doEditSpecialty}
                />
                <div className="manage-specialty-container">
                    <div className="ms-title">Quản lý chuyên khoa</div>
                    <div className="container">
                        <div className="row line-search">
                            <div className="col-8">
                                <span>Name: </span>
                                <input type="text" placeholder="Nhập dữ liệu"
                                    value={this.state.filterName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterName')} />
                            </div>
                            <div className="col-4">
                                <button className="refresh-search"
                                    onClick={() => this.handleRefreshFilter()}>Làm lại
                                </button>
                                <button
                                    onClick={() => this.handleSearch()}>Tìm kiếm
                                </button>

                            </div>
                        </div>

                        <div className="row table-specialties">
                            <div className="col-6">
                                <div className="title-table"><span>Danh sách chuyên khóa</span></div>
                            </div>
                            <div className="col-6 line-add">

                                <div className="btn-show-modal-add">
                                    <button
                                        onClick={() => this.handleShowModal()}>
                                        <i className="fas fa-plus"></i>Thêm
                                    </button>
                                </div>
                                <div className="refresh">
                                    <i className="fas fa-sync"></i>
                                </div>
                            </div>
                            <div className="12">
                                <table className="table table-bordered table-hover  table-rounded">
                                    <thead className="table-light">
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

                </div >
            </>
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
