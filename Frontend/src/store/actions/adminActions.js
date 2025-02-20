import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';
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
