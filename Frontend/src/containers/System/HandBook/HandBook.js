import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './HandBook.scss'
import { getAllHandBook, postHandBook, deleteHandBook, putHandBook } from '../../../services/userService'
import ModalAddHandBook from './ModalAddHandBook'
import { emitter } from '../../../utils/emitter';
import { toast } from "react-toastify";
import ModalEditHandBook from './HandleEditHandBook'
import Pagination from '../Pagination/Pagination';

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            size: 5,
            filterTitle: '',
            filterSpecialty: '',
            pageCount: '',

            handBooks: [],
            handBookEdit: {},

            isOpenModalHandBook: false,
            isOpenModalEditHandBook: false,
        }
    }
    async componentDidMount() {
        this.handleGetAllHandBook();
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

    handleGetAllHandBook = async () => {
        let response = await getAllHandBook({
            page: this.state.page,
            size: this.state.size,
            filterTitle: this.state.filterTitle,
            filterSpecialty: this.state.filterSpecialty
        });

        if (response && response.error === null) {
            this.setState({
                handBooks: response.data.result,
                pageCount: response.data && response.data.meta ? response.data.meta.pages : ''
            })
        }
    }

    toggleHandBookModal = () => {
        this.setState({
            isOpenModalHandBook: !this.state.isOpenModalHandBook,
        })
    }
    toggleHandBookEditModal = () => {
        this.setState({
            isOpenModalEditHandBook: !this.state.isOpenModalEditHandBook,
        })
    }
    handleShowModal = () => {
        this.setState({
            isOpenModalHandBook: true,
        })
    }

    handleSaveHandBook = async (data) => {
        let response = await postHandBook(data)

        if (response && response.error !== null) {
            toast.error(response.message);
        } else {
            toast.success("Save handbook success");
            this.handleGetAllHandBook();
            this.setState({
                isOpenModalHandBook: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        }
    }
    handleDeleteHandBook = async (data) => {
        let response = await deleteHandBook({
            id: data.id
        })

        if (response && response.error !== null) {
            toast.error(response.message);
        } else {
            toast.success("Delete handbook success");
            this.handleGetAllHandBook();
        }
    }
    handleEditHandBook = (handBook) => {
        this.setState({
            isOpenModalEditHandBook: true,
            handBookEdit: handBook
        })
    }
    doEditHandBook = async (handBook) => {
        try {
            let response = await putHandBook(handBook);
            if (response && response.error !== null) {
                toast.error("Edit handBook error");
            } else {
                toast.success("Edit handBook success");
                this.handleGetAllHandBook();
                this.setState({
                    isOpenModalEditHandBook: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        }, () => {
            this.handleGetAllHandBook();
        }
        )

    };
    handleSearch = () => {
        this.handleGetAllHandBook();
    }
    handleRefreshFilter = () => {
        this.setState({
            filterSpecialty: '',
            filterTitle: ''

        }, () => {
            this.handleGetAllHandBook();
        })
    }
    render() {
        let { language } = this.props;
        let { handBooks, pageCount } = this.state;
        console.log('fss', this.state)
        return (
            <>
                <ModalAddHandBook
                    isOpen={this.state.isOpenModalHandBook}
                    toggleFormParent={this.toggleHandBookModal}
                    handleSaveHandBook={this.handleSaveHandBook}
                />
                <ModalEditHandBook
                    isOpen={this.state.isOpenModalEditHandBook}
                    toggleFormParent={this.toggleHandBookEditModal}
                    currentHandBook={this.state.handBookEdit}
                    editHandBook={this.doEditHandBook}
                />
                <div className="handbook-container">
                    <div className="mh-title"><FormattedMessage id="admin.hand-book.title-all" /></div>
                    <div className="container">
                        <div className="row line-search">
                            <div className="col-4">
                                <span>Chuyên khoa: </span>
                                <input type="text" placeholder="Nhập dữ liệu"
                                    value={this.state.filterSpecialty}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterSpecialty')} />
                            </div>
                            <div className="col-4">
                                <span>Tiêu để: </span>
                                <input type="text" placeholder="Nhập dữ liệu"
                                    value={this.state.filterTitle}
                                    onChange={(event) => this.handleOnChangeInput(event, 'filterTitle')} />
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
                        <div className="row table-handbook">
                            <div className="col-6">
                                <div className="title-table"><span><FormattedMessage id="admin.hand-book.title-table" /></span></div>
                            </div>
                            <div className="col-6 line-add">
                                <div className="btn-show-modal-add">
                                    <button
                                        onClick={() => this.handleShowModal()}><i className="fas fa-plus"></i><FormattedMessage id="admin.hand-book.btn-add-outside" />
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
                                            <th className="first col1"><FormattedMessage id="admin.hand-book.no" /></th>
                                            <th className="col2"><FormattedMessage id="admin.hand-book.title" /></th>
                                            <th className="col3"><FormattedMessage id="admin.hand-book.thumbnail" /></th>
                                            <th className="col4"><FormattedMessage id="admin.hand-book.specialty" /></th>
                                            <th className="col5"><FormattedMessage id="admin.hand-book.created-at" /></th>
                                            <th className="col6"><FormattedMessage id="admin.hand-book.create-by" /></th>
                                            <th className="col7"><FormattedMessage id="admin.hand-book.actions" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {handBooks && handBooks.length > 0 ?
                                            handBooks.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="first col1">{item.id}</td>
                                                        <td className="col2">{item.title}</td>
                                                        <td className="col3">
                                                            <div className="bg-image"
                                                                style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                            </div>
                                                        </td>
                                                        <td className="col4">{item.specialtyData.name}</td>
                                                        <td className="col5">{moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                        <td className="col6">{item.createdBy}</td>
                                                        <td className="col7">
                                                            <button
                                                                onClick={() => this.handleEditHandBook(item)}
                                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                                            <button
                                                                onClick={() => { this.handleDeleteHandBook(item) }}
                                                                className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            "No data"
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                pageCount={pageCount}
                                handlePageClick={this.handlePageClick} // Không cần arrow function
                            />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
