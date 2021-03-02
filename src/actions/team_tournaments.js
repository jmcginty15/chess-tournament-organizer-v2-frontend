import { BASE_URL } from './config';
import { gotTournament, enteredTournament, createdTournament, deletedTournament } from './ind_tournaments';
import axios from 'axios';

export const loadTeamTournament = (id) => {
    /** Loads a team tournament to the app state */
    return async function (dispatch) {
        try {
            const res = await axios.get(`${BASE_URL}/tournaments/team/${id}`);
            const tournament = res.data.tournament;
            dispatch(gotTournament(tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const enterTeamTournament = (id, username, token) => {
    /** Enters the logged in user to a team tournament */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/tournaments/team/${id}/${username}/enter`, { _token: token });
            const entry = res.data.entry;
            dispatch(enteredTournament(entry));
        } catch (err) {
            console.log(err);
        }
    }
}

export const createTeamTournament = (tournament) => {
    /** Creates a team tournament */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/tournaments/team/create`, tournament);
            const newTournament = res.data.tournament;
            dispatch(createdTournament(newTournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const startTeamTournament = (id, token) => {
    /** Starts a team tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/team/${id}/initialize`, { _token: token });
            dispatch(loadTeamTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const endTeamRound = (id, token) => {
    /** Ends the current round of a team tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/team/${id}/end_round`, { _token: token });
            dispatch(loadTeamTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const endTeamTournament = (id, token) => {
    /** Ends a team tournament */
    return async function (dispatch) {
        try {
            await axios.post(`${BASE_URL}/tournaments/team/${id}/end_tournament`, { _token: token });
            dispatch(loadTeamTournament(id));
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteTeamTournament = (id, token) => {
    /** Deletes a team tournament */
    return async function (dispatch) {
        try {
            await axios.delete(`${BASE_URL}/tournaments/team/${id}`, { data: { _token: token } });
            dispatch(deletedTournament());
        } catch (err) {
            console.log(err);
        }
    }
}
