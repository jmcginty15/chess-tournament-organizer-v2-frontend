import { LOAD_TOURNAMENT, ENTER_TOURNAMENT, CREATE_TOURNAMENT, DELETE_TOURNAMENT } from '../actions/config';

const INITIAL_STATE = {};

// Tournaments reducer
const tournaments = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_TOURNAMENT:
            return {
                ...state,
                tournament: { ...action.payload.tournament }
            };
        case ENTER_TOURNAMENT:
            const entries = [...state.tournament.entries];
            entries.push(action.payload.entry);

            return {
                ...state,
                tournament: {
                    ...state.tournament,
                    entries: [...entries]
                }
            };
        case CREATE_TOURNAMENT:
            return {
                ...state,
                tournament: {
                    ...action.payload.tournament,
                    entries: []
                }
            }
        case DELETE_TOURNAMENT:
            return {
                ...state,
                tournament: null
            }
        default:
            return state;
    }
}

export default tournaments;