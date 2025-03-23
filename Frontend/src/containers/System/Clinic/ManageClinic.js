import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty, createNewClinic, getAllClinic, getClinicById, putClinic, deleteClinic } from '../../../services/userService'
import { toast } from "react-toastify";
import * as actions from "../../../store/actions"
import Pagination from '../Pagination/Pagination';
import ModalAddClinic from './ModalAddClinic';
import { emitter } from '../../../utils/emitter';
import ModalEditClinic from './ModalEditClinic';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            isOpenModalClinic: false,
            isOpenModalEditClinic: false,
            clinicEdit: {},

            listClinics: [],

            filterName: '',
            filterAddress: '',

            page: 1,
            size: 5,
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
        if (prevProps.allRequiredDoctorInfo.responseClinic !== this.props.allRequiredDoctorInfo.responseClinic
        ) {

            this.setState({
                listClinics: this.props.allRequiredDoctorInfo.responseClinic,
                pageCount: this.props.allRequiredDoctorInfo.pageCountClinic.pages
            })
        }
        if (prevState.page !== this.state.page || prevState.size !== this.state.size) {
            this.handleCallClinic();
        }
        if (prevProps.allRequiredDoctorInfo && prevProps.allRequiredDoctorInfo.pageCountClinic && prevProps.allRequiredDoctorInfo.pageCountClinic.pages < this.state.page) {
            this.setState({
                page: this.state.pageCount
            })
        }

    }

    handleCallClinic = () => {
        this.props.fetchAllScheduleTimeRedux({
            page: this.state.page,
            size: this.state.size,
            filterName: this.state.filterName,
            filterAddress: this.state.filterAddress,

        }, () => {
            this.setState({
                pageCount: this.props.allRequiredDoctorInfo.pageCountClinic.pages
            })
        });
    }
    toggleClinicModal = () => {
        this.setState({
            isOpenModalClinic: !this.state.isOpenModalClinic,
        })
    }

    handleShowModal = () => {
        this.setState({
            isOpenModalClinic: true,
        })
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    toggleClinicEditModal = () => {
        this.setState({
            isOpenModalEditClinic: !this.state.isOpenModalEditClinic,
        })
    }



    handleSaveClinic = async (data) => {
        let response = await createNewClinic(data)

        if (response && response.error !== null) {
            toast.error(response.message);
        } else {
            toast.success("Save clinic success");
            this.handleCallClinic();
            this.setState({
                isOpenModalClinic: false
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
            size: this.state.size
        });
    };


    handleEditClinic = (clinic) => {
        this.setState({
            isOpenModalEditClinic: true,
            clinicEdit: clinic
        })
    }

    doEditClinic = async (clinic) => {
        try {
            let response = await putClinic(clinic);
            if (response && response.error !== null) {
                toast.error("Edit clinic error");
            } else {
                toast.success("Edit clinic success");
                this.handleCallClinic();
                this.setState({
                    isOpenModalEditClinic: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteClinic = async (clinic) => {
        let response = await deleteClinic({ id: clinic.id })
        if (response && response.error === null) {
            toast.success("Delete clinic success");
            this.props.fetchAllScheduleTimeRedux({
                page: this.state.page,
                size: this.state.size
            });
        } else {
            toast.error("Delete clinic error");

        }
    }
    handleSearch = () => {
        this.handleCallClinic();
    }
    handleRefreshFilter = () => {
        this.setState({
            filterName: '',
            filterAddress: ''
        }, () => {
            this.handleCallClinic();
        })
    }

    render() {
        let { language } = this.props;
        let { listClinics, pageCount } = this.state;
        return (
            <>
                < ModalAddClinic
                    isOpen={this.state.isOpenModalClinic}
                    toggleFormParent={this.toggleClinicModal}
                    handleSaveClinic={this.handleSaveClinic}
                />
                <ModalEditClinic
                    isOpen={this.state.isOpenModalEditClinic}
                    toggleFormParent={this.toggleClinicEditModal}
                    currentClinic={this.state.clinicEdit}
                    editClinic={this.doEditClinic}
                />
                <div className="manage-specialty-container">
                    <div className="ms-title">Quản lý phòng khám</div>
                    <div className="container">
                        <div className="row line-search">
                            <div className="col-4">
                                <span>Name: </span>
                                <input type="text" placeholder="Nhập dữ liệu"
                                    value={this.state.filterName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterName')} />
                            </div>
                            <div className="col-4">
                                <span>Address: </span>
                                <input type="text" placeholder="Nhập dữ liệu"
                                    value={this.state.filterAddress}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterAddress')} />
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
                        <div className="row table-clinics">
                            <div className="col-6">
                                <div className="title-table"><span>Danh sách phòng khám</span></div>
                            </div>
                            <div className="col-6 line-add">
                                <div className="btn-show-modal-add">
                                    <button
                                        onClick={() => this.handleShowModal()}><i className="fas fa-plus"></i>Thêm
                                    </button>
                                </div>
                                <div className="refresh">
                                    <i className="fas fa-sync"></i>
                                </div>
                            </div>

                            <div className="col-12">
                                <table className="table table-bordered table-hover  table-rounded">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="first col1">Stt</th>
                                            <th className="col2">Name</th>
                                            <th className="col3">Image</th>
                                            <th className="col4">Address</th>
                                            <th className="col5">Create at</th>
                                            <th className="col6">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {listClinics && listClinics.length > 0 ?
                                            listClinics.map((item, index) => {
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
                                                            <td>{item.address}</td>
                                                            <td>{moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                            <td><button
                                                                onClick={() => this.handleEditClinic(item)}
                                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                                                <button
                                                                    onClick={() => { this.handleDeleteClinic(item) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
