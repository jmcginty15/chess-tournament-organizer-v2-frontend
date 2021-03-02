import { CardBody } from 'reactstrap';
import TeamCard from './TeamCard';
import './TeamList.css';

// List component for displaying TeamCards in order of tournament standings
const TeamList = ({ teams, ended }) => {
    return (
        <div className="TeamList">
            <CardBody>
                {teams.map(team => <TeamCard key={team.id} team={team} ended={ended} />)}
            </CardBody>
        </div>
    )
}

export default TeamList;