import { Card, CardBody } from 'reactstrap';
import MatchCard from './MatchCard';
import './MatchList.css';

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