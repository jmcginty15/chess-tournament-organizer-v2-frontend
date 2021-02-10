import { combineReducers } from "redux";
import config from './config';
import users from './users';
import tournaments from './tournaments';

const root = combineReducers({
    config,
    users,
    tournaments
});

export default root;