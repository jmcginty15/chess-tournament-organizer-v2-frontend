import { BASE_URL } from './config';
import { loadTeamTournament } from './team_tournaments';
import axios from 'axios';

export const scheduleTeamGame = (id, schedule, token) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/games/team/${id}/schedule`, { schedule: schedule, _token: token });
            const game = res.data.game;
            dispatch(loadTeamTournament(game.tournament));
        } catch (err) {
            console.log(err);
        }
    }
}

export const reportTeamGame = (id, lichessId, token) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/games/team/${id}/report`, { lichessId: lichessId, _token: token });
            const game = res.data.game;
            dispatch(loadTeamTournament(game.tournament));
        } catch (err) {
            console.log(err);
        }
    }
}