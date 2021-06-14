import { Card, CardBody, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startTournament, endRound, endTournament, deleteTournament } from './actions/ind_tournaments';
import { startTeamTournament, endTeamRound, endTeamTournament, deleteTeamTournament } from './actions/team_tournaments';
import { countRemainingGames, countRemainingTeamGames, sortGames } from './helpers/games';
import ForfeitList from './ForfeitList';
import './DirectorTools.css';
import { sortMatches } from './helpers/matches';

// Director tools component
// Displays on a tournament page if the logged in user is the director of that tournament
// Provides buttons for starting or deleting the tournament, ending a round, or ending the tournament
const DirectorTools = ({ type, currentRound }) => {
    const [belowMin, setBelowMin] = useState(false);
    const [unevenEntries, setUnevenEntries] = useState(false);
    const [confirmingRoundEnd, setConfirmingRoundEnd] = useState(false);
    const [confirmingTournamentEnd, setConfirmingTournamentEnd] = useState(false);
    const [rounds, setRounds] = useState(null);
    const tournament = useSelector(state => state.tournaments.tournament);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const dispatch = useDispatch();
    const [startingTournament, setStartingTournament] = useState(false);
    const history = useHistory();
    const extraPlayers = tournament.entries.length % tournament.teamSize;

    useEffect(() => {
        if (tournament.games || tournament.matches) setStartingTournament(false);
        if (tournament && type === "I") setRounds(sortGames(tournament.games));
        else if (tournament && type === "T") setRounds(sortMatches(tournament.matches));
    }, [tournament]);

    const handleStartClick = () => {
        if (tournament.entries.length < tournament.minPlayers) setBelowMin(true);
        else if (tournament.teamSize && tournament.entries.length % tournament.teamSize !== 0) setUnevenEntries(true);
        else handleStart();
    }

    const handleBelowMinStart = () => {
        setBelowMin(false);
        if (tournament.entries.length % tournament.teamSize !== 0) setUnevenEntries(true);
        else handleStart();
    }

    const handleStart = () => {
        if (loggedInUser.username === tournament.director) {
            setBelowMin(false);
            setUnevenEntries(false);
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
        setBelowMin(false);
        setUnevenEntries(false);
        if (evt.target.id === 'end-round-cancel') setConfirmingRoundEnd(false);
        if (evt.target.id === 'end-tournament-cancel') setConfirmingTournamentEnd(false);
    }

    const handleDelete = () => {
        if (type === 'I') dispatch(deleteTournament(tournament.id, loggedInUser._token));
        if (type === 'T') dispatch(deleteTeamTournament(tournament.id, loggedInUser._token));
        history.push('/tournaments');
    }

    const confirmRoundEnd = (evt) => {
        if (evt.target.id === 'end-round-confirm') {
            if (type === 'I') dispatch(endRound(tournament.id, loggedInUser._token));
            if (type === 'T') dispatch(endTeamRound(tournament.id, loggedInUser._token));
            setConfirmingRoundEnd(false);
        }
        if (evt.target.id === 'end-tournament-confirm') {
            if (type === 'I') dispatch(endTournament(tournament.id, loggedInUser._token));
            if (type === 'T') dispatch(endTeamTournament(tournament.id, loggedInUser._token));
            setConfirmingTournamentEnd(false);
        }
    }

    let remainingGames = null;
    if (tournament && (tournament.matches || tournament.games)) {
        if (type === 'I') remainingGames = countRemainingGames(tournament.games, tournament.currentRound);
        if (type === 'T') remainingGames = countRemainingTeamGames(tournament.matches, tournament.currentRound);
    }

    return (
        <div className="DirectorTools">
            {tournament ? (
                <div>
                    {!tournament.ended ? (
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
                                            <div className="DirectorTools-div">
                                                {belowMin ? (
                                                    <div>
                                                        The mininmum number of players for this tournament is listed
                                                            as {tournament.minPlayers}, but there are only {tournament.entries.length} players
                                                            entered. Are you sure you want to start the tournament now?<br />
                                                        <Button className="DirectorTools-button" color="success" outline onClick={handleBelowMinStart}>Start</Button>
                                                        <Button className="DirectorTools-button" color="danger" outline onClick={handleCancel}>Don't start</Button>
                                                    </div>
                                                ) : null}
                                                {unevenEntries ? (
                                                    <div>
                                                        This tournament has teams of {tournament.teamSize} players, but
                                                            there are {tournament.entries.length} players currently entered.
                                                            If you start the tournament now, the last {extraPlayers === 1 ? 'player' : `${extraPlayers} players`} who
                                                            entered will be removed from the tournament due to not being
                                                            able to fill a full team. Are you sure you want to start the
                                                            tournament now?<br />
                                                        <Button className="DirectorTools-button" color="success" outline onClick={handleStart}>Start</Button>
                                                        <Button className="DirectorTools-button" color="danger" outline onClick={handleCancel}>Don't start</Button>
                                                    </div>
                                                ) : null}
                                                {!belowMin && !unevenEntries ? <Button className="DirectorTools-button" color="secondary" outline onClick={handleStartClick}>Start tournament</Button> : null}
                                            </div>
                                            <div className="DirectorTools-div"><Button className="DirectorTools-button" color="danger" outline onClick={handleDelete}>Delete tournament</Button></div>
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
                                        <hr />
                                        {rounds ? <ForfeitList round={rounds[currentRound]} type={type} /> : null}
                                    </CardBody>
                                </Card>
                            ) : null}
                        </div>
                    ) : (
                        <Card>
                            <CardBody>
                                <h5>This tournament has ended</h5>
                            </CardBody>
                        </Card>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default DirectorTools;