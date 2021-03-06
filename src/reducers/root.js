import { combineReducers } from "redux";
import config from './config';
import users from './users';
import tournaments from './tournaments';

// Root reducer
const root = combineReducers({
    config,
    users,
    tournaments
});

export default root;