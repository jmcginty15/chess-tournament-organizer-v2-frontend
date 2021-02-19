import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './TeamCard.css';

const TeamCard = ({ team, ended }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    let color = null;
    if (ended) {
        if (team.place === 1) color = 'gold';
        if (team.place === 2) color = 'silver';
        if (team.place === 3) color = 'bronze';
    }

    return (
        <div className="TeamCard">
            <Card className={color ? `TeamCard-${color}` : ''}>
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