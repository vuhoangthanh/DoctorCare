import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/v1/auth/login', { username: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/v1/users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/v1/users`, data)
}
const editUserService = (inputData) => {
    return axios.put(`/api/v1/users`, inputData)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/v1/users/${userId}`)

    // return axios.delete('/api/delete-user', {
    //     data: {
    //         id: userId
    //     }
    // })
}

const getAllCodeService = (inputData) => {
    return axios.get(`/api/v1/allcodes`, { type: inputData })
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService
}