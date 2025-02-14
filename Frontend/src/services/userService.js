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

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService
}