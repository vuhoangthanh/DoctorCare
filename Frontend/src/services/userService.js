import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/v1/auth/login', { username: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/v1/users?id=${inputId}`)
}

export {
    handleLoginApi,
    getAllUsers
}