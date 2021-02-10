import { BASE_URL, LOAD_TOURNAMENT, ENTER_TOURNAMENT } from './config';
import axios from 'axios';

export const loadTournament = (id) => {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${BASE_URL}/tournaments/ind/${id}`);
            const tournament = res.data.tournament;
            dispatch(gotTournament(tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const enterTournament = (id, username, token) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/tournaments/ind/${id}/${username}/enter`, { _token: token });
            const entry = res.data.entry;
            dispatch(enteredTournament(entry));
        } catch (err) {
            console.log(err);
        }
    }
}

const gotTournament = (tournament) => {
    return {
        type: LOAD_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}

const enteredTournament = (entry) => {
    return {
        type: ENTER_TOURNAMENT,
        payload: {
            entry: entry
        }
    };
}