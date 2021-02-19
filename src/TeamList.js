import { CardBody } from 'reactstrap';
import TeamCard from './TeamCard';
import './TeamList.css';

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