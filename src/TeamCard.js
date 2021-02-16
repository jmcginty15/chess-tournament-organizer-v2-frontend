import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './TeamCard.css';

const TeamCard = ({ team }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    return (
        <div className="TeamCard">
            <Card>
                <CardBody className="TeamCard-body">
                    <div className="TeamCard-grid">
                        <div><h4 className="TeamCard-rating">{team.place}</h4></div>
                        <h4 className="TeamCard-text">{team.name} | <span className="TeamCard-rating">{team.rating.toFixed(0)}</span>
                            <span className="TeamCard-score-container">
                                {team.score}
                            </span>
                        </h4>
                        <div>
                            <Button className="TeamCard-button" outline color="secondary" onClick={() => followLink(`/teams/${team.id}`)}>Team Details</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default TeamCard;