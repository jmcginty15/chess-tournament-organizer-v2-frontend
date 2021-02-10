import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './EntryCard.css';

const EntryCard = ({ entry }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);
    const followExternalLink = (url) => window.open(url, '_blank');

    return (
        <div className="EntryCard">
            <Card>
                <CardBody className="EntryCard-body">
                    <h4 className="EntryCard-text">{entry.player} | <span className="EntryCard-rating">{entry.rating}</span>
                        <span className="EntryCard-button-container">
                            <Button className="EntryCard-button" outline color="secondary" onClick={() => followLink(`/users/${entry.player}`)}>View Profile</Button>
                            <Button className="EntryCard-button" outline color="secondary" onClick={() => followExternalLink(`https://lichess.org/@/${entry.player}`)}>View Lichess Profile</Button>
                        </span>
                    </h4>
                </CardBody>
            </Card>
        </div>
    )
}

export default EntryCard;