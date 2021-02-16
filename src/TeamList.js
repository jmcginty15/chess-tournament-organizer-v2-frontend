import { CardBody } from 'reactstrap';
import TeamCard from './TeamCard';
import './TeamList.css';

const TeamList = ({ teams }) => {
    return (
        <div className="TeamList">
            <CardBody>
                {teams.map(team => <TeamCard key={team.id} team={team} />)}
            </CardBody>
        </div>
    )
}

export default TeamList;