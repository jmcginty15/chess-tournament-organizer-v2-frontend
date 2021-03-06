import { BASE_URL, LOGIN, LOGOUT, ERROR } from './config';
import axios from 'axios';

export const register = (user) => {
    /** Registers a new user */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, user);
            const registeredUser = res.data.user;
            const token = res.data._token;
            dispatch(loggedIn(registeredUser, token));
        } catch (err) {
            const errMessage = err.response.data.message;
            dispatch(error(errMessage));
        }
    }
}

export const updateUser = (username, userInfo, token) => {
    /** Updates user info */
    return async function (dispatch) {
        try {
            const res = await axios.patch(`${BASE_URL}/users/${username}/update`, { ...userInfo, _token: token });
            const updatedUser = res.data.user;
            dispatch(loggedIn(updatedUser, token));
        } catch (err) {
            const errMessage = err.response.data.message;
            dispatch(error(errMessage));
        }
    }
}

export const login = (username, password) => {
    /** Logs in a user */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { username: username, password: password });
            const user = res.data.user;
            const token = res.data._token;
            dispatch(loggedIn(user, token));
        } catch (err) {
            const errMessage = err.response.data.message;
            dispatch(error(errMessage));
        }
    }
}

const loggedIn = (user, token) => {
    /** Updates state after user login or register */
    return {
        type: LOGIN,
        payload: {
            user: {
                ...user,
                _token: token
            }
        }
    }
}

export const logout = () => {
    /** Logs a user out */
    return {
        type: LOGOUT
    }
}

const error = (message) => {
    /** Updates an error message in state */
    return {
        type: ERROR,
        payload: { errMessage: message }
    }
}