import { Card, CardBody } from 'reactstrap';
import MatchCard from './MatchCard';
import './MatchList.css';


// List component for displaying MatchGameCards
const MatchList = ({ matches, type }) => {
    return (
        <div className="MatchList">
            <Card>
                <CardBody>
                    {matches.map(match => <MatchCard key={match.id} match={match} type={type} />)}
                </CardBody>
            </Card>
        </div>
    )
}

export default MatchList;