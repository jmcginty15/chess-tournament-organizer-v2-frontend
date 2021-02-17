import { CardBody } from 'reactstrap';
import StandingsCard from './StandingsCard';
import './StandingsList.css';

const StandingsList = ({ entries, ended }) => {
    return (
        <div className="StandingsList">
            <CardBody>
                {entries.map(entry => <StandingsCard key={entry.id} entry={entry} ended={ended} />)}
            </CardBody>
        </div>
    )
}

export default StandingsList;