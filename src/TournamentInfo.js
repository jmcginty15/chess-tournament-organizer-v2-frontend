import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enterTournament } from './actions/ind_tournaments';
import { enterTeamTournament } from './actions/team_tournaments';
import { parseDate } from './helpers/dates';
import { capitalize } from './helpers/strings';
import InfoFooter from './InfoFooter';
import './TournamentInfo.css';

const TournamentInfo = ({ tournament }) => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const tournEntries = useSelector(state => state.tournaments.tournament.entries);
    const [alreadyEntered, setAlreadyEntered] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const followLink = (route) => history.push(route);

    useEffect(() => {
        if (loggedInUser) {
            for (let entry of tournEntries) if (entry.player === loggedInUser.username) {
                setAlreadyEntered(true);
                break;
            }
        }
    }, [loggedInUser, tournEntries]);

    const handleClick = () => {
        if (loggedInUser) {
            if (tournament.teamSize) dispatch(enterTeamTournament(tournament.id, loggedInUser.username, loggedInUser._token));
            else dispatch(enterTournament(tournament.id, loggedInUser.username, loggedInUser._token));
            setAlreadyEntered(true);
        }
        else history.push('/');
    }

    return (
        <div className="TournamentInfo">
            <Card>
                <CardHeader>
                    <h6 className="TournamentInfo-header">Tournament Info</h6>
                </CardHeader>
                <CardBody className="TournamentInfo-body">
                    <div className="TournamentInfo-left">
                        Tournament Director:<br />
                        Time control:<br />
                        Min entries:<br />
                        Max entries:<br />
                        Current entries:<br />
                        {tournament.teamSize ? <span>Players per team:<br /></span> : null}
                        Number of rounds:<br />
                        Days per round:<br />
                        Current round:<br />
                        Registration opening:<br />
                        Registration deadline:<br />
                        Start date:
                    </div>
                    <div className="TournamentInfo-right">
                        <a className="TournamentInfo-link" href="" onClick={() => followLink(`/users/${tournament.director}`)}>{tournament.director}</a><br />
                        {tournament.timeControl} - {capitalize(tournament.category)}<br />
                        {tournament.minPlayers}<br />
                        {tournament.maxPlayers}<br />
                        {tournament.entries.length}<br />
                        {tournament.teamSize ? <span>{tournament.teamSize}<br /></span> : null}
                        {tournament.rounds}<br />
                        {tournament.roundLength}<br />
                        {tournament.currentRound ? tournament.currentRound : 'Not started'}<br />
                        {parseDate(new Date(tournament.registrationOpen))}<br />
                        {parseDate(new Date(tournament.registrationClose))}<br />
                        {parseDate(new Date(tournament.startDate))}
                    </div>
                </CardBody>
                <CardFooter>
                    <InfoFooter started={!!tournament.started} full={tournament.entries.length === tournament.maxPlayers} alreadyEntered={alreadyEntered} handleClick={handleClick} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default TournamentInfo;