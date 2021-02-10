import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTournament } from './actions/ind_tournaments';
import TournamentInfo from './TournamentInfo';
import EntryList from './EntryList';
import './IndTournament.css';

const IndTournament = ({ id }) => {
    const tournament = useSelector(state => state.tournaments.tournament);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tournament) dispatch(loadTournament(id));
        else if (tournament.id !== id) dispatch(loadTournament(id));
    }, [id]);

    return (
        <div className="IndTournament">
            {tournament ? (
                <div>
                    <h1>{tournament.name}</h1>
                    <div className="IndTournament-body">
                        <TournamentInfo tournament={tournament} />
                        {tournament.currentRound ? null : <EntryList entries={tournament.entries} />}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default IndTournament;