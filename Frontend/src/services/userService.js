import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/v1/auth/login', { username: userEmail, password: userPassword })
}

const getAllUsers = (data) => {
    return axios.get(`/api/v1/users?page=${data.page}&size=${data.size}`)
}

const getAllUsersPage = (data) => {
    return axios.get(`/api/v1/users?page=${data.page}&size=${data.size}`)
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
    return axios.get(`/api/v1/allcodes?type=${inputData}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/v1/top-doctors?limit=${limit}`)
}
const getAllDoctorService = () => {
    return axios.get(`/api/v1/doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/v1/doctors-infor`, data)
}
const editDetailDoctorService = (data) => {
    return axios.put(`/api/v1/doctors-infor`, data)
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/v1/doctors-detail/${id}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/v1/schedules`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/v1/schedules?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/v1/doctors-extra-info?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/v1/doctors-profile?doctorId=${doctorId}`)
}

const postPatientBookAppoint = (data) => {
    return axios.post(`/api/v1/patient-book-appointment`, data)
}

const putVerifyBookingAppointment = (data) => {
    return axios.put(`/api/v1/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/v1/specialties`, data)
}

const getAllSpecialty = (data) => {
    return axios.get(`/api/v1/specialties?page=${data.page}&size=${data.size}`)
}
const getDetailSpecialty = (data) => {
    return axios.get(`/api/v1/get-specialties-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/v1/clinics`, data)
}

const getAllClinic = (data) => {
    return axios.get(`/api/v1/clinics?page=${data.page}&size=${data.size}`)
}
const getClinicById = (data) => {
    return axios.get(`/api/v1/clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/v1/bookings?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/v1/remedies`, data)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    editDetailDoctorService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppoint,
    putVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    createNewClinic,
    getAllClinic,
    getClinicById,
    getAllPatientForDoctor,
    postSendRemedy,
    getAllUsersPage
}