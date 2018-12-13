import axios from 'axios';

axios.defaults.withCredentials = true;

function login(user) {
    return axios.post('http://localhost:8080/users/login', user);
}

function register(user) {
    return axios.post('http://localhost:8080/users/register', user);
}

function sendToken(data) {
    return axios.post('http://localhost:8080/users/vkToken', data);
}

function logout() {
    return axios.post('http://localhost:8080/users/logout');
}

const userService = {
    login,
    logout,
    register,
    sendToken,
};

export default userService;
