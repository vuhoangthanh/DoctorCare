import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import './store/reducers/userReducer'
// import config from './config';
import storage from 'redux-persist/lib/storage';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});



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
// if (JSON.parse(localStorage.getItem("persist:user")).token !== "null") {
//     instance.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:user")).token).accessToken}`;
// }

const userData = localStorage.getItem("persist:user");

if (userData) {
    try {
        const parsedData = JSON.parse(userData);
        if (parsedData.token && parsedData.token !== "null") {
            const tokenObj = JSON.parse(parsedData.token);
            instance.defaults.headers.common["Authorization"] = `Bearer ${tokenObj.accessToken}`;
        }
    } catch (error) {
        console.error("Lỗi khi parse dữ liệu user:", error);
    }
}



export default instance;