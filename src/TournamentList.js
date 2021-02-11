import TournamentCard from './TournamentCard';
import './TournamentList.css';

const TournamentList = ({ tournaments, type }) => {
    return (
        <div className="TournamentList">
            {tournaments.map(tournament => <TournamentCard key={tournament.id} tournament={tournament} type={type} />)}
        </div>
    )
}

export default TournamentList;