import { Card, CardBody, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { startTournament, endRound, endTournament } from './actions/ind_tournaments';
import { startTeamTournament } from './actions/team_tournaments';
import { countRemainingGames } from './helpers/games';
import './DirectorTools.css';

const DirectorTools = ({ type }) => {
    const [confirmingRoundEnd, setConfirmingRoundEnd] = useState(false);
    const [confirmingTournamentEnd, setConfirmingTournamentEnd] = useState(false);
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

    const handleClick = (evt) => {
        if (evt.target.id === 'end-round') setConfirmingRoundEnd(true);
        if (evt.target.id === 'end-tournament') setConfirmingTournamentEnd(true);
    }

    const handleCancel = (evt) => {
        if (evt.target.id === 'end-round-cancel') setConfirmingRoundEnd(false);
        if (evt.target.id === 'end-tournament-cancel') setConfirmingTournamentEnd(false);
    }

    const confirmRoundEnd = (evt) => {
        if (evt.target.id === 'end-round-confirm') {
            dispatch(endRound(tournament.id, loggedInUser._token));
            setConfirmingRoundEnd(false);
        }
        if (evt.target.id === 'end-tournament-confirm') {
            dispatch(endTournament(tournament.id, loggedInUser._token));
            setConfirmingTournamentEnd(false);
        }
    }

    const remainingGames = tournament ? countRemainingGames(tournament.games, tournament.currentRound) : null;

    return (
        <div className="DirectorTools">
            {tournament ? (
                <div>
                    {tournament.currentRound === 0 ? (
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
                    {tournament.currentRound > 0 ? (
                        <Card>
                            <CardBody>
                                <h6>Current round: {tournament.currentRound}</h6>
                                <h6>Games remaining: {remainingGames}</h6>
                                {tournament.currentRound < tournament.rounds ? (
                                    <CardBody>
                                        {confirmingRoundEnd ? (
                                            <div>
                                                {remainingGames === 0 ? <p>Confirm end of round?</p> : (
                                                    <div>
                                                        <p>
                                                            There {remainingGames === 1 ? 'is' : 'are'} {remainingGames} game{remainingGames === 1 ? '' : 's'} yet
                                                            to be reported this round. These will be counted as double
                                                            forfeits if not reported before you end the round.
                                                        </p>
                                                        <p>
                                                            Are you sure you want to end the round now?
                                                        </p>
                                                    </div>
                                                )}
                                                <Button id="end-round-confirm" color="success" outline onClick={confirmRoundEnd}>Confirm</Button>
                                                <Button id="end-round-cancel" className="DirectorTools-cancel" color="danger" outline onClick={handleCancel}>Cancel</Button>
                                            </div>
                                        ) : <Button id="end-round" color="secondary" outline onClick={handleClick}>End round and start next round</Button>}
                                    </CardBody>
                                ) : null}
                                {confirmingTournamentEnd ? (
                                    <div>
                                        {remainingGames === 0 && tournament.currentRound === tournament.rounds ? (
                                            <p>Confirm end of tournament?</p>
                                        ) : (
                                                <div>
                                                    {remainingGames === 0 ? null : (
                                                        <p>
                                                            There {remainingGames === 1 ? 'is' : 'are'} {remainingGames} game{remainingGames === 1 ? '' : 's'} yet
                                                            to be reported this round. These will be counted as double
                                                            forfeits if not reported before you end the round.
                                                        </p>
                                                    )}
                                                    {tournament.currentRound === tournament.rounds ? null : (
                                                        <p>
                                                            The tournament is scheduled for {tournament.rounds} rounds,
                                                            but it is currently only round {tournament.currentRound}.
                                                        </p>
                                                    )}
                                                    <p>
                                                        Are you sure you want to end the tournament now?
                                                    </p>
                                                </div>
                                            )}
                                        <Button id="end-tournament-confirm" color="success" outline onClick={confirmRoundEnd}>Confirm</Button>
                                        <Button id="end-tournament-cancel" className="DirectorTools-cancel" color="danger" outline onClick={handleCancel}>Cancel</Button>
                                    </div>
                                ) : <Button id="end-tournament" color="secondary" outline onClick={handleClick}>End round and tournament</Button>}
                            </CardBody>
                        </Card>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default DirectorTools;