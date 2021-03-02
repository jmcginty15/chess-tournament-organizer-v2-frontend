import { BASE_URL, LOAD_TOURNAMENT, ENTER_TOURNAMENT, CREATE_TOURNAMENT, DELETE_TOURNAMENT } from './config';
import axios from 'axios';

export const loadTournament = (id) => {
    /** Loads an individual tournament to the app state */
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
    /** Enters the logged in user to an individual tournament */
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
    /** Creates an individual tournament */
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
    /** Starts an individual tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/ind/${id}/initialize`, { _token: token });
            dispatch(loadTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const endRound = (id, token) => {
    /** Ends the current round of an individual tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/ind/${id}/end_round`, { _token: token });
            dispatch(loadTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const endTournament = (id, token) => {
    /** Ends an individual tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/ind/${id}/end_tournament`, { _token: token });
            dispatch(loadTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteTournament = (id, token) => {
    /** Deletes an individual tournament */
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}/tournaments/ind/${id}`, { data: { _token: token } });
            dispatch(deletedTournament());
        } catch (err) {
            console.log(err);
        }
    }
}

export const gotTournament = (tournament) => {
    /** Updates state after tournament load */
    return {
        type: LOAD_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}

export const enteredTournament = (entry) => {
    /** Updates state after tournament entry */
    return {
        type: ENTER_TOURNAMENT,
        payload: {
            entry: entry
        }
    };
}

export const createdTournament = (tournament) => {
    /** Updates state after tournament creation */
    return {
        type: CREATE_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}

export const deletedTournament = () => {
    /** Updates state after tournament deletion */
    return {
        type: DELETE_TOURNAMENT
    };
}