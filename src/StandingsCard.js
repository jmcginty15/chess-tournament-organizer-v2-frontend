import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './StandingsCard.css';

// Card component for displaying a team or player in the StandingsList
const StandingsCard = ({ entry, ended }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    let color = null;
    if (ended) {
        if (entry.place === 1) color = 'gold';
        if (entry.place === 2) color = 'silver';
        if (entry.place === 3) color = 'bronze';
    }

    return (
        <div className="StandingsCard">
            <Card className={color ? `StandingsCard-${color}` : ''}>
                <CardBody className="StandingsCard-body">
                    <div className="StandingsCard-grid">
                        <div><h4 className="StandingsCard-rating">{entry.place}</h4></div>
                        <h4 className="StandingsCard-text"><a className="StandingsCard-link" href={`https://lichess.org/@/${entry.player}`} target="_blank" rel="noreferrer">{entry.player}</a> | <span className="StandingsCard-rating">{entry.rating}</span>
                            <span className="StandingsCard-score-container">
                                {entry.score}
                            </span>
                        </h4>
                        <div>
                            <Button className="StandingsCard-button" outline color="secondary" onClick={() => followLink(`/entries/${entry.id}`)}>Player Details</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default StandingsCard;