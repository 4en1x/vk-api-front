import axios from 'axios';
import userService from '../../service/user-service';

axios.defaults.withCredentials = true;

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const REGISTRATION = 'REGISTRATION';

function addUser(user) {
    return {
        type: ADD_USER,
        user,
    };
}

function registerUser(data) {
    return {
        type: REGISTRATION,
        vkAuthLink: data.redirect,
        userId: data.id,
    };
}

function removeUser() {
    return {
        type: REMOVE_USER,
        user: {},
    };
}

export function login(user, handler, t) {
    return (dispatch) => {
        userService.login(user)
            .then((response) => {
                dispatch(addUser(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function logout(handler, t) {
    return (dispatch) => {
        userService.logout()
            .then(() => { dispatch(removeUser()); })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function register(user, handler, t) {
    return (dispatch) => {
        userService.register(user)
            .then((response) => {
                dispatch(registerUser(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function sendToken(token, handler, t) {
    return () => {
        userService.sendToken(token)
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
