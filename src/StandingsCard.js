import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './StandingsCard.css';

const StandingsCard = ({ entry }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    return (
        <div className="StandingsCard">
            <Card>
                <CardBody className="StandingsCard-body">
                    <div className="StandingsCard-grid">
                        <div><h4 className="StandingsCard-rating">{entry.place}</h4></div>
                        <h4 className="StandingsCard-text">{entry.player} | <span className="StandingsCard-rating">{entry.rating}</span>
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