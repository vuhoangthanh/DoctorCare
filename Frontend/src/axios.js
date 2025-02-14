import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});


// instance.interceptors.response.use(
//     (response) => {

//         const { data } = response;
//         return response.data;
//     })

// Interceptor xử lý response
instance.interceptors.response.use(
    response => response.data, // Luôn trả về dữ liệu từ response
    error => {
        return error.response ? error.response.data : {
            statusCode: 200,
            message: 'Lỗi không xác định',
            error: error.message
        };
    }
);

export default instance;