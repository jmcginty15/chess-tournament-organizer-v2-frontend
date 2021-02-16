import { Card, CardBody, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { startTournament } from './actions/ind_tournaments';
import { startTeamTournament } from './actions/team_tournaments';

const DirectorTools = ({ type }) => {
    const tournament = useSelector(state => state.tournaments.tournament);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const dispatch = useDispatch();
    const [startingTournament, setStartingTournament] = useState(false);

    useEffect(() => {
        if (tournament.games || tournament.matches) setStartingTournament(false);
    }, [tournament]);

    const handleStart = () => {
        if (loggedInUser.username === tournament.director) {
            setStartingTournament(true);
            if (type === 'I') dispatch(startTournament(tournament.id, loggedInUser._token));
            else dispatch(startTeamTournament(tournament.id, loggedInUser._token));
        }
    }

    return (
        <div className="DirectorTools">
            {tournament ? (
                <Card>
                    {startingTournament ? (
                        <CardBody>
                            <h3>Starting tournament</h3>
                            <h4>Please wait...</h4>
                            <h5>This may take a moment</h5>
                        </CardBody>
                    ) : (
                            <CardBody>
                                <Button color="secondary" outline onClick={handleStart}>Start tournament</Button>
                            </CardBody>
                        )}
                </Card>
            ) : null}
        </div>
    )
}

export default DirectorTools;