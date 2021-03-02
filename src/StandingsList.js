import { CardBody } from 'reactstrap';
import StandingsCard from './StandingsCard';
import './StandingsList.css';

// List component for displaying StandingsCards in order of tournament standings
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