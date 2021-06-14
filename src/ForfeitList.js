import ForfeitSelectCard from './ForfeitSelectCard';
import './ForfeitList.css';

const ForfeitList = ({ round, type }) => {
    let games = [];
    if (round) {
        games = round;
        if (type === 'T') {
            games = [];
            for (let match of round) games.push(...match.games);
        }
    }

    return (
        <div className="ForfeitList-div">
            <h6 className="ForfeitList-text">In the event of a forfeited game, select the winner from the list below and click "Assign forfeit". This will award one tournament point to the winner.</h6>
            <h6 className="ForfeitList-text">Note that double forfeits will be assigned for any games not reported at the time the round is ended, so it is not necessary to assign them here.</h6>
            <div className="ForfeitList-div">
                {games.map(game => <ForfeitSelectCard key={`game-${game.id}`} game={game} type={type} />)}
            </div>
        </div>
    )
}

export default ForfeitList;