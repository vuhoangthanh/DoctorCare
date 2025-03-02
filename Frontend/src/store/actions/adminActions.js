import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorService,
    getAllDoctorService,
    saveDetailDoctorService,
    editDetailDoctorService
} from '../../services/userService';
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let response = await getAllCodeService("GENDER");
            if (response && response.error === null) {
                dispatch(fetchGenderSuccess(response.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = (genderData) => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("POSITION");
            if (response && response.error === null) {
                dispatch(fetchPositionSuccess(response.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositionFailed = (positionData) => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("ROLE");
            if (response && response.error === null) {
                dispatch(fetchRoleSuccess(response.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = (roleData) => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

export const addNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.error === null) {
                toast.success("Create a new user succeed");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('add user failed error', e)
        }
    }
};

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers();
            if (response && response.error === null) {

                dispatch(fetchAllUsersSuccess(response.data.result.reverse()))
            } else {
                toast.error("Fetch All user error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch All user error!");
            dispatch(fetchAllUsersFailed());
            console.log('add user failed error', e)
        }
    }
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_All_USERS_SUCCESS,
    users: data
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_All_USERS_FAILED
});


export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserService(userId);
            if (response && response.error === null) {
                toast.success("Delete the user succeed");
                dispatch(deleteUserSuccess(response.data))
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete the user error");
                dispatch(fetchAllUsersStart());
            }
        } catch (e) {
            dispatch(fetchAllUsersStart());
            console.log('add user failed error', e)
        }
    }
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
});

export const editAUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUserService(user);
            if (response && response.error === null) {
                toast.success("Edit the user succeed");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Edit the user error");
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log('Edit user failed error', e)
        }
    }
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
});

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorService(10);
            if (response && response.error === null) {
                dispatch(fetchTopDoctorsSuccess(response.data))
            } else {
                toast.error("fetch top doctors error");
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailed());
            console.log('fetch top doctors error', e)
        }
    }
};

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: data
});

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
});

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorService();

            if (response && response.error === null) {
                dispatch(fetchAllDoctorsSuccess(response.data))
            } else {
                toast.error("fetch top doctors error");
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
            console.log('fetch top doctors error', e)
        }
    }
};

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_All_DOCTORS_SUCCESS,
    data: data
});

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_All_DOCTORS_FAILED
});

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("TIME");

            if (response && response.error === null) {
                dispatch(fetchAllScheduleSuccess(response.data))

            } else {
                toast.error("fetch top doctors error");
                dispatch(fetchAllScheduleFailed());
            }
        } catch (e) {
            dispatch(fetchAllScheduleFailed());
            console.log('fetch top doctors error', e)
        }
    }
};

export const fetchAllScheduleSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
});

export const fetchAllScheduleFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
});


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDetailDoctorService(data);

            if (response && response.error === null) {
                toast.success("save detail doctors success");
                dispatch(saveDetailDoctorSuccess())
            } else {
                toast.error("save doctors error");
                dispatch(saveDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(saveDetailDoctorFailed());
            console.log('save detail doctors error', e)
        }
    }
};

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
});
export const editDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await editDetailDoctorService(data);

            if (response && response.error === null) {
                toast.success("edit detail doctors success");
                dispatch(editDetailDoctorSuccess())
            } else {
                toast.error("edit doctors error");
                dispatch(editDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(editDetailDoctorFailed());
            console.log('edit detail doctors error', e)
        }
    }
};

export const editDetailDoctorSuccess = () => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_SUCCESS,
});

export const editDetailDoctorFailed = () => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_FAILED
});

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
            let responsePrice = await getAllCodeService("PRICE");
            let responsePayment = await getAllCodeService("PAYMENT");
            let responseProvince = await getAllCodeService("PROVINCE");

            if (responsePrice && responsePrice.error === null
                && responsePayment && responsePayment.error === null
                && responseProvince && responseProvince.error === null
            ) {
                let data = {
                    responsePrice: responsePrice.data,
                    responsePayment: responsePayment.data,
                    responseProvince: responseProvince.data
                }
                dispatch(fetchDoctorInfoSuccess(data))
            } else {
                dispatch(fetchDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchDoctorInfoFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};

export const fetchDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
});

export const fetchDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
});
