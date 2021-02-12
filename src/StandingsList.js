import { CardBody } from 'reactstrap';
import StandingsCard from './StandingsCard';
import './StandingsList.css';

const StandingsList = ({ entries }) => {
    return (
        <div className="StandingsList">
            <CardBody>
                {entries.map(entry => <StandingsCard key={entry.id} entry={entry} />)}
            </CardBody>
        </div>
    )
}

export default StandingsList;