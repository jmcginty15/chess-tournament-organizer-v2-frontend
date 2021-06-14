import { BASE_URL } from './config';
import { loadTournament } from './ind_tournaments';
import axios from 'axios';

export const scheduleGame = (id, schedule, token) => {
    /** Schedules a game for an individual tournament */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/games/ind/${id}/schedule`, { schedule: schedule, _token: token });
            const game = res.data.game;
            dispatch(loadTournament(game.tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const reportGame = (id, lichessId, token) => {
    /** Reports a game for an individual tournament */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/games/ind/${id}/report`, { lichessId: lichessId, _token: token });
            const game = res.data.game;
            dispatch(loadTournament(game.tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const assignForfeit = (id, winner, token) => {
    /** Assigns a forfeit to a game of an individual tournament */
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/games/ind/${id}/forfeit`, { winner: winner, _token: token});
            const game = res.data.game;
            dispatch(loadTournament(game.tournament));
        } catch (err) {
            console.log(err);
        }
    }
}