import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { capitalize } from './helpers/strings';
import { parseDate } from './helpers/dates';
import './TournamentCard.css';

const TournamentCard = ({ tournament, type }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    return (
        <div className="TournamentCard">
            <Card>
                <CardBody>
                    <h4>{tournament.name}</h4>
                    <h6 className="TournamentCard-subtitle">
                        {tournament.timeControl} - {capitalize(tournament.category)}
                        {' | '}
                        {tournament.rounds} rounds
                        {' | '}
                        {tournament.roundLength} day{tournament.roundLength === 1 ? '' : 's'} per round
                    </h6>
                    <div className="TournamentCard-body">
                        <div>
                            <p className="TournamentCard-body-text">
                                Registration opens: <span className="TournamentCard-date">{parseDate(new Date(tournament.registrationOpen))}</span>
                            </p>
                            <p className="TournamentCard-body-text">
                                Registration closes: <span className="TournamentCard-date">{parseDate(new Date(tournament.registrationClose))}</span>
                            </p>
                            <p className="TournamentCard-body-text">
                                Starts: <span className="TournamentCard-date">{parseDate(new Date(tournament.startDate))}</span>
                            </p>
                        </div>
                        <div className="TournamentCard-button-container">
                            <Button className="TournamentCard-button" color="secondary" outline onClick={() => followLink(`/tournaments/${type}${tournament.id}`)}>View details</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default TournamentCard;