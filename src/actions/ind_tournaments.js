import { BASE_URL, LOAD_TOURNAMENT, ENTER_TOURNAMENT, CREATE_TOURNAMENT } from './config';
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

export const createTournament = (tournament) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/tournaments/ind/create`, tournament);
            const newTournament = res.data.tournament;
            dispatch(createdTournament(newTournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const startTournament = (id, token) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/tournaments/ind/${id}/initialize`, { _token: token });
            const tournament = res.data.tournament;
            dispatch(gotTournament(tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const gotTournament = (tournament) => {
    return {
        type: LOAD_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}

export const enteredTournament = (entry) => {
    return {
        type: ENTER_TOURNAMENT,
        payload: {
            entry: entry
        }
    };
}

export const createdTournament = (tournament) => {
    return {
        type: CREATE_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}