import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService, createNewUserService } from "../../../services/userService"
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import Pagination from '../Pagination/Pagination';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewAvatarURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: '',

            page: 1,
            size: 10,




        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại (this) và quá khứ (prev)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''

            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewAvatarURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeAvatar = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewAvatarURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewAvatar = () => {
        if (!this.state.previewAvatarURL) return;

        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        let { action } = this.state

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.addNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,

                page: this.state.page,
                size: this.state.size
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {

            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,

                page: this.state.page,
                size: this.state.size
            })
        }



    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: 'Hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phone,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: user.avatar,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewAvatarURL: user.avatar,
        })
    }
    handleCurrentPage = (page) => {
        this.setState({
            page: page
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        // let { token } = this.props
        // console.log("hello", token)

        let { email, password, firstName, lastName, address, gender, phoneNumber, position, role, avatar, pageCount } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title" ><FormattedMessage id="manage-user.add" /></div>
                <div className="user-redux-body" >

                    <div className="container">
                        <div className="row inp-user">
                            <div className="col-12">{isLoadingGender === true ? 'Loading Gender...' : ''}</div>

                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className="col-4">
                                <label className="required"><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className="col-3">
                                <label className="required"><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >

                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="required"><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >

                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="required"><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >

                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-3">
                                <label className="required"><FormattedMessage id="manage-user.avatar" /></label>
                                <div className="preview-avatar-container">
                                    <input id="previewAvatar" type="file" className="form-control" hidden
                                        onChange={(event) => this.handleOnChangeAvatar(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewAvatar">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-avatar"
                                        style={{ backgroundImage: `url(${this.state.previewAvatarURL})` }}
                                        onClick={() => this.openPreviewAvatar()}
                                    ></div>

                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>


                        </div>

                        <div className="row list-user">
                            <div className="col-6 title-table">
                                <span>Danh sách người dùng</span>
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
                            <div className=" col-12 mb-5 mt-5">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                    currentPageChange={this.handleCurrentPage}
                                    page={this.state.page}
                                    size={this.state.size} />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.previewAvatarURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        users: state.admin.users,
        // token: state.user.token,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        addNewUser: (data) => dispatch(actions.addNewUser(data)),
        fetchUserRedux: (data) => dispatch(actions.fetchAllUsersStart(data)),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
