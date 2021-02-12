import { useParams } from 'react-router-dom';
import IndTournament from './IndTournament';
import TeamTournament from './TeamTournament';
import './TournamentWrapper.css';

const TournamentWrapper = () => {
    const { idStr } = useParams();
    const type = idStr[0];
    const id = parseInt(idStr.slice(1));

    return (
        <div className="TournamentWrapper">
            {type === 'I' ? <IndTournament id={id} /> : <TeamTournament id={id} />}
        </div>
    )
}

export default TournamentWrapper;