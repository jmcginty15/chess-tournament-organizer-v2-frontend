import { LOGIN, LOGOUT, ERROR } from '../actions/config';

const INITIAL_STATE = {};

// Users reducer
const users = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInUser: { ...action.payload.user },
                errMessage: null
            };
        case LOGOUT:
            return {
                ...state,
                loggedInUser: null,
                errMessage: null
            };
        case ERROR:
            return { ...state, errMessage: action.payload.errMessage }
        default:
            return state;
    }
}

export default users;