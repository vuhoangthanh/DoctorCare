import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/v1/auth/login', { username: userEmail, password: userPassword })
}

const getAllUsers = (data) => {
    return axios.get(`/api/v1/users?page=${data.page}&size=${data.size}&filter=email~'${data.filterEmail}' and firstName~ '${data.filterName}' and address ~'${data.filterAddress}'`)
}

const getAllUsersPage = (data) => {
    return axios.get(`/api/v1/users?page=${data.page}&size=${data.size}&filter=email~'${data.filterEmail}' and firstName~ '${data.filterName}' and address ~'${data.filterAddress}'`)
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
const getAllDoctorService = (data) => {
    return axios.get(`/api/v1/doctors?page=${data.page}&size=${data.size}&filter=firstName~ '${data.filterName}' and positionId ~'${data.filterPosition}'`)
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
const putSpecialty = (data) => {
    return axios.put(`/api/v1/specialties`, data)
}
const deleteSpecialty = (data) => {
    return axios.delete(`/api/v1/specialties?id=${data.id}`)
}
const getAllSpecialty = (data) => {
    return axios.get(`/api/v1/specialties?page=${data.page}&size=${data.size}&filter=name~'${data.filterName}'`)
}
const getDetailSpecialty = (data) => {
    return axios.get(`/api/v1/get-specialties-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/v1/clinics`, data)
}

const getAllClinic = (data) => {
    return axios.get(`/api/v1/clinics?page=${data.page}&size=${data.size}&filter=name~'${data.filterName}' and address~'${data.filterAddress}'`)
}
const putClinic = (data) => {
    return axios.put(`/api/v1/clinics`, data)
}
const deleteClinic = (data) => {
    return axios.delete(`/api/v1/clinics?id=${data.id}`)
}
const getClinicById = (data) => {
    return axios.get(`/api/v1/clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/v1/bookings?doctorId=${data.doctorId}&date=${data.date}`)
}
const getAllPatientForDate = (data) => {
    return axios.get(`/api/v1/date-bookings?date=${data.date}`)
}

const deleteBooking = (data) => {
    return axios.delete(`/api/v1/bookings?id=${data.id}`)
}


const postSendRemedy = (data) => {
    return axios.post(`/api/v1/remedies`, data)
}
const register = (data) => {
    return axios.post(`/api/v1/register`, data)
}

const getAllStatistic = (data) => {
    return axios.get(`/api/v1/statistics?page=${data.page}&size=${data.size}`)
}

const getAllHandBook = (data) => {
    return axios.get(`/api/v1/handbooks?page=${data.page}&size=${data.size}&filter=title ~ '${data.filterTitle}' and specialtyData.name~ '${data.filterSpecialty}'`)
}
const postHandBook = (data) => {
    return axios.post(`/api/v1/handbooks`, data)
}
const deleteHandBook = (data) => {
    return axios.delete(`/api/v1/handbooks?id=${data.id}`)
}
const putHandBook = (data) => {
    return axios.put(`/api/v1/handbooks`, data)
}
const getHandBookById = (data) => {
    return axios.get(`/api/v1/handbook-by-id?id=${data.id}`)
}
const getHandBookBySpecialty = (data) => {
    return axios.get(`/api/v1/handbook-by-specialty?id=${data.id}`)
}
const sendCodeForgotPassword = (data) => {
    return axios.post(`/api/v1/send-code-forgot-password`, data)
}
const postForgotPassword = (data) => {
    return axios.post(`/api/v1/forgot-password`, data)
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
    getAllUsersPage,
    putClinic,
    deleteClinic,
    deleteSpecialty,
    putSpecialty,
    register,
    getAllPatientForDate,
    deleteBooking,
    getAllStatistic,
    getAllHandBook,
    postHandBook,
    deleteHandBook,
    putHandBook,
    getHandBookById,
    getHandBookBySpecialty,
    sendCodeForgotPassword,
    postForgotPassword
}