const axios = require("axios");
const config = require('../../config')

var axiosInstance = axios.create({
    baseURL: config.url.api,
    headers: {
        "content-Type": "application/json; charset=UTF-8"
    }
});

axiosInstance.interceptors.response.use(response => {
    if (response.data.length === 0) {
        var error = new Error("服务端出错");
        error.status = 500;
        throw error;
    } else if (response.data.errorCode === 1012 || response.data.errorCode === 1013) {
        var error = new Error(response.data.errorMsg);
        error.status = 401;
        throw error;
    } else {
        return response;
    }
})

exports.login = async (username, password) => await axiosInstance.post(`/api/passport/login`, {
    username: username,
    password: password
});
exports.register = async data => await axiosInstance.post('/api/passport/register', data);


exports.userinfo = async (data, token) => await axiosInstance.post('/api/account/info', data, {
    headers: {
        token: token
    }
});

exports.edituserinfo = async (data, token) => await axiosInstance.post('/api/account/info/save', data, {
    headers: {
        token: token
    }
});

exports.editpassword = async (data, token) => await axiosInstance.post('/api/account/password/reset', data, {
    headers: {
        token: token
    }
});
